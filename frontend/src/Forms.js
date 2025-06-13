import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Forms.css';
import LongTextQuestion from './Components/LongTextQuestion';
import ShortTextQuestion from './Components/ShortTextQuestion';
import MultipleChoiceQuestion from './Components/MultipleChoiceQuestion';
import PictureChoiceQuestion from './Components/PictureChoiceQuestion';

const Forms = () => {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState('Untitled Form');
  const navigate = useNavigate();

  // Load saved state
  useEffect(() => {
    const savedQuestions = localStorage.getItem('formQuestions');
    const savedTitle = localStorage.getItem('formTitle');
    if (savedQuestions) setQuestions(JSON.parse(savedQuestions));
    if (savedTitle) setTitle(savedTitle);
  }, []);

  // Persist title + questions
  const saveQuestions = () => {
    localStorage.setItem('formQuestions', JSON.stringify(questions));
    localStorage.setItem('formTitle', title);
    alert('Form saved successfully!');
  };

  // Submit form + questions to backend via Axios
  const submitForm = async () => {
    try {
      saveQuestions(); // keep local save
      const response = await axios.post('/api/forms/', {
        title,
        questions
      });
      alert('Form submitted successfully!');
      console.log('Backend response:', response.data);
    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to submit form.');
    }
  };

  // Navigation handlers
  const handlePreviewClick = () => { saveQuestions(); navigate('/form-preview'); };
  const handleNewFormClick = () => navigate('/dashboard');
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };
  const handleBackToDashboard = () => navigate('/dashboard');

  const questionTypes = [
    { name: 'Short text', icon: '📄', type: 'short-text' },
    { name: 'Long text', icon: '✍️', type: 'long-text' },
    { name: 'Multiple choice', icon: '●', type: 'multiple-choice' },
    { name: 'Picture choice', icon: '🖼️', type: 'picture-choice' },
    // ...other types unchanged
  ];

  const addQuestion = (type) => {
    setQuestions(prev => [...prev, { id: Date.now(), type, name: '' }]);
  };

  const removeQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleQuestionTextChange = (id, newText) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, name: newText } : q))
    );
  };

  return (
    <div className="form-builder-page">
      <header className="form-builder-header">
        <div className="header-left">
          <button className="back-to-dashboard-button" onClick={handleBackToDashboard}>
            ← Back to Dashboard
          </button>
          <span className="form-builder-breadcrumb">My Forms / {title}</span>
          <h1 className="logo-text">Forms</h1>
        </div>

        <nav className="header-nav">
          <a href="#">Build</a>
          <a href="#">Integrate</a>
          <a href="#">Share</a>
          <a href="#">Results</a>
        </nav>

        <div className="header-right">
          <button className="save-button" onClick={saveQuestions}>Save Form</button>
          <button className="preview-button" onClick={handlePreviewClick}>Preview</button>
          <button className="submit-button" onClick={submitForm}>Submit Form</button>
          <button className="new-form-button" onClick={handleNewFormClick}>+ New Form</button>
          <img src="https://via.placeholder.com/35" alt="User Avatar" className="user-avatar-small" />
          <button className="logout-button" onClick={handleLogout}>Sign Out</button>
        </div>
      </header>

      <div className="form-builder-content">
        <aside className="question-types-sidebar">
          <div className="sidebar-tabs">
            <button className="tab-button active">Standard</button>
            <button className="tab-button">Premium</button>
          </div>
          <ul className="question-list">
            {questionTypes.map(qType => (
              <li key={qType.type} onClick={() => addQuestion(qType.type)}>
                <span className="icon">{qType.icon}</span>
                {qType.name}
              </li>
            ))}
          </ul>
        </aside>

        <main className="form-editor-area">
          <div className="form-title-section">
            <input
              type="text"
              className="form-title-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Untitled Form"
            />
          </div>

          {questions.length > 0 ? (
            questions.map((question, i) => {
              const commonProps = {
                key: question.id,
                question,
                questionIndex: i + 1,
                onRemove: () => removeQuestion(question.id),
                onQuestionTextChange: handleQuestionTextChange
              };
              switch (question.type) {
                case 'short-text':
                  return <ShortTextQuestion {...commonProps} />;
                case 'long-text':
                  return <LongTextQuestion {...commonProps} />;
                case 'multiple-choice':
                  return <MultipleChoiceQuestion {...commonProps} />;
                case 'picture-choice':
                  return <PictureChoiceQuestion {...commonProps} />;
                default:
                  return (
                    <p key={question.id} className="placeholder-question">
                      {question.name || `Question ${i + 1} Placeholder`}
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
        </main>
      </div>
    </div>
  );
};

export default Forms;
