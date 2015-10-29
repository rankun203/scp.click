/**
 * Created on 10/28/15.
 * @author rankun203
 */

(function () {
  window.socket = io();
  var msgBox = $('#msgBox');

  socket.on('new message', function (msg) {
    var msgText = msg && msg.text;

    var newText = msgBox.text() + msgText + '\n';
    msgBox.text(newText);
    console.log('message: ', msg);
  });

  // join session
  socket.emit('join session', {
    sessionId: scpSessionId
  });

})();