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
    console.log(socket.id)
    if (id !== socket.id)
      if (element) {
        element.style.left = player.x + "px";
        element.style.top = player.y + "px";
      } else {
        element = document.createElement("div");
        element.id = `${id}`;
        element.style = {
          background: "red",
          position: "absolute",
          width: "50px",
          height: "50px",
        };
        element.style.left = player.x + "px";
        element.style.top = player.y + "px";
        let body = document.querySelector("body");
        body.insertBefore(element, null);
      }
  }
});
