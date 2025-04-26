import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeePayment = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState(0);

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
        setPaymentAmount(student.outstandingFee);
    };

    const handlePayment = async () => {
        try {
            await axios.post(`/api/students/${selectedStudent.id}/pay`, {
                amount: paymentAmount,
            });
            setSelectedStudent(null);
            setPaymentAmount(0);
        } catch (error) {
            console.error('Error making payment:', error);
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
                    <p>Outstanding Fee: {selectedStudent.outstandingFee}</p>
                    <input
                        type="number"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                    <button onClick={handlePayment}>Pay</button>
                </div>
            )}
        </div>
    );
};

export default FeePayment;