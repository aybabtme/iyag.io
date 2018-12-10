package main

import (
	"google.golang.org/grpc"
)

func main() {
	srv := grpc.NewServer()
	chatsrv.RegisterChannelServer(srv, chatsrv.New())
}
