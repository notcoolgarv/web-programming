import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FacultyCard from './FacultyCard';

const FacultyList = () => {
    const [faculty, setFaculty] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await axios.get('/api/faculty');
                setFaculty(response.data);
            } catch (error) {
                console.error('Error fetching faculty:', error);
            }
        };
        fetchFaculty();
    }, []);

    const filteredFaculty = faculty.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search faculty"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
                {filteredFaculty.map((member) => (
                    <FacultyCard key={member.id} member={member} />
                ))}
            </div>
        </div>
    );
};

export default FacultyList;