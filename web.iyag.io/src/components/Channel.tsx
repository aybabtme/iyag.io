import * as React from "react";

import { ChannelClient, ServiceError, Status } from "../gen/iyag.io/chat/chatsrv/channel_pb_service"
import { ListenUserEventReq, ListenUserEventRes, GetChannelReq, GetChannelRes, EventSendReq, EventSendRes, EventAuth } from "../gen/iyag.io/chat/chatsrv/channel_pb"
import { Entry, EntryMeta, EntryContent } from "../gen/iyag.io/chat/entry_pb";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { EntryInput } from "./EntryInput";
import { EntryList } from "./EntryList";
import { EventMeta, ChannelUserEvent } from "../gen/iyag.io/chat/event_pb";

export interface ChannelProps {
    authorID: string,
    channelName: string,
    client: ChannelClient
}

// 'ChannelProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Channel extends React.Component<ChannelProps, {}> {

    state: {
        name: string,
        authors: string[],
        entries: Entry[],
        lastEvent: EventMeta | undefined,

        createdAt: Timestamp | undefined,
        createdBy: string | null,
        archivedAt: Timestamp | undefined,
        archivedBy: string | null,
    }

    constructor(props: ChannelProps) {
        super(props)
        this.state = {
            name: "",
            authors: [],
            entries: [],
            lastEvent: undefined,
            createdAt: undefined,
            createdBy: null,
            archivedAt: undefined,
            archivedBy: null,
        }
    }

    // hooks

    componentDidMount = () => {
        this.updateState(this.listenFrom);
    }


    render = () => {
        return <div className="channel">
            <EntryList entries={this.state.entries} />
            <EntryInput sendEntry={this.sendEntry} />
        </div>
    }

    // RPC bindings

    updateState = (onState: (event: EventMeta) => void) => {
        const req = new GetChannelReq();
        req.setChannelName(this.props.channelName);
        this.props.client.getChannel(req, (err: ServiceError | null, res: GetChannelRes | null) => {
            if (err != null) {
                console.error(err);
                return
            }
            if (res == null) {
                console.error("null response on null error")
                return
            }
            const channel = res.getChannel();
            if (channel == null || channel == undefined) {
                console.error("no channel in response");
                return
            }
            const meta = channel.getMeta();
            if (meta == null || meta == undefined) {
                console.error("no meta in response");
                return
            }
            const content = channel.getContent();
            if (content == null || content == undefined) {
                console.error("no content in response");
                return
            }
            this.state.name = meta.getName();
            this.state.authors = meta.getAuthorIdsList();
            this.state.lastEvent = meta.getLastEvent();

            this.state.createdBy = meta.getCreatedBy();
            this.state.createdAt = meta.getCreatedAt();
            this.state.archivedBy = meta.getArchivedBy();
            this.state.archivedAt = meta.getArchivedAt();

            const lastEventMeta = meta.getLastEvent();
            if (lastEventMeta != undefined) {
                onState(lastEventMeta);
            }

            this.state.entries = content.getEntriesList();
        });
    }

    listenFrom = (event: EventMeta) => {
        const req = new ListenUserEventReq();
        req.setChannelName(this.state.name);
        req.setFromSequence(event.getSequence());
        const stream = this.props.client.listenUserEvent(req);
        stream.on("data", (res: ListenUserEventRes) => {
            const event = res.getEvent();
            if (event == undefined) {
                return
            }
            this.applyEvent(event);
        })
        stream.on("status", (status: Status) => {
            console.warn("can't do", status)
        })
        stream.on("end", () => {
            console.info("channel stream ended");
        })
    }

    sendEntry = (uuid: string, message: string) => {

        const auth = new EventAuth();
        auth.setAuthorId(this.props.authorID);

        const entry = new Entry();
        const meta = new EntryMeta();
        const now = new Timestamp();
        now.fromDate(new Date());
        meta.setAuthorId(this.props.authorID);
        meta.setChannelName(this.state.name);
        meta.setUuid(uuid);
        meta.setTime(now);
        const content = new EntryContent();
        content.setBody(message);
        entry.setMeta(meta);
        entry.setContent(content);
        
        const req = new EventSendReq();
        req.setUuid(uuid);
        req.setAuth(auth);
        req.setChannelName(this.state.name);
        req.setEntry(entry);

        this.props.client.eventSend(req, (err: ServiceError | null) => {
            if (err != null) {
                console.error(err);
                return
            }
        });
    }

    applyEvent = (event: ChannelUserEvent) => {
        const meta = event.getMeta();
        if (meta == undefined) {
            return
        }
        let time = meta.getTime();
        if (time == undefined) {
            time = new Timestamp();
            time.fromDate(new Date());
        }
        this.state.lastEvent = event.getMeta();
        switch (event.getEventCase()) {
        case ChannelUserEvent.EventCase.CREATED:
            if (this.wasCreated()) {
                return
            }
            this.state.name = event.getChannelName()
            this.state.createdBy = event.getAuthorId()
            this.state.createdAt = time;
            return
        case ChannelUserEvent.EventCase.ARCHIVED:
            if (!this.isActive()) {
                return
            }
            this.state.archivedBy = event.getAuthorId()
            this.state.archivedAt = time;
            return
        case ChannelUserEvent.EventCase.JOINED:
            if (!this.isActive()) {
                return
            }
            if (this.state.authors.some((value: string) => { return value == event.getAuthorId()})) {
                return
            }
            return
        case ChannelUserEvent.EventCase.LEFT:
            if (!this.isActive()) {
                return
            }
            this.state.authors = this.state.authors.filter((value: string) => {
                return value != event.getAuthorId()
            })
            return
        case ChannelUserEvent.EventCase.TYPED:
            if (!this.isActive()) {
                return
            }
            return
        case ChannelUserEvent.EventCase.SENT:
            if (!this.isActive()) {
                return
            }
            const sent = event.getSent();
            if (sent == undefined) {
                return
            }
            const entry = sent.getEntry();
            if (entry == undefined) {
                return
            }
            const entryMeta = entry.getMeta();
            if (entryMeta == undefined) {
                return
            }
            const dupe = this.state.entries.some((existing: Entry): boolean => {
                const meta = existing.getMeta();
                if (meta == undefined) {
                    return false
                }
                if (meta.getUuid() != entryMeta.getUuid()) {
                    return false
                }
                existing.setContent(entry.getContent());
                return true
            })
            if (!dupe) {
                this.state.entries.push(entry)
            }
            return
        default:
            // do nothing
            return
        }
    }

    // helpers

    isActive = () : boolean => {
        return this.wasCreated() && !this.wasArchived()
    }

    wasCreated = () : boolean => {
        return this.state.createdAt != undefined
    }

    wasArchived = () : boolean => {
        return this.state.archivedAt != undefined
    }
}