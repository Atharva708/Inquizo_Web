// src/Forms.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Forms.css';
import LongTextQuestion from './Components/LongTextQuestion';
import ShortTextQuestion from './Components/ShortTextQuestion';
import MultipleChoiceQuestion from './Components/MultipleChoiceQuestion';
import PictureChoiceQuestion from './Components/PictureChoiceQuestion';

const Forms = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  // Load questions from localStorage on component mount
  useEffect(() => {
    const savedQuestions = localStorage.getItem('formQuestions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  // Function to save questions to localStorage
  const saveQuestions = () => {
    localStorage.setItem('formQuestions', JSON.stringify(questions));
    alert('Form saved successfully!');
  };

  const questionTypes = [
    { name: 'Short text', icon: '📄', type: 'short-text' },
    { name: 'Long text', icon: '✍️', type: 'long-text' },
    { name: 'Multiple choice', icon: '●', type: 'multiple-choice' },
    { name: 'Picture choice', icon: '🖼️', type: 'picture-choice' },
    { name: 'Dropdown', icon: 'A', type: 'dropdown' },
    { name: 'Number', icon: '🔢', type: 'number' },
    { name: 'Linear scale', icon: '📏', type: 'linear-scale' },
    { name: 'Opinion scale', icon: '⭐', type: 'opinion-scale' },
    { name: 'Rating', icon: '📊', type: 'rating' },
    { name: 'Ranking', icon: '🏆', type: 'ranking' },
    { name: 'Yes/No', icon: '✅', type: 'yes-no' },
    { name: 'Email', icon: '📧', type: 'email' },
    { name: 'URL', icon: '🔗', type: 'url' },
    { name: 'Phone number', icon: '📞', type: 'phone-number' },
    { name: 'Date', icon: '📅', type: 'date' },
    { name: 'Time', icon: '⏰', type: 'time' },
    { name: 'File upload', icon: '📁', type: 'file-upload' },
    { name: 'Payment', icon: '💰', type: 'payment' },
    { name: 'Section', icon: '🔳', type: 'section' },
    { name: 'Page break', icon: '📄', type: 'page-break' },
    { name: 'Thank you screen', icon: '🎉', type: 'thank-you' },
    { name: 'Hidden field', icon: ' stealth', type: 'hidden-field' },
  ];

  const addQuestion = (type) => {
    setQuestions([...questions, { id: Date.now(), type: type, name: '' }]);
  };

  const removeQuestion = (idToRemove) => {
    setQuestions(questions.filter(question => question.id !== idToRemove));
  };

  const handleQuestionTextChange = (id, newText) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q => (q.id === id ? { ...q, name: newText } : q))
    );
  };
// src/Forms.js

// ... (other imports and code)

// src/Forms.js

// ... (other imports and code)

const Forms = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate(); // useNavigate hook is already imported

  // ... (useEffect for loading questions and saveQuestions function)

  return (
    <div className="form-builder-page">
      <header className="form-builder-header">
        <div className="header-left">
          <span className="form-builder-breadcrumb">Form Builder</span>
          <h1 className="logo-text">Create New Form</h1>
        </div>
        <div className="header-right">
          <button className="save-button" onClick={saveQuestions}>
            Save Form
          </button>
          <button className="preview-button" onClick={() => navigate('/form-preview')}>
            Preview
          </button>
        </div>
      </header>
      {/* ... (rest of the Forms component) */}
    </div>
  );
};

  const handlePreviewClick = () => {
    saveQuestions();
    navigate('/form-preview');
  };

  const handleNewFormClick = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login status
    navigate('/'); // Redirect to login page
  };

  // New handler for the back button
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="form-builder-page">
      {/* Header */}
      <header className="form-builder-header">
        <div className="header-left">
          {/* Add Back to Dashboard button here */}
          <button className="back-to-dashboard-button" onClick={handleBackToDashboard}>
            ← Back to Dashboard
          </button>
          <span className="form-builder-breadcrumb">My Forms / Untitled Form</span>
          <h1 className="logo-text">Forms</h1>
        </div>
        <nav className="header-nav">
          <a href="#">Build</a>
          <a href="#">Integrate</a>
          <a href="#">Share</a>
          <a href="#">Results</a>
        </nav>
        <div className="header-right">
          <button className="save-button" onClick={saveQuestions}>
            Save Form
          </button>
          <button className="preview-button" onClick={handlePreviewClick}>
            Preview
          </button>
          <button className="new-form-button" onClick={handleNewFormClick}>
            + New Form
          </button>
          <img src="https://via.placeholder.com/35" alt="User Avatar" className="user-avatar-small" />
          <button className="logout-button" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </header>

      <div className="form-builder-content">
        {/* Sidebar */}
        <aside className="question-types-sidebar">
          <div className="sidebar-tabs">
            <button className="tab-button active">Standard</button>
            <button className="tab-button">Premium</button>
          </div>
          <ul className="question-list">
            {questionTypes.map((qType) => (
              <li key={qType.type} onClick={() => addQuestion(qType.type)}>
                <span className="icon">{qType.icon}</span>
                {qType.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Editor Area */}
        <main className="form-editor-area">
          <>
            <div className="form-title-section">
              <input type="text" placeholder="Untitled Form" className="form-title-input" />
            </div>

            {questions.length > 0 ? (
              questions.map((question, index) => {
                switch (question.type) {
                  case 'short-text':
                    return (
                      <ShortTextQuestion
                        key={question.id}
                        question={question}
                        questionIndex={index + 1}
                        onRemove={() => removeQuestion(question.id)}
                        onQuestionTextChange={handleQuestionTextChange}
                      />
                    );
                  case 'long-text':
                    return (
                      <LongTextQuestion
                        key={question.id}
                        question={question}
                        questionIndex={index + 1}
                        onRemove={() => removeQuestion(question.id)}
                        onQuestionTextChange={handleQuestionTextChange}
                      />
                    );
                  case 'multiple-choice':
                    return (
                      <MultipleChoiceQuestion
                        key={question.id}
                        question={question}
                        questionIndex={index + 1}
                        onRemove={() => removeQuestion(question.id)}
                        onQuestionTextChange={handleQuestionTextChange}
                      />
                    );
                  case 'picture-choice':
                    return (
                      <PictureChoiceQuestion
                        key={question.id}
                        question={question}
                        questionIndex={index + 1}
                        onRemove={() => removeQuestion(question.id)}
                        onQuestionTextChange={handleQuestionTextChange}
                      />
                    );
                  default:
                    return (
                      <p key={question.id} className="placeholder-question">
                        {question.name || `Question ${index + 1} Placeholder`}
                        <button className="remove-question-button" onClick={() => removeQuestion(question.id)}>✕</button>
                      </p>
                    );
                }
              })
            ) : (
              <div className="empty-form-message">
                <p>Start by adding questions from the left sidebar!</p>
                <img src="https://via.placeholder.com/150x150?text=Empty+Form" alt="Empty form" />
              </div>
            )}
          </>
        </main>
      </div>
    </div>
  );
};

export default Forms;