// src/components/ShortTextQuestion.js
import React from 'react';
import './ShortTextQuestion.css';

const ShortTextQuestion = ({ question, questionIndex, onRemove, onQuestionTextChange }) => {
  return (
    <div className="question-block short-text-question-block">
      <div className="question-header">
        <span className="question-number">Question {questionIndex}</span>
        <button className="remove-question-button" onClick={onRemove}>✕</button>
      </div>
      <input
        type="text"
        placeholder="Type your question here..."
        className="question-input"
        value={question.name} // Display the question name from state
        onChange={(e) => onQuestionTextChange(question.id, e.target.value)} // Update state on change
      />
      <input
        type="text"
        placeholder="Short text answer will appear here..."
        className="short-text-input"
        readOnly
      />
      <div className="question-footer">
        <span className="required-label">Required</span>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default ShortTextQuestion;