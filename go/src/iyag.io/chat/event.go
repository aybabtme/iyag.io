package chat

import (
	"github.com/golang/protobuf/ptypes/timestamp"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (ch *Channel) ensureActive() error {
	if !ch.wasCreated() {
		return status.Error(codes.NotFound, "no such channel")
	}
	if ch.wasArchived() {
		return status.Error(codes.FailedPrecondition, "this channel has been archived")
	}
	return nil
}

func (ch *Channel) wasCreated() bool {
	return ch.Meta.CreatedAt != nil
}

func (ch *Channel) wasArchived() bool {
	return ch.Meta.ArchivedAt != nil
}

func (ch *Channel) applyEvent(event *ChannelUserEvent, timeNow *timestamp.Timestamp) error {
	accepted := false
	defer func() {
		if accepted {
			ch.Meta.LastEvent = event.GetMeta()
		}
	}()
	switch ev := event.Event.(type) {
	case *ChannelUserEvent_Created:
		if ch.wasCreated() {
			return status.Error(codes.FailedPrecondition, "a channel with this name already exists")
		}
		ch.Meta.Name = ev.Created.GetName()
		ch.Meta.CreatedAt = timeNow
		ch.Meta.CreatedBy = event.GetAuthorId()
		return nil
	case *ChannelUserEvent_Archived:
		if err := ch.ensureActive(); err != nil {
			return err
		}
		ch.Meta.ArchivedAt = timeNow
		ch.Meta.ArchivedBy = event.GetAuthorId()
		accepted = true
		return nil
	case *ChannelUserEvent_Joined:
		if err := ch.ensureActive(); err != nil {
			return err
		}
		for _, authorID := range ch.Meta.AuthorIds {
			if authorID == event.GetAuthorId() {
				return status.Error(codes.FailedPrecondition, "a user with this ID is already in this channel")
			}
		}
		ch.Meta.AuthorIds = append(ch.Meta.AuthorIds, event.GetAuthorId())
		accepted = true
		return nil
	case *ChannelUserEvent_Left:
		if err := ch.ensureActive(); err != nil {
			return err
		}
		for i, authorID := range ch.Meta.AuthorIds {
			if authorID == event.GetAuthorId() {
				if i == 0 {
					ch.Meta.AuthorIds = ch.Meta.AuthorIds[1:]
				} else if i == len(ch.Meta.AuthorIds) {
					ch.Meta.AuthorIds = ch.Meta.AuthorIds[:i-1]
				} else {
					ch.Meta.AuthorIds = append(ch.Meta.AuthorIds[:i], ch.Meta.AuthorIds[i+1:]...)
				}
				accepted = true
				return nil
			}
		}
		return status.Error(codes.FailedPrecondition, "no user with this ID is in this channel")
	case *ChannelUserEvent_Typed:
		if err := ch.ensureActive(); err != nil {
			return err
		}
		// TODO: implement
		return nil
	case *ChannelUserEvent_Sent:
		if err := ch.ensureActive(); err != nil {
			return err
		}
		entry := ev.Sent.GetEntry()
		for i, et := range ch.Content.Entries {
			if et.GetMeta().GetUuid() == entry.GetMeta().GetUuid() {
				ch.Content.Entries[i].Content = entry.Content
				accepted = true
				return nil
			}
		}
		entryMeta := entry.GetMeta()
		if entryMeta == nil {
			entryMeta = new(EntryMeta)
		}
		entryMeta.Sequence = uint64(len(ch.Content.Entries) + 1)
		entryMeta.Time = timeNow
		entryMeta.ChannelName = ch.Meta.Name
		entry.Meta = entryMeta
		ch.Content.Entries = append(ch.Content.Entries, entry)
		accepted = true
		return nil
	default:
		return status.Errorf(codes.InvalidArgument, "unsupported event")
	}
}
