/**
 * Created on 8/2/15.
 * @author rankun203
 */

var redis = require('redis');
var config = require('../config');
var log = require('log4js').getLogger('middlewares/redis');

var REDIS_HOST = config.redis.host;
var REDIS_PORT = config.redis.port;

// Redis
var redisClient = redis.createClient(REDIS_PORT, REDIS_HOST);
redisClient.on('connect', function () {
  log.debug('Redis connected');
});

module.exports = exports = redisClient;
