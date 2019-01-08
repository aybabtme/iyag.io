// package: iyag.io.chat.chatsrv
// file: iyag.io/chat/chatsrv/channel.proto

import * as iyag_io_chat_chatsrv_channel_pb from "../../../iyag.io/chat/chatsrv/channel_pb";
import {grpc} from "grpc-web-client";

type ChannelEventCreate = {
  readonly methodName: string;
  readonly service: typeof Channel;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof iyag_io_chat_chatsrv_channel_pb.EventCreateReq;
  readonly responseType: typeof iyag_io_chat_chatsrv_channel_pb.EventCreateRes;
};

type ChannelEventArchive = {
  readonly methodName: string;
  readonly service: typeof Channel;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof iyag_io_chat_chatsrv_channel_pb.EventArchiveReq;
  readonly responseType: typeof iyag_io_chat_chatsrv_channel_pb.EventArchiveRes;
};

type ChannelEventJoin = {
  readonly methodName: string;
  readonly service: typeof Channel;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof iyag_io_chat_chatsrv_channel_pb.EventJoinReq;
  readonly responseType: typeof iyag_io_chat_chatsrv_channel_pb.EventJoinRes;
};

type ChannelEventLeave = {
  readonly methodName: string;
  readonly service: typeof Channel;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof iyag_io_chat_chatsrv_channel_pb.EventLeaveReq;
  readonly responseType: typeof iyag_io_chat_chatsrv_channel_pb.EventLeaveRes;
};

type ChannelEventType = {
  readonly methodName: string;
  readonly service: typeof Channel;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof iyag_io_chat_chatsrv_channel_pb.EventTypeReq;
  readonly responseType: typeof iyag_io_chat_chatsrv_channel_pb.EventTypeRes;
};

type ChannelEventSend = {
  readonly methodName: string;
  readonly service: typeof Channel;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof iyag_io_chat_chatsrv_channel_pb.EventSendReq;
  readonly responseType: typeof iyag_io_chat_chatsrv_channel_pb.EventSendRes;
};

type ChannelGetChannel = {
  readonly methodName: string;
  readonly service: typeof Channel;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof iyag_io_chat_chatsrv_channel_pb.GetChannelReq;
  readonly responseType: typeof iyag_io_chat_chatsrv_channel_pb.GetChannelRes;
};

type ChannelListenUserEvent = {
  readonly methodName: string;
  readonly service: typeof Channel;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof iyag_io_chat_chatsrv_channel_pb.ListenUserEventReq;
  readonly responseType: typeof iyag_io_chat_chatsrv_channel_pb.ListenUserEventRes;
};

type ChannelListChannel = {
  readonly methodName: string;
  readonly service: typeof Channel;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof iyag_io_chat_chatsrv_channel_pb.ListChannelReq;
  readonly responseType: typeof iyag_io_chat_chatsrv_channel_pb.ListChannelRes;
};

export class Channel {
  static readonly serviceName: string;
  static readonly EventCreate: ChannelEventCreate;
  static readonly EventArchive: ChannelEventArchive;
  static readonly EventJoin: ChannelEventJoin;
  static readonly EventLeave: ChannelEventLeave;
  static readonly EventType: ChannelEventType;
  static readonly EventSend: ChannelEventSend;
  static readonly GetChannel: ChannelGetChannel;
  static readonly ListenUserEvent: ChannelListenUserEvent;
  static readonly ListChannel: ChannelListChannel;
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
  eventCreate(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.EventCreateReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.EventCreateRes|null) => void
  ): UnaryResponse;
  eventCreate(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.EventCreateReq,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.EventCreateRes|null) => void
  ): UnaryResponse;
  eventArchive(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.EventArchiveReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.EventArchiveRes|null) => void
  ): UnaryResponse;
  eventArchive(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.EventArchiveReq,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.EventArchiveRes|null) => void
  ): UnaryResponse;
  eventJoin(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.EventJoinReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.EventJoinRes|null) => void
  ): UnaryResponse;
  eventJoin(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.EventJoinReq,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.EventJoinRes|null) => void
  ): UnaryResponse;
  eventLeave(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.EventLeaveReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.EventLeaveRes|null) => void
  ): UnaryResponse;
  eventLeave(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.EventLeaveReq,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.EventLeaveRes|null) => void
  ): UnaryResponse;
  eventType(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.EventTypeReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.EventTypeRes|null) => void
  ): UnaryResponse;
  eventType(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.EventTypeReq,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.EventTypeRes|null) => void
  ): UnaryResponse;
  eventSend(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.EventSendReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.EventSendRes|null) => void
  ): UnaryResponse;
  eventSend(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.EventSendReq,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.EventSendRes|null) => void
  ): UnaryResponse;
  getChannel(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.GetChannelReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.GetChannelRes|null) => void
  ): UnaryResponse;
  getChannel(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.GetChannelReq,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.GetChannelRes|null) => void
  ): UnaryResponse;
  listenUserEvent(requestMessage: iyag_io_chat_chatsrv_channel_pb.ListenUserEventReq, metadata?: grpc.Metadata): ResponseStream<iyag_io_chat_chatsrv_channel_pb.ListenUserEventRes>;
  listChannel(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.ListChannelReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.ListChannelRes|null) => void
  ): UnaryResponse;
  listChannel(
    requestMessage: iyag_io_chat_chatsrv_channel_pb.ListChannelReq,
    callback: (error: ServiceError|null, responseMessage: iyag_io_chat_chatsrv_channel_pb.ListChannelRes|null) => void
  ): UnaryResponse;
}

