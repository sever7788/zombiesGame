var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

app.set('port', process.env.PORT || 80);
app.use('/static', express.static(__dirname + '/static'));

// Маршруты
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
server.listen(process.env.PORT || 80, function() {
    console.log('Запускаю сервер на порте 5000');
});
// Обработчик веб-сокетов
io.on('connection', function(socket) {
});

var players = {};
io.on('connection', function(socket) {
  socket.on('new player', function() {
    players[socket.id] = {
      x: 0,
      y: 0,
    };
  });
  socket.on('movement', function(data) {
    var player = players[socket.id] || {};
      player.x = data.x;
      player.y = data.y;
  });
});
setInterval(function() {
  io.sockets.emit('state', players);
}, 1000 / 60);

const checkIntersection = (x1, y1, w1, h1, x2, y2, w2, h2) =>{
if((x1>x2&&x1<x2+w2)&&(y1>y2&&y1<y2+h2)||
  (x2>x1&&x2<x1+w1)&&(y2>y1&&y2<y1+h1)){
    return true;
  } else return false;
}