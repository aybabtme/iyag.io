// package: iyag.io.chat.chatsrv
// file: iyag.io/chat/chatsrv/channel.proto

import * as iyag_io_chat_chatsrv_channel_pb from "../../../iyag.io/chat/chatsrv/channel_pb";
import {grpc} from "grpc-web-client";

type ChannelListen = {
  readonly methodName: string;
  readonly service: typeof Channel;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof iyag_io_chat_chatsrv_channel_pb.ListenReq;
  readonly responseType: typeof iyag_io_chat_chatsrv_channel_pb.ListenRes;
};

type ChannelPost = {
  readonly methodName: string;
  readonly service: typeof Channel;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof iyag_io_chat_chatsrv_channel_pb.PostReq;
  readonly responseType: typeof iyag_io_chat_chatsrv_channel_pb.PostRes;
};

type ChannelArchive = {
  readonly methodName: string;
  readonly service: typeof Channel;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof iyag_io_chat_chatsrv_channel_pb.ArchiveReq;
  readonly responseType: typeof iyag_io_chat_chatsrv_channel_pb.ArchiveRes;
};

export class Channel {
  static readonly serviceName: string;
  static readonly Listen: ChannelListen;
  static readonly Post: ChannelPost;
  static readonly Archive: ChannelArchive;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: () => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: () => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ChannelClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  listen(requestMessage: iyag_io_chat_chatsrv_channel_pb.ListenReq, metadata?: grpc.Metadata): ResponseStream<iyag_io_chat_chatsrv_channel_pb.ListenRes>;
  post(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.PostReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.PostRes|null) => void
  ): UnaryResponse;
  post(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.PostReq,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.PostRes|null) => void
  ): UnaryResponse;
  archive(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.ArchiveReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.ArchiveRes|null) => void
  ): UnaryResponse;
  archive(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.ArchiveReq,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.ArchiveRes|null) => void
  ): UnaryResponse;
}

