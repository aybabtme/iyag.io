// package: iyag.io.chat.chatsrv
// file: iyag.io/chat/chatsrv/channel.proto

import * as jspb from "google-protobuf";
import * as iyag_io_chat_entry_pb from "../../../iyag.io/chat/entry_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class EventReq extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  getAuthorId(): string;
  setAuthorId(value: string): void;

  hasJoin(): boolean;
  clearJoin(): void;
  getJoin(): EventReq.Join | undefined;
  setJoin(value?: EventReq.Join): void;

  hasLeave(): boolean;
  clearLeave(): void;
  getLeave(): EventReq.Leave | undefined;
  setLeave(value?: EventReq.Leave): void;

  hasTyping(): boolean;
  clearTyping(): void;
  getTyping(): EventReq.Typing | undefined;
  setTyping(value?: EventReq.Typing): void;

  hasSend(): boolean;
  clearSend(): void;
  getSend(): EventReq.Send | undefined;
  setSend(value?: EventReq.Send): void;

  getEventCase(): EventReq.EventCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventReq.AsObject;
  static toObject(includeInstance: boolean, msg: EventReq): EventReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventReq;
  static deserializeBinaryFromReader(message: EventReq, reader: jspb.BinaryReader): EventReq;
}

export namespace EventReq {
  export type AsObject = {
    channelId: string,
    authorId: string,
    join?: EventReq.Join.AsObject,
    leave?: EventReq.Leave.AsObject,
    typing?: EventReq.Typing.AsObject,
    send?: EventReq.Send.AsObject,
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

  export class Typing extends jspb.Message {
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Typing.AsObject;
    static toObject(includeInstance: boolean, msg: Typing): Typing.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Typing, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Typing;
    static deserializeBinaryFromReader(message: Typing, reader: jspb.BinaryReader): Typing;
  }

  export namespace Typing {
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
    JOIN = 201,
    LEAVE = 202,
    TYPING = 203,
    SEND = 204,
  }
}

export class EventRes extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  hasUserJoined(): boolean;
  clearUserJoined(): void;
  getUserJoined(): EventRes.UserJoined | undefined;
  setUserJoined(value?: EventRes.UserJoined): void;

  hasUserLeft(): boolean;
  clearUserLeft(): void;
  getUserLeft(): EventRes.UserLeft | undefined;
  setUserLeft(value?: EventRes.UserLeft): void;

  hasUserTyping(): boolean;
  clearUserTyping(): void;
  getUserTyping(): EventRes.UserTyping | undefined;
  setUserTyping(value?: EventRes.UserTyping): void;

  hasUserSent(): boolean;
  clearUserSent(): void;
  getUserSent(): EventRes.UserSent | undefined;
  setUserSent(value?: EventRes.UserSent): void;

  getEventCase(): EventRes.EventCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventRes.AsObject;
  static toObject(includeInstance: boolean, msg: EventRes): EventRes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventRes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventRes;
  static deserializeBinaryFromReader(message: EventRes, reader: jspb.BinaryReader): EventRes;
}

export namespace EventRes {
  export type AsObject = {
    channelId: string,
    userJoined?: EventRes.UserJoined.AsObject,
    userLeft?: EventRes.UserLeft.AsObject,
    userTyping?: EventRes.UserTyping.AsObject,
    userSent?: EventRes.UserSent.AsObject,
  }

  export class UserJoined extends jspb.Message {
    getAuthorId(): string;
    setAuthorId(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserJoined.AsObject;
    static toObject(includeInstance: boolean, msg: UserJoined): UserJoined.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserJoined, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserJoined;
    static deserializeBinaryFromReader(message: UserJoined, reader: jspb.BinaryReader): UserJoined;
  }

  export namespace UserJoined {
    export type AsObject = {
      authorId: string,
    }
  }

  export class UserLeft extends jspb.Message {
    getAuthorId(): string;
    setAuthorId(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserLeft.AsObject;
    static toObject(includeInstance: boolean, msg: UserLeft): UserLeft.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserLeft, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserLeft;
    static deserializeBinaryFromReader(message: UserLeft, reader: jspb.BinaryReader): UserLeft;
  }

  export namespace UserLeft {
    export type AsObject = {
      authorId: string,
    }
  }

  export class UserTyping extends jspb.Message {
    getAuthorId(): string;
    setAuthorId(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserTyping.AsObject;
    static toObject(includeInstance: boolean, msg: UserTyping): UserTyping.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserTyping, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserTyping;
    static deserializeBinaryFromReader(message: UserTyping, reader: jspb.BinaryReader): UserTyping;
  }

  export namespace UserTyping {
    export type AsObject = {
      authorId: string,
    }
  }

  export class UserSent extends jspb.Message {
    getAuthorId(): string;
    setAuthorId(value: string): void;

    hasEntry(): boolean;
    clearEntry(): void;
    getEntry(): iyag_io_chat_entry_pb.Entry | undefined;
    setEntry(value?: iyag_io_chat_entry_pb.Entry): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserSent.AsObject;
    static toObject(includeInstance: boolean, msg: UserSent): UserSent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserSent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserSent;
    static deserializeBinaryFromReader(message: UserSent, reader: jspb.BinaryReader): UserSent;
  }

  export namespace UserSent {
    export type AsObject = {
      authorId: string,
      entry?: iyag_io_chat_entry_pb.Entry.AsObject,
    }
  }

  export enum EventCase {
    EVENT_NOT_SET = 0,
    USER_JOINED = 201,
    USER_LEFT = 202,
    USER_TYPING = 203,
    USER_SENT = 204,
  }
}

