import React from 'react';

const JustTest2 = ({ testData }) => {
    return (
        <div>
            {Array.isArray(testData) && testData.map((data, index) => (
                <h1 key={index}>{data.category}</h1>
            ))}
        </div>
    );
};

export default JustTest2;
