const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('offer', (data) => {
        io.to(data.to).emit('offer', data);
    });

    socket.on('answer', (data) => {
        io.to(data.to).emit('answer', data);
    });

    socket.on('candidate', (data) => {
        io.to(data.to).emit('candidate', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(process.env.PORT || 5000, () => {
    console.log('Signaling server is running on port 5000');
});
