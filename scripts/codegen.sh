#!/usr/bin/env bash

ROOT_DIR=$(git rev-parse --show-toplevel)
ROOT_IDL_DIR="idl"
ROOT_WEB_APP_DIR="web.iyag.io"
ROOT_NODE_BIN="$ROOT_WEB_APP_DIR/node_modules/.bin"
ROOT_WEB_APP_SRC_DIR="$ROOT_WEB_APP_DIR/src"
ROOT_WEB_APP_GEN_DIR="$ROOT_WEB_APP_SRC_DIR/gen"

GRPCGO_COMPILER="grpc/go:1.0"
for d in $(find ${ROOT_IDL_DIR} -name "*.proto" | xargs -n1 dirname | sort -u); do
    compile_cmd="protoc --go_out=plugins=grpc:go/src -I $ROOT_IDL_DIR $d/*.proto"
    docker run --rm -v $ROOT_DIR:/build/src/ -w=/build/src/ $GRPCGO_COMPILER $compile_cmd
done

GRPCTS_COMPILER="aybabtme/grpc-typescript:latest"
for d in $(find ${ROOT_IDL_DIR} -name "*.proto" | xargs -n1 dirname | sort -u); do
    compile_cmd="protoc --js_out=import_style=commonjs,binary:$ROOT_WEB_APP_GEN_DIR --ts_out=service=true:$ROOT_WEB_APP_GEN_DIR -I /include/ -I $ROOT_IDL_DIR $d/*.proto"
    docker run --rm -v $ROOT_DIR:/build/src/ -w=/build/src/ $GRPCTS_COMPILER $compile_cmd
done