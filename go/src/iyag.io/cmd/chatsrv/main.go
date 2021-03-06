package main

import (
	"context"
	"flag"
	"net"
	"net/http"
	"os"
	"strings"

	"github.com/golang/protobuf/ptypes"
	"google.golang.org/grpc/health"
	"google.golang.org/grpc/health/grpc_health_v1"

	"github.com/go-kit/kit/log"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"google.golang.org/grpc"
	"iyag.io/chat"
	"iyag.io/chat/chatsrv"
)

type Config struct {
	ListenIface string
	ListenPort  string

	DB chat.ChatterOpts
}

func main() {
	ll := log.NewJSONLogger(log.NewSyncWriter(os.Stderr))
	ll = log.With(ll, "time", log.DefaultTimestampUTC, "caller", log.DefaultCaller)

	ll.Log("msg", "parsing configuration")
	cfg := &Config{
		ListenIface: "127.0.0.1",
		ListenPort:  "8080",
		DB: chat.ChatterOpts{
			Log:                 log.With(ll, "component", "db", "part", "chatter"),
			TimeNow:             ptypes.TimestampNow,
			ListenerBacklogSize: 100,
		},
	}
	flagString("chatsrv", &cfg.ListenIface, "listen.iface", "interface on which to listen")
	flagString("chatsrv", &cfg.ListenPort, "listen.port", "port on which to listen")
	flag.Parse()

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	ll.Log("msg", "preparing database handler")
	db, err := chat.NewInMemoryChat(ctx, &cfg.DB)
	if err != nil {
		ll.Log("err", err)
		os.Exit(1)
	}

	ll.Log("msg", "preparing net listener")
	l, err := net.Listen("tcp", net.JoinHostPort(cfg.ListenIface, cfg.ListenPort))
	if err != nil {
		ll.Log("err", err)
		os.Exit(1)
	}
	defer l.Close()

	ll.Log("msg", "registering backends")
	mux := mux.NewRouter()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		ll.Log("msg", "random ass message received")
		w.Write([]byte("<h1>hello!</h1>"))
	})
	hdl := handlers.CORS()(mux)

	srv := grpc.NewServer()
	chatsrv.RegisterChannelServer(srv, chatsrv.NewChannelServer(db))
	grpc_health_v1.RegisterHealthServer(srv, health.NewServer())
	wrappedSrv := grpcweb.WrapServer(srv)

	httpSrv := &http.Server{
		Handler: http.HandlerFunc(func(resp http.ResponseWriter, req *http.Request) {
			if wrappedSrv.IsAcceptableGrpcCorsRequest(req) || wrappedSrv.IsGrpcWebRequest(req) {
				ll.Log("msg", "serving gRPC request")
				wrappedSrv.ServeHTTP(resp, req)
			} else {
				ll.Log("msg", "serving HTTP request")
				hdl.ServeHTTP(resp, req)
			}
		}),
	}
	ll.Log("msg", "starting server")
	if err := httpSrv.Serve(l); err != nil {
		ll.Log("err", err)
		os.Exit(1)
	}
}

func envNameFromFlag(appName, flagName string) string {
	return strings.ToUpper(appName) + "_" + strings.ToUpper(strings.Replace(flagName, ".", "_", -1))
}

func flagString(app string, tgt *string, name, help string) {
	deft := *tgt
	envName := envNameFromFlag(app, name)
	if env := os.Getenv(envName); env != "" {
		deft = env // override the default
	}
	flag.StringVar(tgt, name, deft, help)
}
