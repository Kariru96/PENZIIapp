import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        county: '',
        town: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/Register', formData);
            alert(response.data.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="age" placeholder="Age" onChange={handleChange} />
            <input name="gender" placeholder="Gender" onChange={handleChange} />
            <input name="county" placeholder="County" onChange={handleChange} />
            <input name="town" placeholder="Town" onChange={handleChange} />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
