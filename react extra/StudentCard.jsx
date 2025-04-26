import React from 'react';

const StudentCard = ({ student }) => {
    return (
        <div>
            <h3>{student.name}</h3>
            <p>Student ID: {student.id}</p>
            <p>Grade: {student.grade}</p>
            <p>GPA: {student.gpa}</p>
        </div>
    );
};

export default StudentCard;