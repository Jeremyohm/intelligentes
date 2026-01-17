import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTime, flattenQuestions, generateResultsData } from '../utils/helpers';
import VisualQuestion from '../components/VisualQuestion';
import './TestPage.css';

function TestPage({ userData, testData, onComplete }) {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [questionTimes, setQuestionTimes] = useState({});
  const questionStartTime = useRef(Date.now());

  // Initialize questions
  useEffect(() => {
    if (testData) {
      const allQuestions = flattenQuestions(testData);
      setQuestions(allQuestions);
      // Initialize answers object
      const initialAnswers = {};
      allQuestions.forEach((_, index) => {
        initialAnswers[index] = null;
      });
      setAnswers(initialAnswers);
    }
  }, [testData]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(true); // Auto-submit when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Track time spent on each question
  const recordQuestionTime = useCallback(() => {
    const timeSpent = Date.now() - questionStartTime.current;
    setQuestionTimes(prev => ({
      ...prev,
      [currentIndex]: (prev[currentIndex] || 0) + timeSpent
    }));
  }, [currentIndex]);

  // Reset question timer when changing questions
  useEffect(() => {
    questionStartTime.current = Date.now();
  }, [currentIndex]);

  const handleAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: answer
    }));
  };

  const goToQuestion = (index) => {
    recordQuestionTime();
    setCurrentIndex(index);
  };

  const handleNext = () => {
    recordQuestionTime();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    recordQuestionTime();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = useCallback((autoSubmit = false) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    recordQuestionTime();

    const timeSpent = 3600 - timeRemaining; // Time taken in seconds
    const results = generateResultsData(testData, answers, timeSpent, userData);
    
    onComplete(results);
    navigate('/results');
  }, [isSubmitting, answers, testData, userData, timeRemaining, onComplete, navigate, recordQuestionTime]);

  const getTimerClass = () => {
    if (timeRemaining <= 60) return 'danger';
    if (timeRemaining <= 300) return 'warning';
    return '';
  };

  const getAnsweredCount = () => {
    return Object.values(answers).filter(a => a !== null).length;
  };

  const currentQuestion = questions[currentIndex];

  if (!currentQuestion) {
    return (
      <div className="test-loading">
        <div className="spinner"></div>
        <p>Loading test...</p>
      </div>
    );
  }

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="test-page">
      {/* Header */}
      <header className="test-header">
        <div className="header-left">
          <div className="logo-mini">
            <span className="logo-icon">◆</span>
            <span>Intelligentes</span>
          </div>
        </div>
        
        <div className="header-center">
          <div className={`timer ${getTimerClass()}`}>
            ⏱ {formatTime(timeRemaining)}
          </div>
        </div>
        
        <div className="header-right">
          <span className="progress-text">
            {getAnsweredCount()} / {questions.length} answered
          </span>
          <button 
            className="btn btn-primary btn-small"
            onClick={() => setShowConfirmSubmit(true)}
          >
            Submit Test
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="test-progress">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="test-content">
        {/* Question Navigator */}
        <aside className="question-nav">
          <div className="nav-header">
            <h3>Questions</h3>
            <span className="nav-stats">{getAnsweredCount()}/{questions.length}</span>
          </div>
          <div className="nav-grid">
            {questions.map((_, index) => (
              <button
                key={index}
                className={`nav-item ${currentIndex === index ? 'current' : ''} ${answers[index] !== null ? 'answered' : ''}`}
                onClick={() => goToQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="nav-legend">
            <div className="legend-item">
              <span className="legend-dot current"></span>
              <span>Current</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot answered"></span>
              <span>Answered</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot"></span>
              <span>Unanswered</span>
            </div>
          </div>
        </aside>

        {/* Question Area */}
        <main className="question-area">
          <div className="question-card">
            <div className="question-header">
              <span className="question-number">Question {currentIndex + 1}</span>
              <span className={`question-type ${currentQuestion.type}`}>
                {currentQuestion.type.charAt(0).toUpperCase() + currentQuestion.type.slice(1)}
              </span>
            </div>
            
            <div className="question-text">
              {currentQuestion.question}
            </div>

            {/* Visual for spatial/pattern questions */}
            <VisualQuestion question={currentQuestion} />

            <div className="options-list">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${answers[currentIndex] === option ? 'selected' : ''}`}
                  onClick={() => handleAnswer(option)}
                >
                  <span className="option-letter">{optionLetters[index]}</span>
                  <span className="option-text">{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="question-actions">
            <button 
              className="btn btn-secondary"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              ← Previous
            </button>
            
            {currentIndex < questions.length - 1 ? (
              <button 
                className="btn btn-primary"
                onClick={handleNext}
              >
                Next →
              </button>
            ) : (
              <button 
                className="btn btn-primary"
                onClick={() => setShowConfirmSubmit(true)}
              >
                Finish Test
              </button>
            )}
          </div>
        </main>
      </div>

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Submit Test?</h2>
            <p>
              You have answered <strong>{getAnsweredCount()}</strong> out of <strong>{questions.length}</strong> questions.
            </p>
            {getAnsweredCount() < questions.length && (
              <p className="modal-warning">
                ⚠️ You have {questions.length - getAnsweredCount()} unanswered questions.
                Unanswered questions will be marked as incorrect.
              </p>
            )}
            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowConfirmSubmit(false)}
              >
                Continue Test
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => handleSubmit()}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Test'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestPage;
