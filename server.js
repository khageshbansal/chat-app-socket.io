const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
username=[];
var counter=1;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/main/chat app node js.html');
});

app.use(express.static(path.join(__dirname, 'main')));

io.on('connection', (socket) => {


    socket.on('disconnect', () => {
      console.log('user disconnected');
      counter--;
      io.sockets.emit('disconnection',{online:counter,name:username[socket.id]});
    });

    socket.on("new-user-joined",name=>{
      username[socket.id]=name;
      counter++;
      io.sockets.emit('user-name',{online:counter,name:name});
      
    });

    socket.on("send",data=>{
      socket.broadcast.emit('msg-data',{msg:data,name:username[socket.id]});
    });


});

http.listen(3000, () => {
  console.log('listening on *:3000');
});