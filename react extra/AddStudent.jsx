import React, { useState } from 'react';
import axios from 'axios';

const AddStudent = ({ onStudentAdded }) => {
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [gpa, setGpa] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/students', { name, grade, gpa });
            onStudentAdded(response.data);
            setName('');
            setGrade('');
            setGpa('');
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
            />
            <input
                type="text"
                placeholder="GPA"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
            />
            <button type="submit">Add Student</button>
        </form>
    );
};

export default AddStudent;