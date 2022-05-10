var socket = io();
socket.on('message', function(data) {
    console.log(data);
});

var movement = {
  up: false,
  down: false,
  left: false,
  right: false,
  isZombie: false
}
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});

socket.emit('new player');
setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);

// Создаем объект изображения
var imgZombie = new Image();
var imgMan = new Image();

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
imgZombie.src = "./static/zombie.png";
imgMan.src = "./static/man.png";
imgMan.onload = function() {
	context.drawImage(imgMan, 10, 10, 60, 60);
};
socket.on('state', function(players) {
  context.clearRect(0, 0, 800, 600);
  for (var id in players) {
    var player = players[id];
    let img;
    if(player.isZombie) img = imgZombie;
    else img = imgMan;
    context.drawImage(img, player.x, player.y, 60, 60);
  }
});