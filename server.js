'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const socketstream = require('socket.io-stream')
const volleyball = require('volleyball');
const chalk = require('chalk');
const session = require('express-session');
const fs = require('fs');
const wav = require('wav');

app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'orbital',
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + 'bundle.js'));
app.use(express.static(__dirname ));
app.use('/bootstrap/css/bootstrap.min.css', express.static(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css'));
app.use('/react.min.js', express.static(__dirname + '/node_modules/react/dist/react.min.js'));
app.use('/reactDom.min.js', express.static(__dirname + '/node_modules/react-dom/dist/react-dom.min.js'));

app.use(function (req, res) {
  res.sendFile(__dirname + 'index.html');
});

const server = app.listen(PORT, () => {
  console.log('Up and running on port', PORT);
});

const io = socketio(server);

// WEB SOCKETS
io.on('connection', (socket) => {
  
  socketstream(socket).on('send-buffer', (bufferStream) => {
    console.log(bufferStream);
  });

  socketstream(socket).on('end', () => {
    console.log('stream is over');
  });
});

