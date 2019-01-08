// package: iyag.io.chat
// file: iyag.io/chat/event.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as iyag_io_chat_entry_pb from "../../iyag.io/chat/entry_pb";

export class EventMeta extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): void;

  hasTime(): boolean;
  clearTime(): void;
  getTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTime(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getSequence(): number;
  setSequence(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventMeta.AsObject;
  static toObject(includeInstance: boolean, msg: EventMeta): EventMeta.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventMeta, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventMeta;
  static deserializeBinaryFromReader(message: EventMeta, reader: jspb.BinaryReader): EventMeta;
}

export namespace EventMeta {
  export type AsObject = {
    uuid: string,
    time?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    sequence: number,
  }
}

export class ChannelState extends jspb.Message {
  hasLastEvent(): boolean;
  clearLastEvent(): void;
  getLastEvent(): EventMeta | undefined;
  setLastEvent(value?: EventMeta): void;

  clearEntriesList(): void;
  getEntriesList(): Array<iyag_io_chat_entry_pb.Entry>;
  setEntriesList(value: Array<iyag_io_chat_entry_pb.Entry>): void;
  addEntries(value?: iyag_io_chat_entry_pb.Entry, index?: number): iyag_io_chat_entry_pb.Entry;

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

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChannelState.AsObject;
  static toObject(includeInstance: boolean, msg: ChannelState): ChannelState.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChannelState, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChannelState;
  static deserializeBinaryFromReader(message: ChannelState, reader: jspb.BinaryReader): ChannelState;
}

export namespace ChannelState {
  export type AsObject = {
    lastEvent?: EventMeta.AsObject,
    entriesList: Array<iyag_io_chat_entry_pb.Entry.AsObject>,
    authorIdsList: Array<string>,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    archivedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    createdBy: string,
    archivedBy: string,
    name: string,
  }
}

export class ChannelUserEvent extends jspb.Message {
  hasMeta(): boolean;
  clearMeta(): void;
  getMeta(): EventMeta | undefined;
  setMeta(value?: EventMeta): void;

  getChannelName(): string;
  setChannelName(value: string): void;

  getAuthorId(): string;
  setAuthorId(value: string): void;

  hasCreated(): boolean;
  clearCreated(): void;
  getCreated(): ChannelUserEvent.Create | undefined;
  setCreated(value?: ChannelUserEvent.Create): void;

  hasArchived(): boolean;
  clearArchived(): void;
  getArchived(): ChannelUserEvent.Archive | undefined;
  setArchived(value?: ChannelUserEvent.Archive): void;

  hasJoined(): boolean;
  clearJoined(): void;
  getJoined(): ChannelUserEvent.Join | undefined;
  setJoined(value?: ChannelUserEvent.Join): void;

  hasLeft(): boolean;
  clearLeft(): void;
  getLeft(): ChannelUserEvent.Leave | undefined;
  setLeft(value?: ChannelUserEvent.Leave): void;

  hasTyped(): boolean;
  clearTyped(): void;
  getTyped(): ChannelUserEvent.Type | undefined;
  setTyped(value?: ChannelUserEvent.Type): void;

  hasSent(): boolean;
  clearSent(): void;
  getSent(): ChannelUserEvent.Send | undefined;
  setSent(value?: ChannelUserEvent.Send): void;

  getEventCase(): ChannelUserEvent.EventCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChannelUserEvent.AsObject;
  static toObject(includeInstance: boolean, msg: ChannelUserEvent): ChannelUserEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChannelUserEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChannelUserEvent;
  static deserializeBinaryFromReader(message: ChannelUserEvent, reader: jspb.BinaryReader): ChannelUserEvent;
}

export namespace ChannelUserEvent {
  export type AsObject = {
    meta?: EventMeta.AsObject,
    channelName: string,
    authorId: string,
    created?: ChannelUserEvent.Create.AsObject,
    archived?: ChannelUserEvent.Archive.AsObject,
    joined?: ChannelUserEvent.Join.AsObject,
    left?: ChannelUserEvent.Leave.AsObject,
    typed?: ChannelUserEvent.Type.AsObject,
    sent?: ChannelUserEvent.Send.AsObject,
  }

  export class Create extends jspb.Message {
    getName(): string;
    setName(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Create.AsObject;
    static toObject(includeInstance: boolean, msg: Create): Create.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Create, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Create;
    static deserializeBinaryFromReader(message: Create, reader: jspb.BinaryReader): Create;
  }

  export namespace Create {
    export type AsObject = {
      name: string,
    }
  }

  export class Archive extends jspb.Message {
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Archive.AsObject;
    static toObject(includeInstance: boolean, msg: Archive): Archive.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Archive, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Archive;
    static deserializeBinaryFromReader(message: Archive, reader: jspb.BinaryReader): Archive;
  }

  export namespace Archive {
    export type AsObject = {
    }
  }

  export class Join extends jspb.Message {
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Join.AsObject;
    static toObject(includeInstance: boolean, msg: Join): Join.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Join, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Join;
    static deserializeBinaryFromReader(message: Join, reader: jspb.BinaryReader): Join;
  }

  export namespace Join {
    export type AsObject = {
    }
  }

  export class Leave extends jspb.Message {
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Leave.AsObject;
    static toObject(includeInstance: boolean, msg: Leave): Leave.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Leave, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Leave;
    static deserializeBinaryFromReader(message: Leave, reader: jspb.BinaryReader): Leave;
  }

  export namespace Leave {
    export type AsObject = {
    }
  }

  export class Type extends jspb.Message {
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Type.AsObject;
    static toObject(includeInstance: boolean, msg: Type): Type.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Type, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Type;
    static deserializeBinaryFromReader(message: Type, reader: jspb.BinaryReader): Type;
  }

  export namespace Type {
    export type AsObject = {
    }
  }

  export class Send extends jspb.Message {
    hasEntry(): boolean;
    clearEntry(): void;
    getEntry(): iyag_io_chat_entry_pb.Entry | undefined;
    setEntry(value?: iyag_io_chat_entry_pb.Entry): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Send.AsObject;
    static toObject(includeInstance: boolean, msg: Send): Send.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Send, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Send;
    static deserializeBinaryFromReader(message: Send, reader: jspb.BinaryReader): Send;
  }

  export namespace Send {
    export type AsObject = {
      entry?: iyag_io_chat_entry_pb.Entry.AsObject,
    }
  }

  export enum EventCase {
    EVENT_NOT_SET = 0,
    CREATED = 201,
    ARCHIVED = 202,
    JOINED = 203,
    LEFT = 204,
    TYPED = 205,
    SENT = 206,
  }
}

