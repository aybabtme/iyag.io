import * as React from "react";

import { ChannelClient, ServiceError, Status, ResponseStream } from "../gen/iyag.io/chat/chatsrv/channel_pb_service"
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

interface ChannelState {
    authors: string[],
    entries: Entry[],
    lastEvent: EventMeta | undefined,

    createdAt: Timestamp | undefined,
    createdBy: string | null,
    archivedAt: Timestamp | undefined,
    archivedBy: string | null,
}
// 'ChannelProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Channel extends React.Component<ChannelProps, ChannelState> {

    state: ChannelState

    stream: ResponseStream<ListenUserEventRes> | null

    constructor(props: ChannelProps) {
        super(props)
        this.state = {
            authors: [],
            entries: [],
            lastEvent: undefined,
            createdAt: undefined,
            createdBy: null,
            archivedAt: undefined,
            archivedBy: null,
        }
        this.stream = null
    }

    // hooks

    componentDidMount = () => {
        this.getChannel(this.listenToChannel);
    }

    componentDidUpdate = (prevProps: ChannelProps) => {
        if (this.props.channelName != prevProps.channelName) {
            this.getChannel(this.listenToChannel);
        }
    }


    render = () => {
        if (this.props.channelName == "") {
            return <div>No channel selected</div>
        }
        return <div className="channel">
            <div>You are in channel {this.props.channelName}</div>
            <EntryList entries={this.state.entries} />
            <EntryInput sendEntry={this.sendEntry} />
        </div>
    }

    // RPC bindings

    getChannel = (onState: (event: EventMeta) => void) => {
        console.log("loading state of channel '"+this.props.channelName+"'");
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
            
            this.setState({
                authors: meta.getAuthorIdsList(),
                lastEvent: meta.getLastEvent(),
                createdBy: meta.getCreatedBy(),
                createdAt: meta.getCreatedAt(),
                archivedBy: meta.getArchivedBy(),
                archivedAt: meta.getArchivedAt(),
                entries: content.getEntriesList(),
            })

            const lastEventMeta = meta.getLastEvent();
            if (lastEventMeta != undefined) {
                onState(lastEventMeta);
            }
        });
    }

    listenToChannel = (event: EventMeta) => {
        
        console.log("watching for new events");

        const req = new ListenUserEventReq();
        req.setChannelName(this.props.channelName);
        req.setFromSequence(event.getSequence());

        if (this.stream != null) {
            this.stream.cancel();
        }
        this.stream = this.props.client.listenUserEvent(req);
        this.stream.on("data", (res: ListenUserEventRes) => {
            const event = res.getEvent();
            if (event == undefined) {
                return
            }
            this.applyEvent(event);
        })
        this.stream.on("status", (status: Status) => {
            console.warn("can't do", status)
        })
        this.stream.on("end", () => {
            console.info("channel stream ended");
        })
    }

    sendEntry = (uuid: string, message: string, onSuccess: () => void) => {

        const auth = new EventAuth();
        auth.setAuthorId(this.props.authorID);

        const entry = new Entry();
        const meta = new EntryMeta();
        const now = new Timestamp();
        now.fromDate(new Date());
        meta.setAuthorId(this.props.authorID);
        meta.setChannelName(this.props.channelName);
        meta.setUuid(uuid);
        meta.setTime(now);
        const content = new EntryContent();
        content.setBody(message);
        entry.setMeta(meta);
        entry.setContent(content);
        
        const req = new EventSendReq();
        req.setUuid(uuid);
        req.setAuth(auth);
        req.setChannelName(this.props.channelName);
        req.setEntry(entry);

        console.log("sending message to channel '"+this.props.channelName+"'");
        this.props.client.eventSend(req, (err: ServiceError | null) => {
            if (err != null) {
                console.error(err);
                return
            }
            console.log("message sent"); 
            onSuccess();
        });
    }

    applyEvent = (event: ChannelUserEvent) => {
        console.log("received an event");
        const meta = event.getMeta();
        if (meta == undefined) {
            return
        }
        let time = meta.getTime();
        if (time == undefined) {
            time = new Timestamp();
            time.fromDate(new Date());
        }
        this.setState({lastEvent: event.getMeta()});
        switch (event.getEventCase()) {
        case ChannelUserEvent.EventCase.CREATED:
            if (this.wasCreated()) {
                return
            }
            // is ignored: event.getChannelName() 
            this.setState({
                createdBy: event.getAuthorId(),
                createdAt: time,
            });
            break
        case ChannelUserEvent.EventCase.ARCHIVED:
            if (!this.isActive()) {
                return
            }
            this.setState({
                archivedBy: event.getAuthorId(),
                archivedAt: time,
            });
            break
        case ChannelUserEvent.EventCase.JOINED:
            if (!this.isActive()) {
                return
            }
            if (this.state.authors.some((value: string) => { return value == event.getAuthorId()})) {
                return
            }
            break
        case ChannelUserEvent.EventCase.LEFT:
            if (!this.isActive()) {
                return;
            }
            this.setState((prevState: Readonly<ChannelState>, props: Readonly<ChannelProps>): ChannelState =>  {
                let authors = prevState.authors.filter((value: string) => {
                    return value != event.getAuthorId()
                })
                return {authors: authors} as ChannelState
            })

            break
        case ChannelUserEvent.EventCase.TYPED:
            if (!this.isActive()) {
                return
            }
            break
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
                this.setState((prevState: Readonly<ChannelState>, props: Readonly<ChannelProps>): ChannelState =>  {
                    let out: ChannelState = prevState
                    out.entries.push(entry);
                    return out
                })
            }
            break
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