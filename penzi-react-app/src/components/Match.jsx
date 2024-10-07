import React, { useState } from 'react';
import axios from 'axios';

const Match = ({ userId }) => {
    const [matchCriteria, setMatchCriteria] = useState({
        age_range: '',
        town: ''
    });

    const handleChange = (e) => {
        setMatchCriteria({ ...matchCriteria, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/Match', { user_id: userId, ...matchCriteria });
            alert(`Matches: ${response.data.matches.join(', ')}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="age_range" placeholder="Age Range (e.g. 26-30)" onChange={handleChange} />
            <input name="town" placeholder="Town" onChange={handleChange} />
            <button type="submit">Find Matches</button>
        </form>
    );
};

export default Match;