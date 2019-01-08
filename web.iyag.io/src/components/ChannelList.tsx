import * as React from "react";
import { ChannelMeta } from "../gen/iyag.io/chat/channel_pb";

export interface ChannelListProps { 
    channels: Array<ChannelMeta>
}

// 'ChannelListProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class ChannelList extends React.Component<ChannelListProps, {}> {
    render = () => {
        return <ul className="message-list">
            {this.props.channels.map((meta: ChannelMeta) => {
                if (meta == null || meta == undefined) {
                    console.error("no channel in response");
                    return
                }

                return (
                    <li key={meta.getName()} className="channel_list_item">
                    <div>{meta.getName()}</div>
                    </li>
                )
            })}
        </ul>
    }
}