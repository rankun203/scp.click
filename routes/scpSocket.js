/**
 * Created on 10/28/15.
 * @author rankun203
 */

var redis = require('redis');
var logger = require('log4js').getLogger('routes/scpSocket');
var config = require('../config');

var REDIS_HOST = config.redis.host;
var REDIS_PORT = config.redis.port;
var REDIS_PUB_CONFIG = config.redis.pub;
var REDIS_SUB_CONFIG = config.redis.sub;

var REDIS_SESSION_MSG_CHANNEL = config.redis.sessionMsgChannel;

var sub = redis.createClient(REDIS_PORT, REDIS_HOST, REDIS_SUB_CONFIG);
var pub = redis.createClient(REDIS_PORT, REDIS_HOST, REDIS_PUB_CONFIG);

sub.subscribe(REDIS_SESSION_MSG_CHANNEL);

function SocketHub(app, io) {
  logger.debug('SocketIO established');

  sub.on('message', function (channel, msg) {
    logger.debug('message', channel, msg);

    if (channel.indexOf(REDIS_SESSION_MSG_CHANNEL) >= 0) {
      msg = JSON.parse(msg);
      var targetSocketChannel = channel + '.' + msg['channel'];
      // 聊天消息
      logger.debug(targetSocketChannel, msg);

      io.in(targetSocketChannel).emit('new message', msg);
    }
  });

  io.on('connection', function (socket) {
    logger.info('a user connected');

    socket.on('join session', function (data) {
      logger.debug('join session', data);
      var channel = REDIS_SESSION_MSG_CHANNEL + '.' + data.sessionId;

      socket.join(channel);
      io.in(channel).emit('user joined', data);
    });

    socket.on('disconnect', function () {
      console.log('user disconnected');
    });
  });
}

module.exports = SocketHub;