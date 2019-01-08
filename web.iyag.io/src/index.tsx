import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChannelClient } from "./gen/iyag.io/chat/chatsrv/channel_pb_service"
import { Chat } from "./components/Chat";

const client = new ChannelClient("http://localhost:8080");

ReactDOM.render(
    <Chat authorID="@antoine" client={client} />,
    document.getElementById("example")
);