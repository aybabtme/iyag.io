// Code generated by protoc-gen-go. DO NOT EDIT.
// source: iyag.io/chat/channel.proto

package chat

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"
import timestamp "github.com/golang/protobuf/ptypes/timestamp"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

type Channel struct {
	Meta                 *ChannelMeta    `protobuf:"bytes,1,opt,name=meta" json:"meta,omitempty"`
	Content              *ChannelContent `protobuf:"bytes,2,opt,name=content" json:"content,omitempty"`
	XXX_NoUnkeyedLiteral struct{}        `json:"-"`
	XXX_unrecognized     []byte          `json:"-"`
	XXX_sizecache        int32           `json:"-"`
}

func (m *Channel) Reset()         { *m = Channel{} }
func (m *Channel) String() string { return proto.CompactTextString(m) }
func (*Channel) ProtoMessage()    {}
func (*Channel) Descriptor() ([]byte, []int) {
	return fileDescriptor_channel_445761e2bff0f6fd, []int{0}
}
func (m *Channel) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Channel.Unmarshal(m, b)
}
func (m *Channel) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Channel.Marshal(b, m, deterministic)
}
func (dst *Channel) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Channel.Merge(dst, src)
}
func (m *Channel) XXX_Size() int {
	return xxx_messageInfo_Channel.Size(m)
}
func (m *Channel) XXX_DiscardUnknown() {
	xxx_messageInfo_Channel.DiscardUnknown(m)
}

var xxx_messageInfo_Channel proto.InternalMessageInfo

func (m *Channel) GetMeta() *ChannelMeta {
	if m != nil {
		return m.Meta
	}
	return nil
}

func (m *Channel) GetContent() *ChannelContent {
	if m != nil {
		return m.Content
	}
	return nil
}

type ChannelMeta struct {
	Name                 string               `protobuf:"bytes,1,opt,name=name" json:"name,omitempty"`
	LastEvent            *EventMeta           `protobuf:"bytes,2,opt,name=last_event,json=lastEvent" json:"last_event,omitempty"`
	AuthorIds            []string             `protobuf:"bytes,3,rep,name=author_ids,json=authorIds" json:"author_ids,omitempty"`
	CreatedAt            *timestamp.Timestamp `protobuf:"bytes,4,opt,name=created_at,json=createdAt" json:"created_at,omitempty"`
	ArchivedAt           *timestamp.Timestamp `protobuf:"bytes,5,opt,name=archived_at,json=archivedAt" json:"archived_at,omitempty"`
	CreatedBy            string               `protobuf:"bytes,6,opt,name=created_by,json=createdBy" json:"created_by,omitempty"`
	ArchivedBy           string               `protobuf:"bytes,7,opt,name=archived_by,json=archivedBy" json:"archived_by,omitempty"`
	XXX_NoUnkeyedLiteral struct{}             `json:"-"`
	XXX_unrecognized     []byte               `json:"-"`
	XXX_sizecache        int32                `json:"-"`
}

func (m *ChannelMeta) Reset()         { *m = ChannelMeta{} }
func (m *ChannelMeta) String() string { return proto.CompactTextString(m) }
func (*ChannelMeta) ProtoMessage()    {}
func (*ChannelMeta) Descriptor() ([]byte, []int) {
	return fileDescriptor_channel_445761e2bff0f6fd, []int{1}
}
func (m *ChannelMeta) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ChannelMeta.Unmarshal(m, b)
}
func (m *ChannelMeta) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ChannelMeta.Marshal(b, m, deterministic)
}
func (dst *ChannelMeta) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ChannelMeta.Merge(dst, src)
}
func (m *ChannelMeta) XXX_Size() int {
	return xxx_messageInfo_ChannelMeta.Size(m)
}
func (m *ChannelMeta) XXX_DiscardUnknown() {
	xxx_messageInfo_ChannelMeta.DiscardUnknown(m)
}

var xxx_messageInfo_ChannelMeta proto.InternalMessageInfo

func (m *ChannelMeta) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *ChannelMeta) GetLastEvent() *EventMeta {
	if m != nil {
		return m.LastEvent
	}
	return nil
}

func (m *ChannelMeta) GetAuthorIds() []string {
	if m != nil {
		return m.AuthorIds
	}
	return nil
}

func (m *ChannelMeta) GetCreatedAt() *timestamp.Timestamp {
	if m != nil {
		return m.CreatedAt
	}
	return nil
}

func (m *ChannelMeta) GetArchivedAt() *timestamp.Timestamp {
	if m != nil {
		return m.ArchivedAt
	}
	return nil
}

func (m *ChannelMeta) GetCreatedBy() string {
	if m != nil {
		return m.CreatedBy
	}
	return ""
}

func (m *ChannelMeta) GetArchivedBy() string {
	if m != nil {
		return m.ArchivedBy
	}
	return ""
}

