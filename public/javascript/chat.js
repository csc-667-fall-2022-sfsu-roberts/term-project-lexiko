var socket = io();
var form = document.getElementById('form');
var input = document.getElementById('input');
var messages = document.getElementById('messages');
var endturn = document.getElementById('endturn');


function placedTile(x, y, tileLabel) {
    socket.emit('game event', {"name": "bob", "tile": tileLabel, "xcoord": x, "ycoord": y });
}

form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    //window.scrollTo(0, document.body.scrollHeight);
});

socket.on('game event', function(data) {
    var item = document.createElement('li');
    item.textContent = data;
    messages.appendChild(item);
    //window.scrollTo(0, document.body.scrollHeight);
});

endturn.addEventListener("click", function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('game event', {"name": "bob", "turn": input.value});
        input.value = '';
    }
});