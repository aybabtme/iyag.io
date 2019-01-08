package chat

import (
	"context"
	"database/sql"
)

type roachChat struct {
	db *sql.DB

	opts *ChatterOpts
}

var _ NewChatterFunc = NewRoachChat(nil)

// NewRoachChat makes a chat backend from Cockroach DB.
func NewRoachChat(db *sql.DB) NewChatterFunc {
	return func(ctx context.Context, opts *ChatterOpts) (Chatter, error) {
		return &roachChat{
			db:   db,
			opts: opts,
		}, nil
	}
}

func (rc *roachChat) AddEvent(ctx context.Context, event *ChannelUserEvent) (*EventMeta, error) {
	panic("unimplemented")
}
func (rc *roachChat) GetChannel(ctx context.Context, channel string) (*Channel, error) {
	panic("unimplemented")
}
func (rc *roachChat) ListenEvents(ctx context.Context, channelID string, fromSeq uint64, onPost func(ChannelUserEvent) error) error {
	panic("unimplemented")
}
func (rc *roachChat) ListChannel(ctx context.Context) ([]*ChannelMeta, error) {
	panic("unimplemented")
}
