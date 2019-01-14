package chat

import (
	"context"
	"sort"
	"sync"

	"github.com/go-kit/kit/log"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type inMemoryChat struct {
	opts *ChatterOpts

	eventsMu sync.Mutex
	events   []*ChannelUserEvent

	listenersMu sync.Mutex
	listeners   map[string]map[chan *ChannelUserEvent]struct{}

	channelsMu sync.Mutex
	channels   map[string]*Channel
}

var _ NewChatterFunc = NewInMemoryChat

func NewInMemoryChat(ctx context.Context, opts *ChatterOpts) (Chatter, error) {
	return &inMemoryChat{
		opts:      opts,
		listeners: make(map[string]map[chan *ChannelUserEvent]struct{}),
		channels:  make(map[string]*Channel),
	}, nil
}

func (fc *inMemoryChat) AddEvent(ctx context.Context, event *ChannelUserEvent) (*EventMeta, error) {
	ll := log.With(fc.opts.Log,
		"ev.uuid", event.GetMeta().GetUuid(),
		"ev.author.id", event.GetAuthorId(),
		"ev.channel.name", event.GetChannelName(),
	)
	evUUID := event.GetMeta().GetUuid()
	fc.eventsMu.Lock()
	defer fc.eventsMu.Unlock()
	defer fc.notify(event)

	for _, ev := range fc.events {
		if ev.GetMeta().GetUuid() == evUUID {
			return ev.GetMeta(), nil // we already received this event, return a no-op
		}
	}

	channelName := event.GetChannelName()

	fc.channelsMu.Lock()
	defer fc.channelsMu.Unlock()
	channel, ok := fc.channels[channelName]
	if !ok {
		channel = &Channel{
			Meta:    new(ChannelMeta),
			Content: new(ChannelContent),
		}
	}
	now := fc.opts.TimeNow()
	if err := channel.applyEvent(event, now); err != nil {
		return nil, err
	}

	event.GetMeta().Sequence = uint64(len(fc.events) + 1)
	event.GetMeta().Time = fc.opts.TimeNow()
	ll.Log("msg", "appended to events", "event.seq", event.GetMeta().GetSequence())
	fc.events = append(fc.events, event)
	fc.channels[channelName] = channel
	return event.GetMeta(), nil
}
func (fc *inMemoryChat) GetChannel(ctx context.Context, channelName string) (*Channel, error) {
	fc.channelsMu.Lock()
	defer fc.channelsMu.Unlock()

	state, ok := fc.channels[channelName]
	if !ok {
		return nil, status.Error(codes.NotFound, "no such channel")
	}
	return state, nil
}

func (fc *inMemoryChat) ListChannel(ctx context.Context) ([]*ChannelMeta, error) {
	fc.channelsMu.Lock()
	defer fc.channelsMu.Unlock()
	out := make([]*ChannelMeta, 0, len(fc.channels))
	for _, channel := range fc.channels {
		out = append(out, channel.GetMeta())
	}
	sort.Slice(out, func(i, j int) bool {
		return out[i].GetName() < out[j].GetName()
	})
	return out, nil
}

func (fc *inMemoryChat) ListenEvents(ctx context.Context, channelName string, fromSeq uint64, onPost func(ChannelUserEvent) error) error {
	fc.opts.Log.Log("msg", "requesting previous events")

	fc.listenersMu.Lock()

	backlog := fc.listEvent(func(ev *ChannelUserEvent) bool {
		if ev.GetMeta().GetSequence() < fromSeq {
			return false
		}
		if ev.GetChannelName() != channelName {
			return false
		}
		return true
	})

	onPostCh := make(chan *ChannelUserEvent, fc.opts.ListenerBacklogSize)

	channelListeners, ok := fc.listeners[channelName]
	if !ok {
		channelListeners = make(map[chan *ChannelUserEvent]struct{})
	}
	fc.listeners[channelName] = channelListeners
	channelListeners[onPostCh] = struct{}{}
	fc.listeners[channelName] = channelListeners
	fc.listenersMu.Unlock()

	fc.opts.Log.Log("msg", "sending backlog", "count", len(backlog))
	for _, ev := range backlog {
		fc.opts.Log.Log("msg", "sending backlog event", "event.seq", ev.GetMeta().GetSequence())
		if err := onPost(ev); err != nil {
			return err
		}
	}

	fc.opts.Log.Log("msg", "backlog received, waiting for new events")
	var (
		lastEvent *ChannelUserEvent
		more      bool
	)
	for {
		select {
		case lastEvent, more = <-onPostCh:
			if !more {
				return status.Error(codes.ResourceExhausted, "reading too slowly, try reconnecting")
			}
			fc.opts.Log.Log("msg", "sending event", "event.seq", lastEvent.GetMeta().GetSequence())
			if err := onPost(*lastEvent); err != nil {
				return err
			}
		case <-ctx.Done():
			go func() {
				fc.listenersMu.Lock()
				delete(fc.listeners[channelName], onPostCh)
				fc.listenersMu.Unlock()
			}()
			return nil
		}
	}
}

func (fc *inMemoryChat) notify(event *ChannelUserEvent) {
	channelName := event.GetChannelName()
	fc.listenersMu.Lock()
	channelListener, ok := fc.listeners[channelName]
	if !ok {
		channelListener = make(map[chan *ChannelUserEvent]struct{})
		fc.listeners[channelName] = channelListener
	}
	for ch := range channelListener {
		select {
		case ch <- event:
		default:
			close(ch)
			delete(channelListener, ch)
			if len(channelListener) == 0 {
				delete(fc.listeners, channelName)
			}
		}
	}
	fc.listenersMu.Unlock()
}

func (fc *inMemoryChat) listEvent(selector func(*ChannelUserEvent) bool) []ChannelUserEvent {

	fc.eventsMu.Lock()

	var events []ChannelUserEvent
	for _, ev := range fc.events {
		if selector(ev) {
			events = append(events, *ev)
		}
	}

	fc.eventsMu.Unlock()
	return events
}
