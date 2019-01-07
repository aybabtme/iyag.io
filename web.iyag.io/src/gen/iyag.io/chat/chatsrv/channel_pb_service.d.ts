// package: iyag.io.chat.chatsrv
// file: iyag.io/chat/chatsrv/channel.proto

import * as iyag_io_chat_chatsrv_channel_pb from "../../../iyag.io/chat/chatsrv/channel_pb";
import {grpc} from "grpc-web-client";

type ChannelEvent = {
  readonly methodName: string;
  readonly service: typeof Channel;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof iyag_io_chat_chatsrv_channel_pb.EventReq;
  readonly responseType: typeof iyag_io_chat_chatsrv_channel_pb.EventRes;
};

export class Channel {
  static readonly serviceName: string;
  static readonly Event: ChannelEvent;
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
  event(metadata?: grpc.Metadata): BidirectionalStream<iyag_io_chat_chatsrv_channel_pb.EventReq, iyag_io_chat_chatsrv_channel_pb.EventRes>;
}

