import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChannelClient } from "./gen/iyag.io/chat/chatsrv/channel_pb_service"
import { Channel } from "./components/Channel";

const client = new ChannelClient("http://localhost:8080");

ReactDOM.render(
    <Channel author_id="@antoine" channel_id="#general" client={client} />,
    document.getElementById("example")
);