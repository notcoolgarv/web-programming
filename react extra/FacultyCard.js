import React from 'react';

const FacultyCard = ({ member }) => {
    return (
        <div>
            <h3>{member.name}</h3>
            <p>Faculty ID: {member.id}</p>
            <p>Department: {member.department}</p>
            <p>Position: {member.position}</p>
        </div>
    );
};

export default FacultyCard;