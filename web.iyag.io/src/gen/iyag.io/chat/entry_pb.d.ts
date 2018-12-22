// package: iyag.io.chat
// file: iyag.io/chat/entry.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class Entry extends jspb.Message {
  hasMeta(): boolean;
  clearMeta(): void;
  getMeta(): EntryMeta | undefined;
  setMeta(value?: EntryMeta): void;

  hasContent(): boolean;
  clearContent(): void;
  getContent(): EntryContent | undefined;
  setContent(value?: EntryContent): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Entry.AsObject;
  static toObject(includeInstance: boolean, msg: Entry): Entry.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Entry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Entry;
  static deserializeBinaryFromReader(message: Entry, reader: jspb.BinaryReader): Entry;
}

export namespace Entry {
  export type AsObject = {
    meta?: EntryMeta.AsObject,
    content?: EntryContent.AsObject,
  }
}

export class EntryMeta extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): void;

  getChannelId(): string;
  setChannelId(value: string): void;

  getThreadId(): string;
  setThreadId(value: string): void;

  getAuthorId(): string;
  setAuthorId(value: string): void;

  hasTime(): boolean;
  clearTime(): void;
  getTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTime(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getSequence(): number;
  setSequence(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EntryMeta.AsObject;
  static toObject(includeInstance: boolean, msg: EntryMeta): EntryMeta.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EntryMeta, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EntryMeta;
  static deserializeBinaryFromReader(message: EntryMeta, reader: jspb.BinaryReader): EntryMeta;
}

export namespace EntryMeta {
  export type AsObject = {
    uuid: string,
    channelId: string,
    threadId: string,
    authorId: string,
    time?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    sequence: number,
  }
}

export class EntryContent extends jspb.Message {
  getBody(): string;
  setBody(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EntryContent.AsObject;
  static toObject(includeInstance: boolean, msg: EntryContent): EntryContent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EntryContent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EntryContent;
  static deserializeBinaryFromReader(message: EntryContent, reader: jspb.BinaryReader): EntryContent;
}

export namespace EntryContent {
  export type AsObject = {
    body: string,
  }
}

