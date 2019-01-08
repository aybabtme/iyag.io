import * as React from "react";
import { v4 as uuid } from "uuid";

export interface EntryInputProps {
    sendEntry: (uuid: string, body: string) => void
}

// 'EntryInputProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class EntryInput extends React.Component<EntryInputProps, {}> {
    state: {uuid:string, body: string}

    constructor(props: EntryInputProps) {
        super(props);
        this.state = {
            uuid: uuid(),
            body: "",
        }
    }

    render = () => {
        return <form
                    onSubmit={this.handleSubmit}
                    className="send-body-form">
                    <input
                        onChange={this.handleChange}
                        value={this.state.body}
                        placeholder="Type your message and hit ENTER"
                        type="text" />
                </form>
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            body: e.currentTarget.value
        })
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        this.props.sendEntry(this.state.uuid, this.state.body)
        this.setState({
            uuid: uuid(),
            body: "",
        })
    }
}