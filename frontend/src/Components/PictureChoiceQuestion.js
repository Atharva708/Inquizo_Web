// src/components/PictureChoiceQuestion.js
import React, { useState } from 'react';
import './PictureChoiceQuestion.css';

const PictureChoiceQuestion = ({ question, questionIndex, onRemove, onQuestionTextChange }) => {
  const [imageOptions, setImageOptions] = useState([
    { id: 1, url: 'https://via.placeholder.com/100x100?text=Image+1' },
    { id: 2, url: 'https://via.placeholder.com/100x100?text=Image+2' },
  ]);
  const [nextId, setNextId] = useState(3);

  const addImageOption = () => {
    setImageOptions([...imageOptions, { id: nextId, url: `https://via.placeholder.com/100x100?text=Image+${nextId}` }]);
    setNextId(nextId + 1);
  };

  const removeImageOption = (idToRemove) => {
    setImageOptions(imageOptions.filter(option => option.id !== idToRemove));
  };

  return (
    <div className="question-block picture-choice-question-block">
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

      <div className="image-options-grid">
        {imageOptions.map((option) => (
          <div key={option.id} className="image-option-card">
            <img src={option.url} alt={`Option ${option.id}`} className="image-option-thumbnail" />
            <div className="image-option-controls">
              <input type="text" placeholder="Label" className="image-label-input" />
              <button className="remove-image-button" onClick={() => removeImageOption(option.id)}>✕</button>
            </div>
          </div>
        ))}
        <div className="add-image-option-card" onClick={addImageOption}>
          <span>+ Add Image</span>
        </div>
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

export default PictureChoiceQuestion;