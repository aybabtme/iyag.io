import * as React from "react";

import { ChannelClient, ServiceError } from "../gen/iyag.io/chat/chatsrv/channel_pb_service"
import { ListChannelReq, ListChannelRes, EventCreateReq, EventCreateRes, EventAuth } from "../gen/iyag.io/chat/chatsrv/channel_pb";
import { ChannelList } from "./ChannelList";
import { Channel } from "./Channel";
import { CreateChannelInput } from "./CreateChannelInput";
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
            <ChannelList channels={this.state.channels} onChannelChanged={this.onChannelChanged} />
            <CreateChannelInput onCreateChannel={this.onCreateChannel} />
            <Channel authorID={this.props.authorID} channelName={this.state.activeChannel} client={this.props.client} />
        </div>
    }

    // helpers

    onChannelChanged = (channelName: string) => {
        console.log("joining channel '"+channelName+"'")
        this.setState({
            activeChannel: channelName
        });
    }

    onCreateChannel = (uuid: string, channelName: string, onSuccess: ()=> void) => {
        this.createChannel(uuid, channelName, () => {
            console.log("created channel '"+channelName+"', updating list")
            this.updateChannelList();
            this.onChannelChanged(channelName);
            onSuccess();
        })
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
            this.setState({
                channels: channelMetas,
            });
        });
    }

    createChannel = (uuid: string, channelName: string, onSuccess: () => void) => {
        const auth = new EventAuth();
        auth.setAuthorId(this.props.authorID);
        const req = new EventCreateReq();
        req.setAuth(auth);
        req.setUuid(uuid);
        req.setChannelName(channelName);
        this.props.client.eventCreate(req, (err: ServiceError | null, res: EventCreateRes | null) => {
            if (err != null) {
                console.error(err);
                return
            }
            if (res == null) {
                console.error("null response on null error")
                return
            }
            onSuccess();
        });
    }
}