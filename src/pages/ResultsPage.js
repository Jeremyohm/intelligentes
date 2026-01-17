import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultsPage.css';

function ResultsPage({ userData, results, onReset }) {
  const navigate = useNavigate();
  const [showEmailSuccess, setShowEmailSuccess] = useState(false);
  const [animatedIQ, setAnimatedIQ] = useState(70);
  const [activeTab, setActiveTab] = useState('overview');

  // Animate IQ number on mount
  useEffect(() => {
    if (results?.iq) {
      const target = results.iq;
      const duration = 2000;
      const steps = 60;
      const increment = (target - 70) / steps;
      let current = 70;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current += increment;
        setAnimatedIQ(Math.round(current));
        
        if (step >= steps) {
          setAnimatedIQ(target);
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [results?.iq]);

  const handleEmailResults = async () => {
    setShowEmailSuccess(true);
    setTimeout(() => setShowEmailSuccess(false), 3000);
    console.log('Results to email:', { to: userData?.email, data: results });
  };

  const handleRetake = () => {
    onReset();
    navigate('/');
  };

  if (!results) {
    return (
      <div className="results-loading">
        <div className="spinner"></div>
        <p>Loading results...</p>
      </div>
    );
  }

  const { 
    iq, rawScore, totalQuestions, classification, percentile, 
    sectionScores, careers, cognitiveStrengths, comparisons, 
    famousComparisons, realWorldMeaning, timeSpent 
  } = results;

  const formatTimeSpent = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="results-page">
      {/* Header */}
      <header className="results-header">
        <div className="container header-content">
          <div className="logo">
            <div className="logo-mark">
              <svg viewBox="0 0 40 40" width="32" height="32">
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d4ff"/>
                    <stop offset="100%" stopColor="#c0c0c8"/>
                  </linearGradient>
                </defs>
                <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke="url(#logoGrad)" strokeWidth="2"/>
                <polygon points="20,10 30,20 20,30 10,20" fill="url(#logoGrad)"/>
              </svg>
            </div>
            <span className="logo-text">INTELLIGENTES</span>
          </div>
          <span className="header-badge">Assessment Complete</span>
        </div>
      </header>

      <main className="results-main">
        <div className="container">
          {/* Hero Score Section */}
          <section className="score-hero">
            <div className="score-hero-content">
              <div className="iq-display">
                <div className="iq-circle">
                  <svg viewBox="0 0 200 200">
                    <defs>
                      <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d4ff"/>
                        <stop offset="100%" stopColor="#c0c0c8"/>
                      </linearGradient>
                    </defs>
                    <circle
                      cx="100" cy="100" r="90"
                      fill="none"
                      stroke="rgba(192, 192, 200, 0.1)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="100" cy="100" r="90"
                      fill="none"
                      stroke="url(#ringGradient)"
                      strokeWidth="8"
                      strokeDasharray={`${((iq - 70) / 75) * 565} 565`}
                      strokeLinecap="round"
                      transform="rotate(-90 100 100)"
                      className="score-ring"
                    />
                  </svg>
                  <div className="iq-value">
                    <span className="iq-number">{animatedIQ}</span>
                    <span className="iq-label">IQ SCORE</span>
                  </div>
                </div>
              </div>
              
              <div className="score-details">
                <div className="classification-badge">
                  <span className={`tier-badge ${classification.tier}`}>{classification.label}</span>
                </div>
                <p className="classification-desc">{classification.description}</p>
                
                <div className="quick-stats">
                  <div className="quick-stat">
                    <span className="qs-value">{percentile}%</span>
                    <span className="qs-label">Percentile</span>
                  </div>
                  <div className="quick-stat">
                    <span className="qs-value">{rawScore}/{totalQuestions}</span>
                    <span className="qs-label">Correct</span>
                  </div>
                  <div className="quick-stat">
                    <span className="qs-value">{formatTimeSpent(timeSpent)}</span>
                    <span className="qs-label">Time</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tab Navigation */}
          <nav className="results-tabs">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'strengths' ? 'active' : ''}`}
              onClick={() => setActiveTab('strengths')}
            >
              Cognitive Strengths
            </button>
            <button 
              className={`tab-btn ${activeTab === 'careers' ? 'active' : ''}`}
              onClick={() => setActiveTab('careers')}
            >
              Career Insights
            </button>
            <button 
              className={`tab-btn ${activeTab === 'comparison' ? 'active' : ''}`}
              onClick={() => setActiveTab('comparison')}
            >
              Comparisons
            </button>
          </nav>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="tab-panel overview-panel">
                {/* What Your Score Means */}
                <section className="meaning-section">
                  <h2>What Your Score Means</h2>
                  <div className="meaning-grid">
                    <div className="meaning-card">
                      <div className="meaning-icon">📚</div>
                      <h3>Learning</h3>
                      <p>{realWorldMeaning.learning}</p>
                    </div>
                    <div className="meaning-card">
                      <div className="meaning-icon">🧩</div>
                      <h3>Problem Solving</h3>
                      <p>{realWorldMeaning.problems}</p>
                    </div>
                    <div className="meaning-card">
                      <div className="meaning-icon">💼</div>
                      <h3>Work</h3>
                      <p>{realWorldMeaning.work}</p>
                    </div>
                    <div className="meaning-card">
                      <div className="meaning-icon">🎓</div>
                      <h3>Education</h3>
                      <p>{realWorldMeaning.education}</p>
                    </div>
                  </div>
                </section>

                {/* IQ Scale */}
                <section className="scale-section">
                  <h2>Where You Stand</h2>
                  <div className="iq-scale">
                    <div className="scale-bar">
                      <div className="scale-segments">
                        <div className="segment borderline" style={{width: '13.3%'}}></div>
                        <div className="segment low-avg" style={{width: '13.3%'}}></div>
                        <div className="segment average" style={{width: '26.7%'}}></div>
                        <div className="segment high-avg" style={{width: '13.3%'}}></div>
                        <div className="segment superior" style={{width: '13.3%'}}></div>
                        <div className="segment very-superior" style={{width: '20%'}}></div>
                      </div>
                      <div 
                        className="scale-marker"
                        style={{ left: `${Math.min(100, Math.max(0, ((iq - 70) / 75) * 100))}%` }}
                      >
                        <span className="marker-value">{iq}</span>
                        <span className="marker-arrow">▼</span>
                      </div>
                    </div>
                    <div className="scale-labels">
                      <span>70</span>
                      <span>85</span>
                      <span>100</span>
                      <span>115</span>
                      <span>130</span>
                      <span>145</span>
                    </div>
                    <div className="scale-names">
                      <span>Borderline</span>
                      <span>Low Avg</span>
                      <span>Average</span>
                      <span>High Avg</span>
                      <span>Superior</span>
                      <span>Very Superior</span>
                    </div>
                  </div>
                </section>

                {/* Domain Performance */}
                <section className="domain-section">
                  <h2>Performance by Domain</h2>
                  <div className="domain-grid">
                    {cognitiveStrengths.map((domain, index) => (
                      <div key={domain.key} className={`domain-card ${domain.key}`}>
                        <div className="domain-rank">#{index + 1}</div>
                        <div className="domain-header">
                          <span className="domain-icon">{domain.icon}</span>
                          <div>
                            <h3>{domain.name}</h3>
                            <span className="domain-score-text">{domain.score}/{domain.total} correct</span>
                          </div>
                        </div>
                        <div className="domain-bar-container">
                          <div 
                            className="domain-bar-fill"
                            style={{ width: `${domain.percentage}%` }}
                          ></div>
                        </div>
                        <span className="domain-percentage">{domain.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* Cognitive Strengths Tab */}
            {activeTab === 'strengths' && (
              <div className="tab-panel strengths-panel">
                <section className="strengths-overview">
                  <h2>Your Cognitive Profile</h2>
                  <p className="section-intro">Based on your performance, here are your cognitive strengths ranked from highest to lowest.</p>
                  
                  <div className="strengths-list">
                    {cognitiveStrengths.map((strength, index) => (
                      <div key={strength.key} className={`strength-card ${index === 0 ? 'top-strength' : ''}`}>
                        {index === 0 && <div className="top-badge">🏆 Top Strength</div>}
                        <div className="strength-header">
                          <span className="strength-icon">{strength.icon}</span>
                          <div className="strength-info">
                            <h3>{strength.name}</h3>
                            <p>{strength.highDesc}</p>
                          </div>
                          <div className="strength-score">
                            <span className="score-big">{strength.percentage}%</span>
                          </div>
                        </div>
                        <div className="strength-abilities">
                          <span className="abilities-label">Key Abilities:</span>
                          <div className="abilities-list">
                            {strength.abilities.map((ability, i) => (
                              <span key={i} className="ability-tag">{ability}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* Career Insights Tab */}
            {activeTab === 'careers' && (
              <div className="tab-panel careers-panel">
                <section className="careers-section">
                  <h2>{careers.title}</h2>
                  <p className="section-intro">{careers.insight}</p>
                  
                  <div className="careers-grid">
                    {careers.careers.map((career, index) => (
                      <div key={index} className="career-card">
                        <span className="career-icon">{career.icon}</span>
                        <div className="career-info">
                          <h3>{career.name}</h3>
                          <div className="match-bar">
                            <div className="match-fill" style={{ width: `${career.match}%` }}></div>
                          </div>
                          <span className="match-text">{career.match}% cognitive match</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* Comparisons Tab */}
            {activeTab === 'comparison' && (
              <div className="tab-panel comparison-panel">
                {/* Population Comparisons */}
                <section className="comparison-section">
                  <h2>Population Comparison</h2>
                  <p className="section-intro">See how your score compares to different groups.</p>
                  
                  <div className="comparison-cards">
                    <div className="comparison-card">
                      <h3>vs. General Population</h3>
                      <div className="comparison-visual">
                        <div className="pop-bar">
                          <div className="pop-avg" style={{ left: '50%' }}>
                            <span>100</span>
                            <small>Average</small>
                          </div>
                          <div className="pop-you" style={{ left: `${Math.min(95, Math.max(5, ((iq - 70) / 75) * 100))}%` }}>
                            <span>{iq}</span>
                            <small>You</small>
                          </div>
                        </div>
                      </div>
                      <p className="comparison-result">
                        You scored <strong>{comparisons.generalPopulation.yourPosition}</strong> the average person.
                      </p>
                    </div>

                    <div className="comparison-card">
                      <h3>vs. College Graduates</h3>
                      <div className="comparison-visual">
                        <div className="pop-bar">
                          <div className="pop-avg" style={{ left: '60%' }}>
                            <span>115</span>
                            <small>Avg Grad</small>
                          </div>
                          <div className="pop-you" style={{ left: `${Math.min(95, Math.max(5, ((iq - 70) / 75) * 100))}%` }}>
                            <span>{iq}</span>
                            <small>You</small>
                          </div>
                        </div>
                      </div>
                      <p className="comparison-result">
                        You scored <strong>{comparisons.collegeGraduates.yourPosition}</strong> the average college graduate.
                      </p>
                    </div>

                    <div className="comparison-card">
                      <h3>vs. Professional Workers</h3>
                      <div className="comparison-visual">
                        <div className="pop-bar">
                          <div className="pop-avg" style={{ left: '56%' }}>
                            <span>112</span>
                            <small>Avg Pro</small>
                          </div>
                          <div className="pop-you" style={{ left: `${Math.min(95, Math.max(5, ((iq - 70) / 75) * 100))}%` }}>
                            <span>{iq}</span>
                            <small>You</small>
                          </div>
                        </div>
                      </div>
                      <p className="comparison-result">
                        You scored <strong>{comparisons.professionalWorkers.yourPosition}</strong> the average professional.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Notable Comparisons */}
                <section className="notable-section">
                  <h2>IQ Range: {famousComparisons.range}</h2>
                  <p className="section-intro">{famousComparisons.professionAvg}</p>
                  
                  {famousComparisons.people.length > 0 && (
                    <div className="notable-people">
                      {famousComparisons.people.map((person, index) => (
                        <div key={index} className="notable-card">
                          <div className="notable-info">
                            <h3>{person.name}</h3>
                            <span className="notable-field">{person.field}</span>
                          </div>
                          <span className="notable-iq">~{person.estimatedIQ} IQ</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            )}
          </div>

          {/* Actions Section */}
          <section className="actions-section">
            <div className="actions-card">
              <div className="action-item">
                <div className="action-icon">📧</div>
                <h3>Email Results</h3>
                <p>Receive a copy of your complete results</p>
                <button 
                  className="btn btn-primary"
                  onClick={handleEmailResults}
                >
                  {showEmailSuccess ? '✓ Sent!' : 'Send to Email'}
                </button>
              </div>
              <div className="action-divider"></div>
              <div className="action-item">
                <div className="action-icon">🔄</div>
                <h3>Take Again</h3>
                <p>Try a different version of the assessment</p>
                <button 
                  className="btn btn-secondary"
                  onClick={handleRetake}
                >
                  New Assessment
                </button>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="disclaimer-section">
            <p>
              <strong>Important:</strong> This assessment provides an estimate of cognitive abilities for educational 
              and self-discovery purposes. It should not be used for clinical diagnosis, employment decisions, 
              or other high-stakes purposes. For a comprehensive evaluation, consult a licensed psychologist.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="results-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Intelligentes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ResultsPage;
