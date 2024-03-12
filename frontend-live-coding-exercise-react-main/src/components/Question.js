import React from 'react';

const Question = ({ question, onAnswer }) => {
  return (
    <div className="question">
      <h4>{question}</h4>
      <button onClick={() => onAnswer('yes')}>Yes</button>
      <button onClick={() => onAnswer('no')}>No</button>
    </div>
  );
};

export default Question;
