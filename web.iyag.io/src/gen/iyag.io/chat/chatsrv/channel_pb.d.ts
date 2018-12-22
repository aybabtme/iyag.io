// package: iyag.io.chat.chatsrv
// file: iyag.io/chat/chatsrv/channel.proto

import * as jspb from "google-protobuf";
import * as iyag_io_chat_entry_pb from "../../../iyag.io/chat/entry_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class ListenReq extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  hasFrom(): boolean;
  clearFrom(): void;
  getFrom(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setFrom(value?: google_protobuf_timestamp_pb.Timestamp): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListenReq.AsObject;
  static toObject(includeInstance: boolean, msg: ListenReq): ListenReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListenReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListenReq;
  static deserializeBinaryFromReader(message: ListenReq, reader: jspb.BinaryReader): ListenReq;
}

export namespace ListenReq {
  export type AsObject = {
    channelId: string,
    from?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class ListenRes extends jspb.Message {
  hasEntry(): boolean;
  clearEntry(): void;
  getEntry(): iyag_io_chat_entry_pb.Entry | undefined;
  setEntry(value?: iyag_io_chat_entry_pb.Entry): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListenRes.AsObject;
  static toObject(includeInstance: boolean, msg: ListenRes): ListenRes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListenRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListenRes;
  static deserializeBinaryFromReader(message: ListenRes, reader: jspb.BinaryReader): ListenRes;
}

export namespace ListenRes {
  export type AsObject = {
    entry?: iyag_io_chat_entry_pb.Entry.AsObject,
  }
}

export class PostReq extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  getThreadId(): string;
  setThreadId(value: string): void;

  hasEntry(): boolean;
  clearEntry(): void;
  getEntry(): iyag_io_chat_entry_pb.Entry | undefined;
  setEntry(value?: iyag_io_chat_entry_pb.Entry): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PostReq.AsObject;
  static toObject(includeInstance: boolean, msg: PostReq): PostReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PostReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PostReq;
  static deserializeBinaryFromReader(message: PostReq, reader: jspb.BinaryReader): PostReq;
}

export namespace PostReq {
  export type AsObject = {
    channelId: string,
    threadId: string,
    entry?: iyag_io_chat_entry_pb.Entry.AsObject,
  }
}

export class PostRes extends jspb.Message {
  hasEntry(): boolean;
  clearEntry(): void;
  getEntry(): iyag_io_chat_entry_pb.Entry | undefined;
  setEntry(value?: iyag_io_chat_entry_pb.Entry): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PostRes.AsObject;
  static toObject(includeInstance: boolean, msg: PostRes): PostRes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PostRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PostRes;
  static deserializeBinaryFromReader(message: PostRes, reader: jspb.BinaryReader): PostRes;
}

export namespace PostRes {
  export type AsObject = {
    entry?: iyag_io_chat_entry_pb.Entry.AsObject,
  }
}

export class ArchiveReq extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ArchiveReq.AsObject;
  static toObject(includeInstance: boolean, msg: ArchiveReq): ArchiveReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ArchiveReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ArchiveReq;
  static deserializeBinaryFromReader(message: ArchiveReq, reader: jspb.BinaryReader): ArchiveReq;
}

export namespace ArchiveReq {
  export type AsObject = {
    channelId: string,
  }
}

export class ArchiveRes extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ArchiveRes.AsObject;
  static toObject(includeInstance: boolean, msg: ArchiveRes): ArchiveRes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ArchiveRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ArchiveRes;
  static deserializeBinaryFromReader(message: ArchiveRes, reader: jspb.BinaryReader): ArchiveRes;
}

export namespace ArchiveRes {
  export type AsObject = {
  }
}

