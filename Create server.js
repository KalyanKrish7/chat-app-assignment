// npm init -y
// npm install express socket.io mongoose



const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set up MongoDB connection (replace with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/chatApp', { useNewUrlParser: true, useUnifiedTopology: true });

// Define mongoose models and schemas for User and Message

// ...

// WebSocket logic
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle user authentication and join chat room

    // Listen for incoming messages and broadcast to all connected clients
    socket.on('message', (message) => {
        // Save message to the database

        // Broadcast the message to all connected clients
        io.emit('message', message);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
