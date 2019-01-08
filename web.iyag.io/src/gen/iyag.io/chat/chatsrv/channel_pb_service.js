// package: iyag.io.chat.chatsrv
// file: iyag.io/chat/chatsrv/channel.proto

var iyag_io_chat_chatsrv_channel_pb = require("../../../iyag.io/chat/chatsrv/channel_pb");
var grpc = require("grpc-web-client").grpc;

var Channel = (function () {
  function Channel() {}
  Channel.serviceName = "iyag.io.chat.chatsrv.Channel";
  return Channel;
}());

Channel.EventCreate = {
  methodName: "EventCreate",
  service: Channel,
  requestStream: false,
  responseStream: false,
  requestType: iyag_io_chat_chatsrv_channel_pb.EventCreateReq,
  responseType: iyag_io_chat_chatsrv_channel_pb.EventCreateRes
};

Channel.EventArchive = {
  methodName: "EventArchive",
  service: Channel,
  requestStream: false,
  responseStream: false,
  requestType: iyag_io_chat_chatsrv_channel_pb.EventArchiveReq,
  responseType: iyag_io_chat_chatsrv_channel_pb.EventArchiveRes
};

Channel.EventJoin = {
  methodName: "EventJoin",
  service: Channel,
  requestStream: false,
  responseStream: false,
  requestType: iyag_io_chat_chatsrv_channel_pb.EventJoinReq,
  responseType: iyag_io_chat_chatsrv_channel_pb.EventJoinRes
};

Channel.EventLeave = {
  methodName: "EventLeave",
  service: Channel,
  requestStream: false,
  responseStream: false,
  requestType: iyag_io_chat_chatsrv_channel_pb.EventLeaveReq,
  responseType: iyag_io_chat_chatsrv_channel_pb.EventLeaveRes
};

Channel.EventType = {
  methodName: "EventType",
  service: Channel,
  requestStream: false,
  responseStream: false,
  requestType: iyag_io_chat_chatsrv_channel_pb.EventTypeReq,
  responseType: iyag_io_chat_chatsrv_channel_pb.EventTypeRes
};

Channel.GetState = {
  methodName: "GetState",
  service: Channel,
  requestStream: false,
  responseStream: false,
  requestType: iyag_io_chat_chatsrv_channel_pb.GetStateReq,
  responseType: iyag_io_chat_chatsrv_channel_pb.GetStateRes
};

Channel.ListenUserEvent = {
  methodName: "ListenUserEvent",
  service: Channel,
  requestStream: false,
  responseStream: true,
  requestType: iyag_io_chat_chatsrv_channel_pb.ListenUserEventReq,
  responseType: iyag_io_chat_chatsrv_channel_pb.ListenUserEventRes
};

exports.Channel = Channel;

function ChannelClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ChannelClient.prototype.eventCreate = function eventCreate(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Channel.EventCreate, {
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

ChannelClient.prototype.eventArchive = function eventArchive(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Channel.EventArchive, {
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

ChannelClient.prototype.eventJoin = function eventJoin(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Channel.EventJoin, {
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

ChannelClient.prototype.eventLeave = function eventLeave(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Channel.EventLeave, {
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

ChannelClient.prototype.eventType = function eventType(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Channel.EventType, {
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

ChannelClient.prototype.getState = function getState(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Channel.GetState, {
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

ChannelClient.prototype.listenUserEvent = function listenUserEvent(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Channel.ListenUserEvent, {
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

exports.ChannelClient = ChannelClient;

