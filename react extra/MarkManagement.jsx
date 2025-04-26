import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MarkManagement = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [marks, setMarks] = useState([]);

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
        fetchMarks(student);
    };

    const fetchMarks = async (student) => {
        try {
            const response = await axios.get(`/api/students/${student.id}/marks`);
            setMarks(response.data);
        } catch (error) {
            console.error('Error fetching marks:', error);
        }
    };

    const handleMarkUpdate = async (studentId, subject, newMark) => {
        try {
            await axios.put(`/api/students/${studentId}/marks/${subject}`, { mark: newMark });
            fetchMarks(selectedStudent);
        } catch (error) {
            console.error('Error updating marks:', error);
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
            {selectedStudent && (
                <div>
                    <h3>Marks for {selectedStudent.name}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Mark</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marks.map((mark) => (
                                <tr key={mark.subject}>
                                    <td>{mark.subject}</td>
                                    <td>{mark.value}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={mark.value}
                                            onChange={(e) =>
                                                handleMarkUpdate(selectedStudent.id, mark.subject, e.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MarkManagement;