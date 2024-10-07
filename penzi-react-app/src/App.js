import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const usersResult = await axios.get('http://localhost:5000/api/users');
      setUsers(usersResult.data);
      const messagesResult = await axios.get('http://localhost:5000/api/messages');
      setMessages(messagesResult.data);
    };
    fetchData();
  }, []);

  const addUser = async () => {
    const result = await axios.post('http://localhost:5000/api/users', { username: newUser });
    setUsers([...users, result.data]);
    setNewUser('');
  };

  const addMessage = async () => {
    const result = await axios.post('http://localhost:5000/api/messages', { content: newMessage, user_id: userId });
    setMessages([...messages, result.data]);
    setNewMessage('');
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newUser}
        onChange={e => setNewUser(e.target.value)}
        placeholder="New Username"
      />
      <button onClick={addUser}>Add User</button>

      <h1>Messages</h1>
      <ul>
        {messages.map(msg => (
          <li key={msg.id}>{msg.content} (User ID: {msg.user_id})</li>
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
        placeholder="New Message"
      />
      <select onChange={e => setUserId(e.target.value)} value={userId}>
        <option value="">Select User</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.username}</option>
        ))}
      </select>
      <button onClick={addMessage}>Add Message</button>
    </div>
  );
};

export default App;



