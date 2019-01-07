#!/usr/bin/env bash

docker run \
    -it --rm --network=host \
    cockroachdb/cockroach sql \
        --insecure --host 127.0.0.1:9091