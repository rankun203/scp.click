/**
 * Created on 10/28/15.
 * @author rankun203
 */

var config = {
  sitePath: 'http://scp.click',
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