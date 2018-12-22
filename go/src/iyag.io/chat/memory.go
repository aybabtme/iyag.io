package chat

import (
	"context"
	"sync"

	"github.com/go-kit/kit/log"
	"github.com/golang/protobuf/ptypes"
	timestamp "github.com/golang/protobuf/ptypes/timestamp"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type inMemoryChat struct {
	opts *ChatterOpts

	mkChannel  NewChannelFunc
	channelsMu sync.Mutex
	channels   map[string]Channel
}

var _ NewChatterFunc = NewInMemoryChat

func NewInMemoryChat(ctx context.Context, opts *ChatterOpts, mkChannel NewChannelFunc) (Chatter, error) {
	return &inMemoryChat{
		opts:      opts,
		mkChannel: mkChannel,
		channels:  make(map[string]Channel),
	}, nil
}

func (fc *inMemoryChat) Post(ctx context.Context, entry *Entry) (*Entry, error) {
	channelID := entry.GetMeta().GetChannelId()

	fc.channelsMu.Lock()
	channel, ok := fc.channels[channelID]
	if !ok {
		var err error
		channel, err = fc.mkChannel(ctx, fc.opts.ChannelOpts)
		if err != nil {
			fc.channelsMu.Unlock()
			return nil, err
		}
	}
	fc.channels[channelID] = channel
	fc.channelsMu.Unlock()

	return channel.Post(ctx, entry)
}

func (fc *inMemoryChat) Listen(ctx context.Context, channelID string, from *timestamp.Timestamp, onPost func(Entry) error) error {
	fc.opts.Log.Log("msg", "joining channel", "channel", channelID)
	fc.channelsMu.Lock()
	channel, ok := fc.channels[channelID]
	if !ok {
		fc.channelsMu.Unlock()
		return status.Errorf(codes.NotFound, "no such channel %q", channelID)
	}
	fc.channelsMu.Unlock()
	return channel.Listen(ctx, from, onPost)
}

func (fc *inMemoryChat) Archive(ctx context.Context, channelID string) error {
	fc.channelsMu.Lock()
	channel, ok := fc.channels[channelID]
	if !ok {
		fc.channelsMu.Unlock()
		return status.Errorf(codes.NotFound, "no such channel %q", channelID)
	}
	fc.channelsMu.Unlock()
	return channel.Archive(ctx)
}

type inMemoryChannel struct {
	opts *ChannelOpts

	listenersMu sync.Mutex
	listeners   map[chan *Entry]struct{}

	messagesMu sync.Mutex
	messages   []*Entry

	archivedOnce sync.Once
	archived     chan struct{} // async signal, not blocking, the channel has been archived
}

var _ NewChannelFunc = NewInMemoryChannel

func NewInMemoryChannel(ctx context.Context, opts *ChannelOpts) (Channel, error) {
	return &inMemoryChannel{
		opts:      opts,
		listeners: make(map[chan *Entry]struct{}),
		archived:  make(chan struct{}),
	}, nil
}

func (fc *inMemoryChannel) Post(ctx context.Context, entry *Entry) (*Entry, error) {
	ll := log.With(fc.opts.Log,
		"uuid", entry.GetMeta().GetUuid(),
		"author", entry.GetMeta().GetAuthorId(),
		"channel", entry.GetMeta().GetChannelId(),
		"thread", entry.GetMeta().GetThreadId(),
	)
	ll.Log("msg", "posting to channel")
	select {
	case <-fc.archived:
		ll.Log("msg", "channel is archived")
		return nil, status.Error(codes.PermissionDenied, "cannot post to an archived channel")
	default:
	}

	entryUUID := entry.GetMeta().GetUuid()
	fc.messagesMu.Lock()
	defer fc.messagesMu.Unlock()
	defer fc.notify(entry)

	for _, msg := range fc.messages {
		if msg.GetMeta().GetUuid() == entryUUID {
			msg.Content = entry.GetContent() // only update the content
			return msg, nil
		}
	}
	entry.GetMeta().Sequence = uint64(len(fc.messages) + 1)
	entry.GetMeta().Time = fc.opts.TimeNow()
	ll.Log("msg", "appended to messages", "entry.body", entry.GetContent().GetBody())
	fc.messages = append(fc.messages, entry)

	return entry, nil
}

func (fc *inMemoryChannel) notify(entry *Entry) {
	fc.listenersMu.Lock()
	for ch := range fc.listeners {
		select {
		case ch <- entry:
		default:
			close(ch)
			delete(fc.listeners, ch)
		}
	}
	fc.listenersMu.Unlock()
}

func (fc *inMemoryChannel) listEntry(selector func(*EntryMeta) bool) []Entry {

	fc.messagesMu.Lock()

	var entries []Entry
	for _, msg := range fc.messages {
		if selector(msg.GetMeta()) {
			entries = append(entries, *msg)
		}
	}

	fc.messagesMu.Unlock()
	return entries
}

func (fc *inMemoryChannel) Listen(ctx context.Context, from *timestamp.Timestamp, onPost func(Entry) error) error {
	fromT, err := ptypes.Timestamp(from)
	if err != nil {
		return status.Errorf(codes.InvalidArgument, "can't parse 'from': %v", from)
	}
	fc.opts.Log.Log("msg", "requesting previous messages")

	fc.listenersMu.Lock()

	backlog := fc.listEntry(func(meta *EntryMeta) bool {
		msgT, _ := ptypes.Timestamp(from)
		return !msgT.Before(fromT)
	})

	onPostCh := make(chan *Entry, fc.opts.ListenerBacklogSize)
	fc.listeners[onPostCh] = struct{}{}
	fc.listenersMu.Unlock()

	fc.opts.Log.Log("msg", "sending backlog", "count", len(backlog))
	for _, msg := range backlog {
		fc.opts.Log.Log("msg", "sending backlog message", "entry.body", msg.GetContent().GetBody())
		if err := onPost(msg); err != nil {
			return err
		}
	}

	fc.opts.Log.Log("msg", "backlog received, waiting for new messages")
	var (
		lastEntry *Entry
		more      bool
	)
loop:
	for {
		select {
		case lastEntry, more = <-onPostCh:
			if !more {
				return status.Error(codes.ResourceExhausted, "reading too slowly, try reconnecting")
			}
			fc.opts.Log.Log("msg", "sending entry", "entry.body", lastEntry.GetContent().GetBody())
			if err := onPost(*lastEntry); err != nil {
				return err
			}
		case <-ctx.Done():
			go func() {
				fc.listenersMu.Lock()
				delete(fc.listeners, onPostCh)
				fc.listenersMu.Unlock()
			}()
			return nil
		case <-fc.archived:
			// break out of the loop and send wtv messages hasn't yet been sent
			fc.opts.Log.Log("msg", "channel is archived")
			break loop
		}
	}
	lastMessages := fc.listEntry(func(meta *EntryMeta) bool {
		return meta.GetSequence() > lastEntry.GetMeta().GetSequence()
	})
	fc.opts.Log.Log("msg", "remaining message have to be sent", "count", len(lastMessages))
	for _, msg := range lastMessages {
		fc.opts.Log.Log("msg", "sending archived message", "entry.body", msg.GetContent().GetBody())
		if err := onPost(msg); err != nil {
			return err
		}
	}
	return nil
}

func (fc *inMemoryChannel) Archive(ctx context.Context) error {
	fc.archivedOnce.Do(func() { close(fc.archived) })
	return nil
}
