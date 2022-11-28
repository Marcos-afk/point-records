const socket = io('http://localhost:5000');

const array = [];
socket.on('created_point', data => {
  array.push(data);
  console.log(array);
});
