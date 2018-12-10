#!/usr/bin/env bash

ROOT_DIR=$(git rev-parse --show-toplevel)
ROOT_IDL_DIR="idl"

GRPCGO_COMPILER="grpc/go:1.0"
for d in $(find ${ROOT_IDL_DIR} -name "*.proto" | xargs -n1 dirname | sort -u); do
    compile_cmd="protoc --go_out=plugins=grpc:go/src -I $ROOT_IDL_DIR $d/*.proto"
    docker run --rm -v $ROOT_DIR:/build/src/ -w=/build/src/ $GRPCGO_COMPILER $compile_cmd
done