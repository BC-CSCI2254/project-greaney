//https://socket.io/get-started/chat/
//edited by Alec Greaney and Marielle Melconian, March 2017
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
//v below was initially io
var io = require('socket.io')(http);
var client  = require('socket.io-client');

var users = [];
app.get('/', function(req, res){
//res.send('<h1>Hello world</h1>'); //this adds a line by line html
  res.sendFile(__dirname + '/home.html'); //this adds a full file
});

var roomNum = 1;

io.on('connection', function(socket){
  console.log("a client connected");

  socket.on('setUsername', function(data){
    console.log("data = " + data);
    users.push(data);
    socket.emit('userSet', {username: data});
  })

  socket.on("join", function(nickname){
    roomID = null;
    users[client.id] = nickname;
    socket.emit("update", "you have connected to the server.");
    io.sockets.emit("update", nickname + " has joined the server.")
    io.sockets.emit("update-people", people);
    console.log("someone has joined the server!");
  });
  socket.on("send", function(msg){
    io.sockets.emit("chat", users[client.id], msg);
  });

  socket.on("disconnect", function(){
     io.sockets.emit("update", users[client.id] + " has left the server.");
     delete users[client.id];
     io.sockets.emit("update-people", users);
     console.log("a client disconnected");
   });

  socket.on('chat message', function(msg){
    //console.log('message: ' + msg);
    var msg1 = msg.message;

    if(msg1.substring(0,6) === "/name " && msg1.length > 6){
      msg1 = "A new user, " + msg.message.substring(6) + ", has been identified.";
    }
    if(msg.user.length > 0){
      io.emit('chat message', msg.user + ": " + msg1);
    }
    else if(msg1.length > 0){
      io.emit('chat message', msg1);
    }
    //console.log("message sent");
  });
  io.sockets.emit('hi', users);
});

http.listen(3000, function(){     //run node index.js and then open http://localhost:3000 in the browser
  console.log('listening on *:3000');
});

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));























