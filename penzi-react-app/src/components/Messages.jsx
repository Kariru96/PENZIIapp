import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Messages = ({ userId }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/Messages/${userId}`);
                setMessages(response.data.messages);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMessages();
    }, [userId]);

    return (
        <div>
            <h2>Your Messages</h2>
            {messages.map(msg => (
                <div key={msg.id}>
                    <p>{msg.message} (From: {msg.from}, To: {msg.to})</p>
                </div>
            ))}
        </div>
    );
};

export default Messages;