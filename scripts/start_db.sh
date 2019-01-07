#!/usr/bin/env bash

docker run \
    --rm -it -p 9091:9091 -p 9092:9092 --network=host \
    cockroachdb/cockroach start \
        --insecure \
        --store=type=mem,size=50% \
        --listen-addr=:9091 \
        --http-addr=:9092 \
        --advertise-addr=localhost:9091