'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});
io.on('connection', (client) =>{
    console.log('connection from android');  
  
    client.on('dokumenBaruAndroid', (data) =>{
      client.emit('dokumenBaru', "dokumen baru tersedia");
    });
  
      client.on('admin1ApproveAndroid', (data) =>{
      client.emit('admin1Approve', "admin1 telah approve dokumen");
    });
  
    client.on('hasilApproveAndroid', (data) =>{
      client.emit('hasilApprove', data);
    });
  
  });


setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
