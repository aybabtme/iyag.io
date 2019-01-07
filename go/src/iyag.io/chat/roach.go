package chat

import (
	"context"
	"database/sql"
)

type roachChat struct {
	db *sql.DB

	opts      *ChatterOpts
	mkChannel NewChannelFunc
}

var _ NewChatterFunc = NewRoachChat(nil)

func NewRoachChat(db *sql.DB) NewChatterFunc {
	return func(ctx context.Context, opts *ChatterOpts, mkChannel NewChannelFunc) (Chatter, error) {
		return &roachChat{
			db:        db,
			opts:      opts,
			mkChannel: mkChannel,
		}, nil
	}
}
