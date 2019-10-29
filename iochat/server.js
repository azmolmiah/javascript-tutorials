let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);
users = [];
connections = [];

server.listen(process.env.port || 3000);
console.log('Server running');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', socket => {
  connections.push(socket);

  console.log('Connected: %s sockets connected', connections.length);

  //   Disconnect
  socket.on('disconnect', () => {
    users.splice(users.indexOf(socket.username), 1);

    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);
  });

  // if current socket
  socket.on('current socket', data => {
    console.log(data.audio);
  });

  // Send message

  // socket.on('Send audioStream', data => {
  //   io.sockets.emit('new audio', { audio: data });
  // });

  // //Retreive new user request and push to users array
  // socket.on('new user', (data, callback) => {
  //   console.log(data);
  //   users.push(socket.username);
  //   updateUserNames();
  // });

  // const updateUserNames = () => {
  //   io.sockets.emit('get users', users);
  // };
});
