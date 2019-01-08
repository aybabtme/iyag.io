package chat

import (
	"github.com/golang/protobuf/ptypes/timestamp"
)

func (state *ChannelState) isActive() bool {
	return state.wasCreated() && !state.wasArchived()
}

func (state *ChannelState) wasCreated() bool {
	return state.CreatedAt != nil
}

func (state *ChannelState) wasArchived() bool {
	return state.ArchivedAt != nil
}

func (state *ChannelState) applyEvent(event *ChannelUserEvent, timeNow *timestamp.Timestamp) {
	accepted := false
	defer func() {
		if accepted {
			state.LastEvent = event.GetMeta()
		}
	}()
	switch ev := event.Event.(type) {
	case *ChannelUserEvent_Created:
		if state.wasCreated() {
			return
		}
		state.Name = ev.Created.GetName()
		state.CreatedAt = timeNow
		state.CreatedBy = event.GetAuthorId()
	case *ChannelUserEvent_Archived:
		if !state.isActive() {
			return
		}
		state.ArchivedAt = timeNow
		state.ArchivedBy = event.GetAuthorId()
		accepted = true
	case *ChannelUserEvent_Joined:
		if !state.isActive() {
			return
		}
		for _, authorID := range state.AuthorIds {
			if authorID == event.GetAuthorId() {
				return
			}
		}
		state.AuthorIds = append(state.AuthorIds, event.GetAuthorId())
		accepted = true
	case *ChannelUserEvent_Left:
		if !state.isActive() {
			return
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
				return
			}
		}
	case *ChannelUserEvent_Typed:
		if !state.isActive() {
			return
		}
		// TODO: implement
	case *ChannelUserEvent_Sent:
		if !state.isActive() {
			return
		}
		entry := ev.Sent.GetEntry()
		for i, et := range state.Entries {
			if et.GetMeta().GetUuid() == entry.GetMeta().GetUuid() {
				state.Entries[i].Content = entry.Content
				accepted = true
				return
			}
		}
		entry.GetMeta().Sequence = uint64(len(state.Entries) + 1)
		entry.GetMeta().Time = timeNow
		state.Entries = append(state.Entries, entry)
		accepted = true
	default:
		return
	}
}
