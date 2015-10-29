/**
 * Created on 10/28/15.
 * @author rankun203
 */

var express = require('express');
var redis = require('redis');
var logger = require('log4js').getLogger('routes/scpSession');
var config = require('../config');

var router = express.Router();

var REDIS_HOST = config.redis.host;
var REDIS_PORT = config.redis.port;
var REDIS_PUB_CONFIG = config.redis.pub;

var REDIS_SESSION_MSG_CHANNEL = config.redis.sessionMsgChannel;

var pub = redis.createClient(REDIS_PORT, REDIS_HOST, REDIS_PUB_CONFIG);

router.route('/:id')
    .get(function (req, res, next) {
      res.render('client', {
        sitePath: config.sitePath,
        sessionId: req.params.id
      });
    });

router.route('/:id/msg')
    .post(function (req, res, next) {
      var msg = {
        channel: req.params.id,
        text: req.body.text
      };

      pub.publish(REDIS_SESSION_MSG_CHANNEL, JSON.stringify(msg), function (err, count) {
        if (err) return logger.warn(err);

        logger.debug(REDIS_SESSION_MSG_CHANNEL, JSON.stringify(msg), 'sent ', count);
      });

      return res.json({
        status: 'success'
      });
    });

module.exports = router;