// package: iyag.io.chat.chatsrv
// file: iyag.io/chat/chatsrv/channel.proto

import * as jspb from "google-protobuf";
import * as iyag_io_chat_event_pb from "../../../iyag.io/chat/event_pb";
import * as iyag_io_chat_entry_pb from "../../../iyag.io/chat/entry_pb";
import * as iyag_io_chat_channel_pb from "../../../iyag.io/chat/channel_pb";

export class EventAuth extends jspb.Message {
  getAuthorId(): string;
  setAuthorId(value: string): void;

  getToken(): string;
  setToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventAuth.AsObject;
  static toObject(includeInstance: boolean, msg: EventAuth): EventAuth.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventAuth, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventAuth;
  static deserializeBinaryFromReader(message: EventAuth, reader: jspb.BinaryReader): EventAuth;
}

export namespace EventAuth {
  export type AsObject = {
    authorId: string,
    token: string,
  }
}

export class EventCreateReq extends jspb.Message {
  hasAuth(): boolean;
  clearAuth(): void;
  getAuth(): EventAuth | undefined;
  setAuth(value?: EventAuth): void;

  getUuid(): string;
  setUuid(value: string): void;

  getChannelName(): string;
  setChannelName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventCreateReq.AsObject;
  static toObject(includeInstance: boolean, msg: EventCreateReq): EventCreateReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventCreateReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventCreateReq;
  static deserializeBinaryFromReader(message: EventCreateReq, reader: jspb.BinaryReader): EventCreateReq;
}

export namespace EventCreateReq {
  export type AsObject = {
    auth?: EventAuth.AsObject,
    uuid: string,
    channelName: string,
  }
}

export class EventCreateRes extends jspb.Message {
  hasEventMeta(): boolean;
  clearEventMeta(): void;
  getEventMeta(): iyag_io_chat_event_pb.EventMeta | undefined;
  setEventMeta(value?: iyag_io_chat_event_pb.EventMeta): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventCreateRes.AsObject;
  static toObject(includeInstance: boolean, msg: EventCreateRes): EventCreateRes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventCreateRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventCreateRes;
  static deserializeBinaryFromReader(message: EventCreateRes, reader: jspb.BinaryReader): EventCreateRes;
}

export namespace EventCreateRes {
  export type AsObject = {
    eventMeta?: iyag_io_chat_event_pb.EventMeta.AsObject,
  }
}

export class EventArchiveReq extends jspb.Message {
  hasAuth(): boolean;
  clearAuth(): void;
  getAuth(): EventAuth | undefined;
  setAuth(value?: EventAuth): void;

  getUuid(): string;
  setUuid(value: string): void;

  getChannelName(): string;
  setChannelName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventArchiveReq.AsObject;
  static toObject(includeInstance: boolean, msg: EventArchiveReq): EventArchiveReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventArchiveReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventArchiveReq;
  static deserializeBinaryFromReader(message: EventArchiveReq, reader: jspb.BinaryReader): EventArchiveReq;
}

export namespace EventArchiveReq {
  export type AsObject = {
    auth?: EventAuth.AsObject,
    uuid: string,
    channelName: string,
  }
}

export class EventArchiveRes extends jspb.Message {
  hasEventMeta(): boolean;
  clearEventMeta(): void;
  getEventMeta(): iyag_io_chat_event_pb.EventMeta | undefined;
  setEventMeta(value?: iyag_io_chat_event_pb.EventMeta): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventArchiveRes.AsObject;
  static toObject(includeInstance: boolean, msg: EventArchiveRes): EventArchiveRes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventArchiveRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventArchiveRes;
  static deserializeBinaryFromReader(message: EventArchiveRes, reader: jspb.BinaryReader): EventArchiveRes;
}

export namespace EventArchiveRes {
  export type AsObject = {
    eventMeta?: iyag_io_chat_event_pb.EventMeta.AsObject,
  }
}

export class EventJoinReq extends jspb.Message {
  hasAuth(): boolean;
  clearAuth(): void;
  getAuth(): EventAuth | undefined;
  setAuth(value?: EventAuth): void;

  getUuid(): string;
  setUuid(value: string): void;

  getChannelName(): string;
  setChannelName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventJoinReq.AsObject;
  static toObject(includeInstance: boolean, msg: EventJoinReq): EventJoinReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventJoinReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventJoinReq;
  static deserializeBinaryFromReader(message: EventJoinReq, reader: jspb.BinaryReader): EventJoinReq;
}

export namespace EventJoinReq {
  export type AsObject = {
    auth?: EventAuth.AsObject,
    uuid: string,
    channelName: string,
  }
}

