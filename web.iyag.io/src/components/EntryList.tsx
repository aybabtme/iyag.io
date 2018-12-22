import * as React from "react";

import { Entry } from "../gen/iyag.io/chat/entry_pb";

export interface EntryListProps { 
    entries: Array<Entry>
}

// 'EntryListProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class EntryList extends React.Component<EntryListProps, {}> {
    render = () => {
        return <ul className="message-list">
            {this.props.entries.map((entry: Entry) => {
                if (entry == null || entry == undefined) {
                    console.error("no entry in response");
                    return
                }
                const meta = entry.getMeta();
                if (meta == null || meta == undefined) {
                    console.error("no meta in entry");
                    return
                }
                const content = entry.getContent();
                if (content == null || content == undefined) {
                    console.error("no content in entry");
                    return
                }
                return (
                    <li key={meta.getSequence()} className="message">
                    <div>{meta.getAuthorId()}</div>
                    <div>{content.getBody()}</div>
                    </li>
                )
            })}
        </ul>
    }
}