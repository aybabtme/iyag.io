import * as React from "react";
import { v4 as uuid } from "uuid";

export interface CreateChannelInputProps {
    onCreateChannel: (uuid: string, channelName: string, onSuccess: () => void) => void
}

// 'CreateChannelInputProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class CreateChannelInput extends React.Component<CreateChannelInputProps, {}> {
    state: {
        uuid: string,
        channelName:string
    }

    constructor(props: CreateChannelInputProps) {
        super(props);
        this.state = { 
            uuid: uuid(),
            channelName: ""
        }
    }

    render = () => {
        return <form
                    onSubmit={this.handleSubmit}
                    className="create-channel-form">
                    <input
                        onChange={this.handleChange}
                        value={this.state.channelName}
                        placeholder="Enter a new channel name"
                        type="text" />
                </form>
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            channelName: e.currentTarget.value
        })
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        this.props.onCreateChannel(this.state.uuid, this.state.channelName, () => {
            this.setState({
                uuid: uuid(),
                channelName: "",
            })
        });
    }
}