type ChannelContent struct {
	Entries              []*Entry `protobuf:"bytes,1,rep,name=entries" json:"entries,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *ChannelContent) Reset()         { *m = ChannelContent{} }
func (m *ChannelContent) String() string { return proto.CompactTextString(m) }
func (*ChannelContent) ProtoMessage()    {}
func (*ChannelContent) Descriptor() ([]byte, []int) {
	return fileDescriptor_channel_445761e2bff0f6fd, []int{2}
}
func (m *ChannelContent) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ChannelContent.Unmarshal(m, b)
}
func (m *ChannelContent) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ChannelContent.Marshal(b, m, deterministic)
}
func (dst *ChannelContent) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ChannelContent.Merge(dst, src)
}
func (m *ChannelContent) XXX_Size() int {
	return xxx_messageInfo_ChannelContent.Size(m)
}
func (m *ChannelContent) XXX_DiscardUnknown() {
	xxx_messageInfo_ChannelContent.DiscardUnknown(m)
}

var xxx_messageInfo_ChannelContent proto.InternalMessageInfo

func (m *ChannelContent) GetEntries() []*Entry {
	if m != nil {
		return m.Entries
	}
	return nil
}

func init() {
	proto.RegisterType((*Channel)(nil), "iyag.io.chat.Channel")
	proto.RegisterType((*ChannelMeta)(nil), "iyag.io.chat.ChannelMeta")
	proto.RegisterType((*ChannelContent)(nil), "iyag.io.chat.ChannelContent")
}

func init() { proto.RegisterFile("iyag.io/chat/channel.proto", fileDescriptor_channel_445761e2bff0f6fd) }

var fileDescriptor_channel_445761e2bff0f6fd = []byte{
	// 344 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x84, 0x91, 0x41, 0x6b, 0xea, 0x40,
	0x14, 0x85, 0x51, 0xf3, 0x0c, 0xb9, 0x79, 0xbc, 0xc5, 0xbc, 0xc5, 0x9b, 0x17, 0x5a, 0x14, 0x57,
	0x6e, 0x1c, 0xc1, 0x82, 0x50, 0xba, 0x28, 0x2a, 0x5d, 0x74, 0xd1, 0x4d, 0xe8, 0xaa, 0x1b, 0x99,
	0xc4, 0xa9, 0x06, 0xcc, 0x8c, 0x24, 0x57, 0x21, 0xff, 0xaa, 0x3f, 0xb1, 0xcc, 0x9d, 0x4c, 0xd1,
	0x22, 0x74, 0x23, 0x66, 0xce, 0x77, 0xce, 0xbd, 0x73, 0x06, 0x92, 0xa2, 0x91, 0x5b, 0x51, 0x98,
	0x69, 0xbe, 0x93, 0x68, 0x7f, 0xb4, 0x56, 0x7b, 0x71, 0xa8, 0x0c, 0x1a, 0xf6, 0xbb, 0xd5, 0x84,
	0xd5, 0x92, 0xc1, 0xd6, 0x98, 0xed, 0x5e, 0x4d, 0x49, 0xcb, 0x8e, 0xef, 0x53, 0x2c, 0x4a, 0x55,
	0xa3, 0x2c, 0x0f, 0x0e, 0x4f, 0xf8, 0x45, 0x94, 0x3a, 0x29, 0x8d, 0xd7, 0x15, 0x8d, 0x55, 0xe3,
	0x94, 0xd1, 0x01, 0xc2, 0x95, 0x9b, 0xc9, 0x26, 0x10, 0x94, 0x0a, 0x25, 0xef, 0x0c, 0x3b, 0xe3,
	0x78, 0xf6, 0x5f, 0x9c, 0x0f, 0x17, 0x2d, 0xf4, 0xa2, 0x50, 0xa6, 0x84, 0xb1, 0x39, 0x84, 0xb9,
	0xd1, 0xa8, 0x34, 0xf2, 0x2e, 0x39, 0x6e, 0xae, 0x3a, 0x56, 0x8e, 0x49, 0x3d, 0x3c, 0xfa, 0xe8,
	0x42, 0x7c, 0x96, 0xc6, 0x18, 0x04, 0x5a, 0x96, 0x8a, 0xc6, 0x46, 0x29, 0xfd, 0x67, 0x73, 0x80,
	0xbd, 0xac, 0x71, 0x4d, 0x77, 0x68, 0xe3, 0xff, 0x5d, 0xc6, 0x3f, 0x59, 0x89, 0xd6, 0x89, 0x2c,
	0x4a, 0x9f, 0xec, 0x16, 0x40, 0x1e, 0x71, 0x67, 0xaa, 0x75, 0xb1, 0xa9, 0x79, 0x6f, 0xd8, 0x1b,
	0x47, 0x69, 0xe4, 0x4e, 0x9e, 0x37, 0x35, 0xbb, 0x07, 0xc8, 0x2b, 0x25, 0x51, 0x6d, 0xd6, 0x12,
	0x79, 0x40, 0xb1, 0x89, 0x70, 0xb5, 0x0a, 0x5f, 0xab, 0x78, 0xf5, 0xb5, 0xa6, 0x51, 0x4b, 0x2f,
	0x90, 0x3d, 0x40, 0x2c, 0xab, 0x7c, 0x57, 0x9c, 0x9c, 0xf7, 0xd7, 0x8f, 0x5e, 0xf0, 0xf8, 0x82,
	0xd6, 0xf2, 0x73, 0xb3, 0x86, 0xf7, 0xe9, 0xa2, 0x3e, 0x7b, 0xd9, 0xb0, 0xc1, 0x59, 0x76, 0xd6,
	0xf0, 0x90, 0xf4, 0x2f, 0xff, 0xb2, 0x19, 0x3d, 0xc2, 0x9f, 0xcb, 0x36, 0xd9, 0x04, 0x42, 0xfb,
	0x8a, 0x85, 0xaa, 0x79, 0x67, 0xd8, 0x1b, 0xc7, 0xb3, 0xbf, 0xdf, 0xda, 0xb1, 0x4f, 0x9c, 0x7a,
	0x66, 0xd9, 0x7f, 0x0b, 0xec, 0x71, 0xd6, 0xa7, 0x45, 0xef, 0x3e, 0x03, 0x00, 0x00, 0xff, 0xff,
	0x31, 0x9b, 0x05, 0xe2, 0x75, 0x02, 0x00, 0x00,
}