export class EventJoinRes extends jspb.Message {
  hasEventMeta(): boolean;
  clearEventMeta(): void;
  getEventMeta(): iyag_io_chat_event_pb.EventMeta | undefined;
  setEventMeta(value?: iyag_io_chat_event_pb.EventMeta): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventJoinRes.AsObject;
  static toObject(includeInstance: boolean, msg: EventJoinRes): EventJoinRes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventJoinRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventJoinRes;
  static deserializeBinaryFromReader(message: EventJoinRes, reader: jspb.BinaryReader): EventJoinRes;
}

export namespace EventJoinRes {
  export type AsObject = {
    eventMeta?: iyag_io_chat_event_pb.EventMeta.AsObject,
  }
}

export class EventLeaveReq extends jspb.Message {
  hasAuth(): boolean;
  clearAuth(): void;
  getAuth(): EventAuth | undefined;
  setAuth(value?: EventAuth): void;

  getUuid(): string;
  setUuid(value: string): void;

  getChannelName(): string;
  setChannelName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventLeaveReq.AsObject;
  static toObject(includeInstance: boolean, msg: EventLeaveReq): EventLeaveReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventLeaveReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventLeaveReq;
  static deserializeBinaryFromReader(message: EventLeaveReq, reader: jspb.BinaryReader): EventLeaveReq;
}

export namespace EventLeaveReq {
  export type AsObject = {
    auth?: EventAuth.AsObject,
    uuid: string,
    channelName: string,
  }
}

export class EventLeaveRes extends jspb.Message {
  hasEventMeta(): boolean;
  clearEventMeta(): void;
  getEventMeta(): iyag_io_chat_event_pb.EventMeta | undefined;
  setEventMeta(value?: iyag_io_chat_event_pb.EventMeta): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventLeaveRes.AsObject;
  static toObject(includeInstance: boolean, msg: EventLeaveRes): EventLeaveRes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventLeaveRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventLeaveRes;
  static deserializeBinaryFromReader(message: EventLeaveRes, reader: jspb.BinaryReader): EventLeaveRes;
}

export namespace EventLeaveRes {
  export type AsObject = {
    eventMeta?: iyag_io_chat_event_pb.EventMeta.AsObject,
  }
}

export class EventTypeReq extends jspb.Message {
  hasAuth(): boolean;
  clearAuth(): void;
  getAuth(): EventAuth | undefined;
  setAuth(value?: EventAuth): void;

  getUuid(): string;
  setUuid(value: string): void;

  getChannelName(): string;
  setChannelName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventTypeReq.AsObject;
  static toObject(includeInstance: boolean, msg: EventTypeReq): EventTypeReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventTypeReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventTypeReq;
  static deserializeBinaryFromReader(message: EventTypeReq, reader: jspb.BinaryReader): EventTypeReq;
}

export namespace EventTypeReq {
  export type AsObject = {
    auth?: EventAuth.AsObject,
    uuid: string,
    channelName: string,
  }
}

export class EventTypeRes extends jspb.Message {
  hasEventMeta(): boolean;
  clearEventMeta(): void;
  getEventMeta(): iyag_io_chat_event_pb.EventMeta | undefined;
  setEventMeta(value?: iyag_io_chat_event_pb.EventMeta): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventTypeRes.AsObject;
  static toObject(includeInstance: boolean, msg: EventTypeRes): EventTypeRes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventTypeRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventTypeRes;
  static deserializeBinaryFromReader(message: EventTypeRes, reader: jspb.BinaryReader): EventTypeRes;
}

export namespace EventTypeRes {
  export type AsObject = {
    eventMeta?: iyag_io_chat_event_pb.EventMeta.AsObject,
  }
}

export class EventSendReq extends jspb.Message {
  hasAuth(): boolean;
  clearAuth(): void;
  getAuth(): EventAuth | undefined;
  setAuth(value?: EventAuth): void;

  getUuid(): string;
  setUuid(value: string): void;

  getChannelName(): string;
  setChannelName(value: string): void;

  hasEntry(): boolean;
  clearEntry(): void;
  getEntry(): iyag_io_chat_entry_pb.Entry | undefined;
  setEntry(value?: iyag_io_chat_entry_pb.Entry): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventSendReq.AsObject;
  static toObject(includeInstance: boolean, msg: EventSendReq): EventSendReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventSendReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventSendReq;
  static deserializeBinaryFromReader(message: EventSendReq, reader: jspb.BinaryReader): EventSendReq;
}

