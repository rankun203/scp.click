var express = require('express');
var qr = require('qr-image');
var config = require('../config');
var logger = require('log4js').getLogger('routes/index');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var sessionId = getDigitalNumber(config.sessionLength);
  var indexProp = {
    title: 'scp.click',
    channelId: config.redis.sessionMsgChannel + '.' + sessionId,
    sessionId: sessionId,
    sessionUrl: config.sitePath + '/' + sessionId,
    qrUrl: config.sitePath + '/qr?sessionId=' + sessionId
  };

  logger.debug('indexProp: \n', indexProp);
  res.render('index', indexProp);
});

router.route('/qr')
    .get(function (req, res, next) {
      var sessionId = req.query.sessionId;

      var qrText = config.sitePath + '/s/' + sessionId;

      logger.debug(qrText);

      var code = qr.image(
          qrText,
          {type: 'png'}
      );

      res.type('image/png');
      code.pipe(res);
    });

// Cache multiplier & numLeft
function getDigitalNumber(length) {
  var multiplier = 1;
  for (var i = 1; i < length; i++) {
    multiplier *= 10;
  }
  var leftNumber = 9 * multiplier;

  var random = (Math.random() * leftNumber + multiplier).toFixed();
  logger.debug('getDigitalNumber: ', random);
  return random;
}

module.exports = router;
