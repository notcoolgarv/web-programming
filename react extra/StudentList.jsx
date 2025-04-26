import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentCard from './StudentCard';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('/api/students');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        fetchStudents();
    }, []);

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search students"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
                {filteredStudents.map((student) => (
                    <StudentCard key={student.id} student={student} />
                ))}
            </div>
        </div>
    );
};

export default StudentList;