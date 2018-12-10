package chat

import "context"

type Chatter interface {
	Post(ctx context.Context, entry *Entry) (*Entry, error)
	Listen(ctx context.Context, channelID, threadID string, onPost func(*Entry) error) error
}

type fakeChat struct {
}
