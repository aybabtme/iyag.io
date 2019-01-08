package chat

import (
	"github.com/golang/protobuf/ptypes/timestamp"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (state *ChannelState) ensureActive() error {
	if !state.wasCreated() {
		return status.Error(codes.NotFound, "no such channel")
	}
	if state.wasArchived() {
		return status.Error(codes.FailedPrecondition, "this channel has been archived")
	}
	return nil
}

func (state *ChannelState) wasCreated() bool {
	return state.CreatedAt != nil
}

func (state *ChannelState) wasArchived() bool {
	return state.ArchivedAt != nil
}

func (state *ChannelState) applyEvent(event *ChannelUserEvent, timeNow *timestamp.Timestamp) error {
	accepted := false
	defer func() {
		if accepted {
			state.LastEvent = event.GetMeta()
		}
	}()
	switch ev := event.Event.(type) {
	case *ChannelUserEvent_Created:
		if state.wasCreated() {
			return status.Error(codes.FailedPrecondition, "a channel with this name already exists")
		}
		state.Name = ev.Created.GetName()
		state.CreatedAt = timeNow
		state.CreatedBy = event.GetAuthorId()
		return nil
	case *ChannelUserEvent_Archived:
		if err := state.ensureActive(); err != nil {
			return err
		}
		state.ArchivedAt = timeNow
		state.ArchivedBy = event.GetAuthorId()
		accepted = true
		return nil
	case *ChannelUserEvent_Joined:
		if err := state.ensureActive(); err != nil {
			return err
		}
		for _, authorID := range state.AuthorIds {
			if authorID == event.GetAuthorId() {
				return status.Error(codes.FailedPrecondition, "a user with this ID is already in this channel")
			}
		}
		state.AuthorIds = append(state.AuthorIds, event.GetAuthorId())
		accepted = true
		return nil
	case *ChannelUserEvent_Left:
		if err := state.ensureActive(); err != nil {
			return err
		}
		for i, authorID := range state.AuthorIds {
			if authorID == event.GetAuthorId() {
				if i == 0 {
					state.AuthorIds = state.AuthorIds[1:]
				} else if i == len(state.AuthorIds) {
					state.AuthorIds = state.AuthorIds[:i-1]
				} else {
					state.AuthorIds = append(state.AuthorIds[:i], state.AuthorIds[i+1:]...)
				}
				accepted = true
				return nil
			}
		}
		return status.Error(codes.FailedPrecondition, "no user with this ID is in this channel")
	case *ChannelUserEvent_Typed:
		if err := state.ensureActive(); err != nil {
			return err
		}
		// TODO: implement
		return nil
	case *ChannelUserEvent_Sent:
		if err := state.ensureActive(); err != nil {
			return err
		}
		entry := ev.Sent.GetEntry()
		for i, et := range state.Entries {
			if et.GetMeta().GetUuid() == entry.GetMeta().GetUuid() {
				state.Entries[i].Content = entry.Content
				accepted = true
				return nil
			}
		}
		meta := entry.GetMeta()
		if meta == nil {
			meta = new(EntryMeta)
		}
		meta.Sequence = uint64(len(state.Entries) + 1)
		meta.Time = timeNow
		meta.ChannelName = state.Name
		entry.Meta = meta
		state.Entries = append(state.Entries, entry)
		accepted = true
		return nil
	default:
		return status.Errorf(codes.InvalidArgument, "unsupported event")
	}
}
