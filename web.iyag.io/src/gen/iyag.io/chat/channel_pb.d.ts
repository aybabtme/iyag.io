// package: iyag.io.chat
// file: iyag.io/chat/channel.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as iyag_io_chat_event_pb from "../../iyag.io/chat/event_pb";
import * as iyag_io_chat_entry_pb from "../../iyag.io/chat/entry_pb";

export class Channel extends jspb.Message {
  hasMeta(): boolean;
  clearMeta(): void;
  getMeta(): ChannelMeta | undefined;
  setMeta(value?: ChannelMeta): void;

  hasContent(): boolean;
  clearContent(): void;
  getContent(): ChannelContent | undefined;
  setContent(value?: ChannelContent): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Channel.AsObject;
  static toObject(includeInstance: boolean, msg: Channel): Channel.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Channel, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Channel;
  static deserializeBinaryFromReader(message: Channel, reader: jspb.BinaryReader): Channel;
}

export namespace Channel {
  export type AsObject = {
    meta?: ChannelMeta.AsObject,
    content?: ChannelContent.AsObject,
  }
}

export class ChannelMeta extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  hasLastEvent(): boolean;
  clearLastEvent(): void;
  getLastEvent(): iyag_io_chat_event_pb.EventMeta | undefined;
  setLastEvent(value?: iyag_io_chat_event_pb.EventMeta): void;

  clearAuthorIdsList(): void;
  getAuthorIdsList(): Array<string>;
  setAuthorIdsList(value: Array<string>): void;
  addAuthorIds(value: string, index?: number): string;

  hasCreatedAt(): boolean;
  clearCreatedAt(): void;
  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasArchivedAt(): boolean;
  clearArchivedAt(): void;
  getArchivedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setArchivedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getCreatedBy(): string;
  setCreatedBy(value: string): void;

  getArchivedBy(): string;
  setArchivedBy(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChannelMeta.AsObject;
  static toObject(includeInstance: boolean, msg: ChannelMeta): ChannelMeta.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChannelMeta, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChannelMeta;
  static deserializeBinaryFromReader(message: ChannelMeta, reader: jspb.BinaryReader): ChannelMeta;
}

export namespace ChannelMeta {
  export type AsObject = {
    name: string,
    lastEvent?: iyag_io_chat_event_pb.EventMeta.AsObject,
    authorIdsList: Array<string>,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    archivedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    createdBy: string,
    archivedBy: string,
  }
}

export class ChannelContent extends jspb.Message {
  clearEntriesList(): void;
  getEntriesList(): Array<iyag_io_chat_entry_pb.Entry>;
  setEntriesList(value: Array<iyag_io_chat_entry_pb.Entry>): void;
  addEntries(value?: iyag_io_chat_entry_pb.Entry, index?: number): iyag_io_chat_entry_pb.Entry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChannelContent.AsObject;
  static toObject(includeInstance: boolean, msg: ChannelContent): ChannelContent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChannelContent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChannelContent;
  static deserializeBinaryFromReader(message: ChannelContent, reader: jspb.BinaryReader): ChannelContent;
}

export namespace ChannelContent {
  export type AsObject = {
    entriesList: Array<iyag_io_chat_entry_pb.Entry.AsObject>,
  }
}

