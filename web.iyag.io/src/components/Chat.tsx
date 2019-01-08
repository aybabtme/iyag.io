import * as React from "react";

import { ChannelClient, ServiceError } from "../gen/iyag.io/chat/chatsrv/channel_pb_service"
import { ListChannelReq, ListChannelRes } from "../gen/iyag.io/chat/chatsrv/channel_pb";
import { ChannelList } from "./ChannelList";
import { Channel } from "./Channel";
import { ChannelMeta } from "../gen/iyag.io/chat/channel_pb";

export interface ChatProps {
    authorID: string,
    client: ChannelClient
}

// 'ChatProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Chat extends React.Component<ChatProps, {}> {
    state: {
        activeChannel: string,
        channels: ChannelMeta[],
    }

    constructor(props: ChatProps) {
        super(props)
        this.state = {
            activeChannel: "",
            channels: [],
        }
    }

    // hooks

    componentDidMount = () => {
        this.updateChannelList();
    }

    render = () => {
        return <div className="chat">
            <ChannelList channels={this.state.channels} />
            <Channel authorID={this.props.authorID} channelName={this.state.activeChannel} client={this.props.client} />
        </div>
    }

    // RPC bindings

    updateChannelList = () => {
        const req = new ListChannelReq();
        this.props.client.listChannel(req, (err: ServiceError | null, res: ListChannelRes | null) => {
            if (err != null) {
                console.error(err);
                return
            }
            if (res == null) {
                console.error("null response on null error")
                return
            }
            const channelMetas = res.getChannelsList();
            if (channelMetas == null || channelMetas == undefined) {
                console.error("no channels in response");
                return
            }
            this.state.channels = channelMetas;
        });
    }
}