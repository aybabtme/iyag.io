import * as React from "react";
import * as ReactDOM from "react-dom";

import { ChannelClient } from "./gen/iyag.io/chat/chatsrv/channel_pb_service"
import { Hello } from "./components/Hello";

const client = new ChannelClient("http://127.0.0.1:3000");

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("example")
);