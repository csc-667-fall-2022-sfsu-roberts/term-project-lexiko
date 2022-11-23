var express = require('express');
var router = express.Router();

/* GET home page. */ 
router.get('/', function(req, res, next) {
  res.render('sockettest', { title: 'SocketTest' });
});



//intializeSocket();

// Socket stuff
/*
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
*/


module.exports = router;