// package: iyag.io.chat.chatsrv
// file: iyag.io/chat/chatsrv/channel.proto

var iyag_io_chat_chatsrv_channel_pb = require("../../../iyag.io/chat/chatsrv/channel_pb");
var grpc = require("grpc-web-client").grpc;

var Channel = (function () {
  function Channel() {}
  Channel.serviceName = "iyag.io.chat.chatsrv.Channel";
  return Channel;
}());

Channel.Event = {
  methodName: "Event",
  service: Channel,
  requestStream: true,
  responseStream: true,
  requestType: iyag_io_chat_chatsrv_channel_pb.EventReq,
  responseType: iyag_io_chat_chatsrv_channel_pb.EventRes
};

exports.Channel = Channel;

function ChannelClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ChannelClient.prototype.event = function event(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(Channel.Event, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.end.forEach(function (handler) {
      handler();
    });
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.ChannelClient = ChannelClient;

