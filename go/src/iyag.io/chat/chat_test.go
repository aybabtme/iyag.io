package chat_test

import (
	"context"
	"encoding/base32"
	"os"
	"testing"
	"time"

	"github.com/go-kit/kit/log"

	"github.com/golang/protobuf/ptypes"
	"github.com/golang/protobuf/ptypes/timestamp"
	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
	"iyag.io/chat"
)

func TestInMemoryChat(t *testing.T) {
	clk := newClock(time.Date(2018, 12, 9, 23, 57, 52, 0, time.UTC), 300*time.Millisecond)

	testCanChat(t, clk, chat.NewInMemoryChat, chat.NewInMemoryChannel, &chat.ChatterOpts{
		Log: log.NewLogfmtLogger(os.Stderr),
		ChannelOpts: &chat.ChannelOpts{
			Log:                 log.NewLogfmtLogger(os.Stderr),
			TimeNow:             clk.timeNow,
			ListenerBacklogSize: 100,
		},
	})
}

func testCanChat(t testing.TB, clk *clock, newChatter chat.NewChatterFunc, newChannel chat.NewChannelFunc, opts *chat.ChatterOpts) {
	ctx := context.Background()

	chatter, err := newChatter(ctx, opts, newChannel)
	require.NoError(t, err, "should be able to create a chatter")

	channelID := "my_channel"
	threadID := "my_thread"
	antoine := "antoine"
	jihea := "jihea"

	firstEntry := newEntry(clk, channelID, threadID, antoine, "bonjour")
	beforeJoining := []*chat.Entry{
		firstEntry,
		newEntry(clk, channelID, threadID, jihea, "hi"),
		newEntry(clk, channelID, threadID, antoine, "lol"),
	}
	afterJoining := []*chat.Entry{
		newEntry(clk, channelID, threadID, antoine, "let's get coffee"),
		newEntry(clk, channelID, threadID, jihea, "yesss!"),
		newEntry(clk, channelID, threadID, antoine, "ㅋㅋㅋ"),
	}

	for _, msg := range beforeJoining {
		_, err := chatter.Post(ctx, msg)
		require.NoError(t, err, "should be able to post to channel when no one is in it")
	}

	joined := make(chan struct{}, 1)
	go func() {
		<-joined
		for _, msg := range afterJoining {
			_, err := chatter.Post(ctx, msg)
			require.NoError(t, err, "should be able to post to channel when someone is listening to it")
		}
		err := chatter.Archive(ctx, channelID)
		require.NoError(t, err, "should be able to archive channel")
	}()

	var got []*chat.Entry
	err = chatter.Listen(ctx, channelID, firstEntry.GetMeta().GetTime(), func(entry chat.Entry) error {
		select {
		case joined <- struct{}{}:
		default:
		}
		t.Logf("received %q:%q", entry.GetMeta().GetAuthorId(), entry.GetContent().GetBody())
		got = append(got, &entry)
		return nil
	})
	require.NoError(t, err, "should exit `listen` nicely once the channel is archived")

	want := append(beforeJoining, afterJoining...)
	require.Equal(t, want, got)
}

var enc = base32.HexEncoding.WithPadding(base32.NoPadding)

func newEntry(clk *clock, channelID, threadID, authorID, body string) *chat.Entry {
	uuid := uuid.New()
	bu := uuid[:]
	return &chat.Entry{
		Meta: &chat.EntryMeta{
			Uuid:      enc.EncodeToString(bu),
			ChannelId: channelID,
			ThreadId:  threadID,
			AuthorId:  authorID,
			Time:      clk.timeNow(),
		},
		Content: &chat.EntryContent{
			Body: body,
		},
	}
}

type clock struct {
	now  time.Time
	step time.Duration
}

func newClock(now time.Time, step time.Duration) *clock {
	return &clock{now: now, step: step}
}

func (clk *clock) timeNow() *timestamp.Timestamp {
	now, _ := ptypes.TimestampProto(clk.now)
	return now
}

func (clk *clock) tick() {
	clk.now = clk.now.Add(clk.step)
}
