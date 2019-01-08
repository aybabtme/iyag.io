package chat

import (
	"context"

	"github.com/go-kit/kit/log"
	"github.com/golang/protobuf/ptypes/timestamp"
)

type Chatter interface {
	AddEvent(ctx context.Context, event *ChannelUserEvent) (*EventMeta, error)
	GetChannel(ctx context.Context, channel string) (*Channel, error)
	ListenEvents(ctx context.Context, channelID string, fromSeq uint64, onPost func(ChannelUserEvent) error) error
	ListChannel(ctx context.Context) ([]*ChannelMeta, error)
}

type NewChatterFunc func(context.Context, *ChatterOpts) (Chatter, error)

type ChatterOpts struct {
	Log                 log.Logger
	TimeNow             func() *timestamp.Timestamp
	ListenerBacklogSize int
}
