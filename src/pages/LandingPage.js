import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container navbar-content">
          <div className="logo">
            <div className="logo-mark">
              <svg viewBox="0 0 40 40" width="40" height="40">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d4ff"/>
                    <stop offset="100%" stopColor="#c0c0c8"/>
                  </linearGradient>
                </defs>
                <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke="url(#logoGradient)" strokeWidth="2"/>
                <polygon points="20,10 30,20 20,30 10,20" fill="url(#logoGradient)"/>
              </svg>
            </div>
            <span className="logo-text">INTELLIGENTES</span>
          </div>
          <div className="nav-right">
            <span className="nav-tagline">Professional IQ Assessment</span>
            <button className="btn btn-primary" onClick={() => navigate('/start')}>
              Begin Assessment
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-elements">
          <div className="hero-orb orb-1"></div>
          <div className="hero-orb orb-2"></div>
          <div className="hero-line line-1"></div>
          <div className="hero-line line-2"></div>
        </div>
        
        <div className="container hero-content">
          <div className="hero-badge">
            <span className="badge badge-premium">◆ Scientifically Calibrated Assessment</span>
          </div>
          <h1 className="hero-title">
            Measure Your<br />
            <span className="text-gradient">Cognitive Potential</span>
          </h1>
          <p className="hero-description">
            A comprehensive 60-question assessment designed to precisely measure 
            your intellectual capabilities across four cognitive domains.
          </p>
          <div className="hero-cta">
            <button className="btn btn-premium btn-large" onClick={() => navigate('/start')}>
              Start Your Assessment
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">60</span>
              <span className="stat-text">Questions</span>
            </div>
            <div className="stat-divider"></div>
            <div className="hero-stat">
              <span className="stat-number">60</span>
              <span className="stat-text">Minutes</span>
            </div>
            <div className="stat-divider"></div>
            <div className="hero-stat">
              <span className="stat-number">4</span>
              <span className="stat-text">Domains</span>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Discover Section */}
      <section className="discover-section">
        <div className="container">
          <div className="section-header">
            <span className="badge">Comprehensive Results</span>
            <h2>What You'll <span className="text-gradient">Discover</span></h2>
            <p>Beyond just a number — understand your complete cognitive profile</p>
          </div>
          
          <div className="discover-grid">
            <div className="discover-card">
              <div className="discover-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3>Precise IQ Score</h3>
              <p>Receive your IQ score on a standardized scale from 70-145, with detailed percentile ranking.</p>
            </div>
            
            <div className="discover-card">
              <div className="discover-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Cognitive Strengths</h3>
              <p>Discover your strongest cognitive areas — verbal, numerical, spatial, or logical reasoning.</p>
            </div>
            
            <div className="discover-card">
              <div className="discover-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <path d="M8 21h8"/>
                  <path d="M12 17v4"/>
                </svg>
              </div>
              <h3>Career Insights</h3>
              <p>Get personalized career recommendations based on your cognitive profile and strengths.</p>
            </div>
            
            <div className="discover-card">
              <div className="discover-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>Population Comparison</h3>
              <p>See how you compare to college graduates, professionals, and the general population.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Domains Section */}
      <section className="domains-section">
        <div className="container">
          <div className="section-header">
            <span className="badge">Assessment Structure</span>
            <h2>Four Cognitive <span className="text-gradient">Domains</span></h2>
            <p>Each domain contains 15 carefully calibrated questions</p>
          </div>
          
          <div className="domains-grid">
            <div className="domain-card">
              <div className="domain-number">01</div>
              <div className="domain-icon verbal">
                <span>V</span>
              </div>
              <h3>Verbal Reasoning</h3>
              <p>Vocabulary, analogies, word relationships, and linguistic comprehension.</p>
              <ul className="domain-skills">
                <li>Synonyms & Antonyms</li>
                <li>Word Analogies</li>
                <li>Classification</li>
              </ul>
            </div>
            
            <div className="domain-card">
              <div className="domain-number">02</div>
              <div className="domain-icon numerical">
                <span>N</span>
              </div>
              <h3>Numerical Reasoning</h3>
              <p>Number sequences, mathematical patterns, and quantitative problem-solving.</p>
              <ul className="domain-skills">
                <li>Number Sequences</li>
                <li>Mental Arithmetic</li>
                <li>Pattern Recognition</li>
              </ul>
            </div>
            
            <div className="domain-card">
              <div className="domain-number">03</div>
              <div className="domain-icon spatial">
                <span>S</span>
              </div>
              <h3>Spatial Recognition</h3>
              <p>Visual patterns, mental rotation, and spatial relationship analysis.</p>
              <ul className="domain-skills">
                <li>Shape Rotation</li>
                <li>Pattern Completion</li>
                <li>Visual Sequences</li>
              </ul>
            </div>
            
            <div className="domain-card">
              <div className="domain-number">04</div>
              <div className="domain-icon logical">
                <span>L</span>
              </div>
              <h3>Logical Reasoning</h3>
              <p>Deductive reasoning, logical sequences, and analytical problem-solving.</p>
              <ul className="domain-skills">
                <li>Deductive Logic</li>
                <li>Syllogisms</li>
                <li>Sequential Reasoning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scoring Section */}
      <section className="scoring-section">
        <div className="container">
          <div className="scoring-content">
            <div className="scoring-info">
              <span className="badge">IQ Scale</span>
              <h2>Understanding Your <span className="text-gradient">Score</span></h2>
              <p>Your raw score is converted to a standardized IQ scale using established psychometric formulas.</p>
              
              <div className="score-classifications">
                <div className="classification-item genius">
                  <span className="class-range">145+</span>
                  <span className="class-label">Genius</span>
                  <span className="class-percentile">Top 0.1%</span>
                </div>
                <div className="classification-item superior">
                  <span className="class-range">130-144</span>
                  <span className="class-label">Very Superior</span>
                  <span className="class-percentile">Top 2%</span>
                </div>
                <div className="classification-item high">
                  <span className="class-range">120-129</span>
                  <span className="class-label">Superior</span>
                  <span className="class-percentile">Top 9%</span>
                </div>
                <div className="classification-item above">
                  <span className="class-range">110-119</span>
                  <span className="class-label">High Average</span>
                  <span className="class-percentile">Top 25%</span>
                </div>
                <div className="classification-item average">
                  <span className="class-range">90-109</span>
                  <span className="class-label">Average</span>
                  <span className="class-percentile">Middle 50%</span>
                </div>
              </div>
            </div>
            
            <div className="scoring-visual">
              <div className="bell-curve-card">
                <svg viewBox="0 0 300 200" className="bell-curve">
                  <defs>
                    <linearGradient id="curveGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="rgba(0, 212, 255, 0.1)"/>
                      <stop offset="100%" stopColor="rgba(0, 212, 255, 0.4)"/>
                    </linearGradient>
                  </defs>
                  {/* Bell curve path */}
                  <path 
                    d="M 10,180 Q 50,180 80,160 Q 110,120 150,40 Q 190,120 220,160 Q 250,180 290,180 L 290,180 L 10,180 Z" 
                    fill="url(#curveGradient)"
                    stroke="#00d4ff"
                    strokeWidth="2"
                  />
                  {/* 100 IQ marker */}
                  <line x1="150" y1="30" x2="150" y2="180" stroke="#c0c0c8" strokeWidth="1" strokeDasharray="4"/>
                  <text x="150" y="195" textAnchor="middle" fill="#c0c0c8" fontSize="12">100</text>
                  <text x="50" y="195" textAnchor="middle" fill="#6e6e7a" fontSize="10">70</text>
                  <text x="250" y="195" textAnchor="middle" fill="#6e6e7a" fontSize="10">130</text>
                </svg>
                <p className="curve-label">Normal Distribution of IQ Scores</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2>Ready to Discover Your IQ?</h2>
              <p>Complete your cognitive assessment and receive comprehensive results instantly.</p>
              <button className="btn btn-premium btn-large" onClick={() => navigate('/start')}>
                Begin Assessment Now
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            <div className="cta-decoration">
              <div className="cta-orb"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <div className="logo-mark small">
              <svg viewBox="0 0 40 40" width="24" height="24">
                <defs>
                  <linearGradient id="logoGradientSmall" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00d4ff"/>
                    <stop offset="100%" stopColor="#c0c0c8"/>
                  </linearGradient>
                </defs>
                <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke="url(#logoGradientSmall)" strokeWidth="2"/>
                <polygon points="20,10 30,20 20,30 10,20" fill="url(#logoGradientSmall)"/>
              </svg>
            </div>
            <span>INTELLIGENTES</span>
          </div>
          <p className="footer-disclaimer">
            This assessment provides an estimate of cognitive abilities for educational and self-discovery purposes. 
            It should not be used for clinical diagnosis or high-stakes decisions.
          </p>
          <div className="footer-bottom">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Intelligentes. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
