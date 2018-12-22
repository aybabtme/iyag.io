// package: iyag.io.chat.chatsrv
// file: iyag.io/chat/chatsrv/channel.proto

var iyag_io_chat_chatsrv_channel_pb = require("../../../iyag.io/chat/chatsrv/channel_pb");
var grpc = require("grpc-web-client").grpc;

var Channel = (function () {
  function Channel() {}
  Channel.serviceName = "iyag.io.chat.chatsrv.Channel";
  return Channel;
}());

Channel.Listen = {
  methodName: "Listen",
  service: Channel,
  requestStream: false,
  responseStream: true,
  requestType: iyag_io_chat_chatsrv_channel_pb.ListenReq,
  responseType: iyag_io_chat_chatsrv_channel_pb.ListenRes
};

Channel.Post = {
  methodName: "Post",
  service: Channel,
  requestStream: false,
  responseStream: false,
  requestType: iyag_io_chat_chatsrv_channel_pb.PostReq,
  responseType: iyag_io_chat_chatsrv_channel_pb.PostRes
};

Channel.Archive = {
  methodName: "Archive",
  service: Channel,
  requestStream: false,
  responseStream: false,
  requestType: iyag_io_chat_chatsrv_channel_pb.ArchiveReq,
  responseType: iyag_io_chat_chatsrv_channel_pb.ArchiveRes
};

exports.Channel = Channel;

function ChannelClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ChannelClient.prototype.listen = function listen(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Channel.Listen, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.end.forEach(function (handler) {
        handler();
      });
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

ChannelClient.prototype.post = function post(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Channel.Post, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChannelClient.prototype.archive = function archive(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Channel.Archive, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.ChannelClient = ChannelClient;

