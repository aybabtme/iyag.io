package chatsrv

import (
	"context"

	"iyag.io/chat"
)

type Channel struct {
	db chat.Chatter
}

var _ ChannelServer = (*Channel)(nil)

func (srv *Channel) Listen(i int, req *ListenReq, listen Channel_ListenServer) error {
	ctx := listen.Context()
	onEntry := func(entry *Entry) error {
		return client.Send(&ListenRes{Entry: entry})
	}
	return srv.db.Listen(ctx, req.ChannelID, req.ThreadID, onEntry)
}

func (srv *Channel) Post(ctx context.Context, req *PostReq) (*PostRes, error) {
	entry, err := srv.db.Post(ctx, req.Entry)
	if err != nil {
		return nil, err
	}
	return &PostRes{Entry: entry}, nil
}
