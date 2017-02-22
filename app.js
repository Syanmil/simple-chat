var http = require('http')
var fs = require('fs')
var index = fs.readFileSync(__dirname + '/index.html');
var express = require('express')
var route = express()

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

route.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

// Emit welcome message on connection
io.on('connection', function(socket) {
    socket.on('chating', function(chat){
        io.emit('chating', chat)
    });
    socket.on('disconnect', function(chat){
      console.log('disconnected');
    });
});

app.listen(3000);
