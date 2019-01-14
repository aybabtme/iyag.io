import * as React from "react";
import { ChannelMeta } from "../gen/iyag.io/chat/channel_pb";

export interface ChannelListProps { 
    onChannelChanged: (channelName: string) => void
    channels: Array<ChannelMeta>
}

// 'ChannelListProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class ChannelList extends React.Component<ChannelListProps, {}> {
    render = () => {
        console.log(this.props.channels);
        return <ul className="channel-list">
            {this.props.channels.map((meta: ChannelMeta) => {
                if (meta == null || meta == undefined) {
                    console.error("no channel in response");
                    return
                }
                return (
                    <li key={meta.getName()} className="channel_list_item">
                    <button onClick={this.handleChannelClick(meta.getName())}>{meta.getName()}</button>
                    </li>
                )
            })}
        </ul>
    }

    handleChannelClick = (channelName: string) => () => {
        console.log("opening channel '" + channelName + "'")
        this.props.onChannelChanged(channelName);
        return () => {}
    }
}