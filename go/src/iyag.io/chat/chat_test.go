package chat_test

import (
	"testing"

	"iyag.io/chat"
)

func testCanChat(t *testing.T, mkChat func(testing.TB) chat.Chatter) {
	channelID := "my_channel"
	threadID := "my_thread"
	chatter := mkChat(t)
	err := chatter.Listen(ctx, channelID, threadID)
	require.NoError(t, err)
}