export namespace EventSendReq {
  export type AsObject = {
    auth?: EventAuth.AsObject,
    uuid: string,
    channelName: string,
    entry?: iyag_io_chat_entry_pb.Entry.AsObject,
  }
}

export class EventSendRes extends jspb.Message {
  hasEventMeta(): boolean;
  clearEventMeta(): void;
  getEventMeta(): iyag_io_chat_event_pb.EventMeta | undefined;
  setEventMeta(value?: iyag_io_chat_event_pb.EventMeta): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventSendRes.AsObject;
  static toObject(includeInstance: boolean, msg: EventSendRes): EventSendRes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventSendRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventSendRes;
  static deserializeBinaryFromReader(message: EventSendRes, reader: jspb.BinaryReader): EventSendRes;
}

export namespace EventSendRes {
  export type AsObject = {
    eventMeta?: iyag_io_chat_event_pb.EventMeta.AsObject,
  }
}

export class GetChannelReq extends jspb.Message {
  getChannelName(): string;
  setChannelName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetChannelReq.AsObject;
  static toObject(includeInstance: boolean, msg: GetChannelReq): GetChannelReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetChannelReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetChannelReq;
  static deserializeBinaryFromReader(message: GetChannelReq, reader: jspb.BinaryReader): GetChannelReq;
}

export namespace GetChannelReq {
  export type AsObject = {
    channelName: string,
  }
}

export class GetChannelRes extends jspb.Message {
  hasChannel(): boolean;
  clearChannel(): void;
  getChannel(): iyag_io_chat_channel_pb.Channel | undefined;
  setChannel(value?: iyag_io_chat_channel_pb.Channel): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetChannelRes.AsObject;
  static toObject(includeInstance: boolean, msg: GetChannelRes): GetChannelRes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetChannelRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetChannelRes;
  static deserializeBinaryFromReader(message: GetChannelRes, reader: jspb.BinaryReader): GetChannelRes;
}

export namespace GetChannelRes {
  export type AsObject = {
    channel?: iyag_io_chat_channel_pb.Channel.AsObject,
  }
}

export class ListenUserEventReq extends jspb.Message {
  getChannelName(): string;
  setChannelName(value: string): void;

  getFromSequence(): number;
  setFromSequence(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListenUserEventReq.AsObject;
  static toObject(includeInstance: boolean, msg: ListenUserEventReq): ListenUserEventReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListenUserEventReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListenUserEventReq;
  static deserializeBinaryFromReader(message: ListenUserEventReq, reader: jspb.BinaryReader): ListenUserEventReq;
}

export namespace ListenUserEventReq {
  export type AsObject = {
    channelName: string,
    fromSequence: number,
  }
}

export class ListenUserEventRes extends jspb.Message {
  hasEvent(): boolean;
  clearEvent(): void;
  getEvent(): iyag_io_chat_event_pb.ChannelUserEvent | undefined;
  setEvent(value?: iyag_io_chat_event_pb.ChannelUserEvent): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListenUserEventRes.AsObject;
  static toObject(includeInstance: boolean, msg: ListenUserEventRes): ListenUserEventRes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListenUserEventRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListenUserEventRes;
  static deserializeBinaryFromReader(message: ListenUserEventRes, reader: jspb.BinaryReader): ListenUserEventRes;
}

export namespace ListenUserEventRes {
  export type AsObject = {
    event?: iyag_io_chat_event_pb.ChannelUserEvent.AsObject,
  }
}

export class ListChannelReq extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListChannelReq.AsObject;
  static toObject(includeInstance: boolean, msg: ListChannelReq): ListChannelReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListChannelReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListChannelReq;
  static deserializeBinaryFromReader(message: ListChannelReq, reader: jspb.BinaryReader): ListChannelReq;
}

export namespace ListChannelReq {
  export type AsObject = {
  }
}

export class ListChannelRes extends jspb.Message {
  clearChannelsList(): void;
  getChannelsList(): Array<iyag_io_chat_channel_pb.ChannelMeta>;
  setChannelsList(value: Array<iyag_io_chat_channel_pb.ChannelMeta>): void;
  addChannels(value?: iyag_io_chat_channel_pb.ChannelMeta, index?: number): iyag_io_chat_channel_pb.ChannelMeta;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListChannelRes.AsObject;
  static toObject(includeInstance: boolean, msg: ListChannelRes): ListChannelRes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListChannelRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListChannelRes;
  static deserializeBinaryFromReader(message: ListChannelRes, reader: jspb.BinaryReader): ListChannelRes;
}

export namespace ListChannelRes {
  export type AsObject = {
    channelsList: Array<iyag_io_chat_channel_pb.ChannelMeta.AsObject>,
  }
}

