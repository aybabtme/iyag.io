import * as React from "react";
import * as ReactDOM from "react-dom";
import { v4 as uuid } from "uuid";
import { ChannelClient, ServiceError } from "./gen/iyag.io/chat/chatsrv/channel_pb_service"
import { PostReq, PostRes } from "./gen/iyag.io/chat/chatsrv/channel_pb"
import { Hello } from "./components/Hello";
import { Entry, EntryMeta, EntryContent } from "./gen/iyag.io/chat/entry_pb";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

const client = new ChannelClient("http://localhost:8080");

var now = new Timestamp();
now.fromDate(new Date());

var entry = new Entry();
var meta = new EntryMeta();
meta.setAuthorId("@antoine");
meta.setChannelId("#general");
meta.setUuid(uuid());
meta.setTime(now);
var content = new EntryContent();
content.setBody("joined the channel");
entry.setMeta(meta);
entry.setContent(content);

var req = new PostReq();
req.setChannelId("#general")
req.setEntry(entry);

client.post(req, (err: ServiceError | null, res: PostRes | null) => { 
    if (err != null) {
        console.error(err);
        return
    }
    if (res == null) {
        console.error("null response on null error")
        return 
    }
    var entry = res.getEntry();
    if (entry == null || entry == undefined) {
        console.error("no entry in response");
        return
    }
    var meta = entry.getMeta();
    if (meta == null || meta == undefined) {
        console.error("no meta in entry");
        return
    }
    var content = entry.getContent();
    if (content == null || content == undefined) {
        console.error("no content in entry");
        return
    }
    console.log(meta.getSequence());
    console.log(content.getBody());
});


ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);