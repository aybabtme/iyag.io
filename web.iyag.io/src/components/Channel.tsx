import * as React from "react";

import { ChannelClient, ServiceError, Status } from "../gen/iyag.io/chat/chatsrv/channel_pb_service"
import { PostReq, PostRes, ListenReq, ListenRes } from "../gen/iyag.io/chat/chatsrv/channel_pb"
import { Entry, EntryMeta, EntryContent } from "../gen/iyag.io/chat/entry_pb";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { EntryInput } from "./EntryInput";
import { EntryList } from "./EntryList";

export interface ChannelProps { 
    author_id: string,
    channel_id: string,
    client: ChannelClient
}

// 'ChannelProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Channel extends React.Component<ChannelProps, {}> {
    
    state: {
        entries: Array<Entry>
    }

    constructor(props: ChannelProps) {
        super(props)
        this.state = {
            entries: []
        }
    }

    componentDidMount = () => {
        const listen_req = new ListenReq();
        const forever = new Timestamp();
        listen_req.setFrom(forever);
        listen_req.setChannelId(this.props.channel_id);
        const stream = this.props.client.listen(listen_req);
        stream.on("data", (res: ListenRes) => {
            if (!res.hasEntry()) {
                return
            }
            const entry = res.getEntry()
            this.setState({
                entries: [...this.state.entries, entry]
            })
        })
        stream.on("status", (status: Status) => {
            console.warn("can't do", status)
        })
        stream.on("end", () => {
            console.info("channel stream ended");
        })
    }


    sendEntry = (uuid: string, message: string) => {
        
        const now = new Timestamp();
        now.fromDate(new Date());

        const entry = new Entry();
        const meta = new EntryMeta();
        meta.setAuthorId(this.props.author_id);
        meta.setChannelId(this.props.channel_id);
        meta.setUuid(uuid);
        meta.setTime(now);
        const content = new EntryContent();
        content.setBody(message);
        entry.setMeta(meta);
        entry.setContent(content);

        const req = new PostReq();
        req.setChannelId(this.props.channel_id)
        req.setEntry(entry);

        this.props.client.post(req, (err: ServiceError | null, res: PostRes | null) => { 
            if (err != null) {
                console.error(err);
                return
            }
            if (res == null) {
                console.error("null response on null error")
                return 
            }
            const entry = res.getEntry();
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
            console.log(meta.getSequence());
            console.log(content.getBody());
        });
    }
    
    render = () => {
        return <div className="channel">
            <EntryList  entries={this.state.entries} />
            <EntryInput sendEntry={this.sendEntry} />
        </div>
    }
}