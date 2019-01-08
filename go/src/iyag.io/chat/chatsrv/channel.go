package chatsrv

import (
	"github.com/google/uuid"
	context "golang.org/x/net/context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"iyag.io/chat"
)

var _ ChannelServer = (*Channel)(nil)

type Channel struct {
	db chat.Chatter
}

func NewChannelServer(db chat.Chatter) *Channel {
	return &Channel{db: db}
}

func (srv *Channel) EventCreate(ctx context.Context, ev *EventCreateReq) (*EventCreateRes, error) {
	event, err := srv.prepareChannelEvent(ctx, ev.GetAuth(), ev.GetChannelName(), ev.GetUuid())
	if err != nil {
		return nil, err
	}
	event.Event = &chat.ChannelUserEvent_Created{
		Created: &chat.ChannelUserEvent_Create{
			Name: ev.GetChannelName(),
		},
	}
	meta, err := srv.db.AddEvent(ctx, event)
	if err != nil {
		return nil, err
	}
	return &EventCreateRes{EventMeta: meta}, nil
}
func (srv *Channel) EventArchive(ctx context.Context, ev *EventArchiveReq) (*EventArchiveRes, error) {
	event, err := srv.prepareChannelEvent(ctx, ev.GetAuth(), ev.GetChannelName(), ev.GetUuid())
	if err != nil {
		return nil, err
	}
	event.Event = &chat.ChannelUserEvent_Archived{
		Archived: &chat.ChannelUserEvent_Archive{},
	}
	meta, err := srv.db.AddEvent(ctx, event)
	if err != nil {
		return nil, err
	}
	return &EventArchiveRes{EventMeta: meta}, nil
}
func (srv *Channel) EventJoin(ctx context.Context, ev *EventJoinReq) (*EventJoinRes, error) {
	event, err := srv.prepareChannelEvent(ctx, ev.GetAuth(), ev.GetChannelName(), ev.GetUuid())
	if err != nil {
		return nil, err
	}
	event.Event = &chat.ChannelUserEvent_Joined{
		Joined: &chat.ChannelUserEvent_Join{},
	}
	meta, err := srv.db.AddEvent(ctx, event)
	if err != nil {
		return nil, err
	}
	return &EventJoinRes{EventMeta: meta}, nil
}
func (srv *Channel) EventLeave(ctx context.Context, ev *EventLeaveReq) (*EventLeaveRes, error) {
	event, err := srv.prepareChannelEvent(ctx, ev.GetAuth(), ev.GetChannelName(), ev.GetUuid())
	if err != nil {
		return nil, err
	}
	event.Event = &chat.ChannelUserEvent_Left{
		Left: &chat.ChannelUserEvent_Leave{},
	}
	meta, err := srv.db.AddEvent(ctx, event)
	if err != nil {
		return nil, err
	}
	return &EventLeaveRes{EventMeta: meta}, nil
}
func (srv *Channel) EventType(ctx context.Context, ev *EventTypeReq) (*EventTypeRes, error) {
	event, err := srv.prepareChannelEvent(ctx, ev.GetAuth(), ev.GetChannelName(), ev.GetUuid())
	if err != nil {
		return nil, err
	}
	event.Event = &chat.ChannelUserEvent_Typed{
		Typed: &chat.ChannelUserEvent_Type{},
	}
	meta, err := srv.db.AddEvent(ctx, event)
	if err != nil {
		return nil, err
	}
	return &EventTypeRes{EventMeta: meta}, nil
}

func (srv *Channel) GetState(ctx context.Context, req *GetStateReq) (*GetStateRes, error) {
	state, err := srv.db.GetState(ctx, req.GetChannelName())
	if err != nil {
		return nil, status.Errorf(codes.Internal, "can't do: %v", err)
	}
	return &GetStateRes{
		State: state,
	}, nil
}

func (srv *Channel) ListenUserEvent(req *ListenUserEventReq, out Channel_ListenUserEventServer) error {
	ctx := out.Context()
	channelID := req.GetChannelName()
	sequence := req.GetFromSequence()
	err := srv.db.ListenEvents(ctx, channelID, sequence, func(ev chat.ChannelUserEvent) error {
		return out.Send(&ListenUserEventRes{
			Event: &ev,
		})
	})
	return err
}

// helpers

func (srv *Channel) prepareChannelEvent(ctx context.Context, auth *EventAuth, channelName, uuid string) (*chat.ChannelUserEvent, error) {
	authorID, allowed, err := srv.authorize(ctx, auth)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "can't authenticate/authorize: %v", err)
	}
	if !allowed {
		return nil, status.Errorf(codes.Unauthenticated, "not allowed to do this")
	}
	return &chat.ChannelUserEvent{
		Meta:        srv.getMeta(ctx, uuid),
		ChannelName: channelName,
		AuthorId:    authorID,
	}, nil
}

func (srv *Channel) authorize(ctx context.Context, auth *EventAuth) (authorID string, allowed bool, err error) {
	return auth.GetAuthorId(), true, nil // TODO: do this properly
}

func (srv *Channel) getMeta(ctx context.Context, id string) *chat.EventMeta {
	if id == "" {
		blk := uuid.New()
		id = string(blk[:])
	}
	return &chat.EventMeta{Uuid: id}
}
