var socket = io();
socket.on("message", function (data) {
  console.log(data);
});

var movement = {
  x: 0,
  y: 0,
};
window.onmousemove = function (event) {
  event = event || window.event; // кроссбраузерность
  movement.x = event.offsetX;
  movement.y = event.offsetY;
};

socket.emit("new player");
setInterval(function () {
  socket.emit("movement", movement);
}, 1000 / 60);

socket.on("state", function (players) {
  for (var id in players) {
    var player = players[id];
    let element = document.querySelector(`#${id}`);
    if (element) {
      element.offsetX = player.x;
      element.offsetY = player.y;
    } else {
      element = document.createElement("div", [options]);
      element.style = {
        background: "red",
        position: "absolute",
        width: "50px",
        height: "50px",
      };
      element.offsetX = player.x;
      element.offsetY = player.y;
      let body = document.querySelector('body');
      insertBefore(element, body)
    }
    context.drawImage(img, player.x, player.y, 60, 60);
  }
});
