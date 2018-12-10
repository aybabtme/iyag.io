package chat

import (
	"context"

	"github.com/go-kit/kit/log"
	"github.com/golang/protobuf/ptypes/timestamp"
)

type Chatter interface {
	Post(ctx context.Context, entry *Entry) (*Entry, error)
	Listen(ctx context.Context, channelID string, from *timestamp.Timestamp, onPost func(Entry) error) error
	Archive(ctx context.Context, channelID string) error
}

type NewChatterFunc func(context.Context, *ChatterOpts, NewChannelFunc) (Chatter, error)

type ChatterOpts struct {
	Log         log.Logger
	ChannelOpts *ChannelOpts
}

type Channel interface {
	Post(ctx context.Context, entry *Entry) (*Entry, error)
	Listen(ctx context.Context, from *timestamp.Timestamp, onPost func(Entry) error) error
	Archive(ctx context.Context) error
}

type NewChannelFunc func(context.Context, *ChannelOpts) (Channel, error)

type ChannelOpts struct {
	Log                 log.Logger
	TimeNow             func() *timestamp.Timestamp
	ListenerBacklogSize int
}
