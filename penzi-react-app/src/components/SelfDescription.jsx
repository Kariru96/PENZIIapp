import React, { useState } from 'react';
import axios from 'axios';

const SelfDescription = ({ userId }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/SelfDescription', { user_id: userId, description });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Describe yourself"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Submit Description</button>
        </form>
    );
};

export default SelfDescription;
