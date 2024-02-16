import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Replace with your server URL

function App() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        // Listen for incoming messages from the server
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Clean up the socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (inputMessage.trim() !== '') {
            // Send the message to the server
            socket.emit('message', { text: inputMessage, user: 'User' });

            // Clear the input field
            setInputMessage('');
        }
    };

    return (
        <div>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{`${message.user}: ${message.text}`}</div>
                ))}
            </div>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default App;
