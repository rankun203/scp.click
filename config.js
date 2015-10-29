/**
 * Created on 10/28/15.
 * @author rankun203
 */

var config = {
  sitePath: 'http://192.168.199.234:3000',
  sessionLength: 10,
  redis: {
    host: '127.0.0.1',
    port: 6379,
    sessionMsgChannel: 'session.message',
    pub: {},
    sub: {}
  }
};

module.exports = config;