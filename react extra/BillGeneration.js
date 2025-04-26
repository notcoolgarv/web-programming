import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BillGeneration = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [bill, setBill] = useState(null);

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

    const handleStudentSelect = (student) => {
        setSelectedStudent(student);
        generateBill(student);
    };

    const generateBill = async (student) => {
        try {
            const response = await axios.get(`/api/students/${student.id}/bill`);
            setBill(response.data);
        } catch (error) {
            console.error('Error generating bill:', error);
        }
    };

    return (
        <div>
            <select
                value={selectedStudent?.id || ''}
                onChange={(e) =>
                    handleStudentSelect(students.find((s) => s.id === e.target.value))
                }
            >
                <option value="">Select a student</option>
                {students.map((student) => (
                    <option key={student.id} value={student.id}>
                        {student.name}
                    </option>
                ))}
            </select>
            {bill && (
                <div>
                    <h3>Student Fee Bill</h3>
                    <p>Tuition: {bill.tuition}</p>
                    <p>Fees: {bill.fees}</p>
                    <p>Total: {bill.total}</p>
                </div>
            )}
        </div>
    );
};

export default BillGeneration;