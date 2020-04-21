const express = require("express");
const app = express();
const path = require('path');
const server = require("http").Server(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listen on *: ${PORT}`));

app.use(express.static(path.resolve(__dirname, '../client/build')));

let userCount = 0;

io.on("connection", socket => {
  userCount++;
  const { id } = socket.client;
  console.log(`User connected: ${id}`);

  //emits counter to webpage
  io.emit('state change', userCount);
  //logs number of people on the page
  console.log('number of people connected = ' + userCount);
  
  socket.on('disconnect', function(){
    //logs user ID at disconnect
    console.log('user disconnected ' + socket.id);
    //decrements user counter
    userCount--;
    //emits counter to webpage
    io.emit('state change', userCount);
    //logs number of people on the page
    console.log('number of people connected = ' + userCount);
  });
});