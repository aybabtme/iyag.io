package chat

import (
	"context"

	"github.com/go-kit/kit/log"
	"github.com/golang/protobuf/ptypes/timestamp"
)

type Chatter interface {
	AddEvent(ctx context.Context, event *ChannelUserEvent) (*EventMeta, error)
	GetState(ctx context.Context, channel string) (*ChannelState, error)
	ListenEvents(ctx context.Context, channelID string, fromSeq uint64, onPost func(ChannelUserEvent) error) error
}

type NewChatterFunc func(context.Context, *ChatterOpts) (Chatter, error)

type ChatterOpts struct {
	Log                 log.Logger
	TimeNow             func() *timestamp.Timestamp
	ListenerBacklogSize int
}
