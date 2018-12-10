package chatsrv

import (
	"context"

	"iyag.io/chat"
)

var _ ChannelServer = (*Channel)(nil)

type Channel struct {
	db chat.Chatter
}

func NewChannelServer(db chat.Chatter) *Channel {
	return &Channel{db: db}
}

func (srv *Channel) Listen(req *ListenReq, listen Channel_ListenServer) error {
	ctx := listen.Context()
	onEntry := func(entry *chat.Entry) error {
		return listen.Send(&ListenRes{Entry: entry})
	}
	return srv.db.Listen(ctx, req.GetChannelId(), req.GetFrom(), onEntry)
}

func (srv *Channel) Post(ctx context.Context, req *PostReq) (*PostRes, error) {
	entry, err := srv.db.Post(ctx, req.Entry)
	if err != nil {
		return nil, err
	}
	return &PostRes{Entry: entry}, nil
}

func (srv *Channel) Archive(ctx context.Context, req *ArchiveReq) (*ArchiveRes, error) {
	err := srv.db.Archive(ctx, req.GetChannelId())
	if err != nil {
		return nil, err
	}
	return &ArchiveRes{}, nil
}
