import React, { useState } from 'react';
import axios from 'axios';

const RegisterDetails = ({ userId }) => {
    const [details, setDetails] = useState({
        level_of_education: '',
        profession: '',
        marital_status: '',
        religion: '',
        ethnicity: ''
    });

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/RegisterDetails', { user_id: userId, ...details });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="level_of_education" placeholder="Level of Education" onChange={handleChange} />
            <input name="profession" placeholder="Profession" onChange={handleChange} />
            <input name="marital_status" placeholder="Marital Status" onChange={handleChange} />
            <input name="religion" placeholder="Religion" onChange={handleChange} />
            <input name="ethnicity" placeholder="Ethnicity" onChange={handleChange} />
            <button type="submit">Submit Details</button>
        </form>
    );
};

export default RegisterDetails;
