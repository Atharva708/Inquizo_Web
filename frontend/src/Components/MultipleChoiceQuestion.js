// src/components/MultipleChoiceQuestion.js
import React, { useState } from 'react';
import './MultipleChoiceQuestion.css';

const MultipleChoiceQuestion = ({ question, questionIndex, onRemove, onQuestionTextChange }) => {
  const [options, setOptions] = useState(['Option 1', 'Option 2']); // Keep options state local for now

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const removeOption = (indexToRemove) => {
    setOptions(options.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="question-block multiple-choice-question-block">
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

      <div className="options-container">
        {options.map((option, index) => (
          <div key={index} className="option-item">
            <input type="radio" disabled className="option-radio" />
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="option-input-field"
            />
            {options.length > 1 && (
              <button className="remove-option-button" onClick={() => removeOption(index)}>✕</button>
            )}
          </div>
        ))}
        <button className="add-option-button" onClick={addOption}>+ Add option</button>
        <button className="add-other-option">Add "Other" option</button>
      </div>

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

export default MultipleChoiceQuestion;