const socket = io('http://localhost:5000');

socket.on('get_point_records', function (data) {
  console.log(data);
});
socket.emit('room');
