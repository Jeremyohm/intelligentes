import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { regions, educationLevels, countries } from '../utils/helpers';
import './DemographicsPage.css';

// Import test data
import testA from '../data/testA.json';
import testB from '../data/testB.json';
import testC from '../data/testC.json';
import testD from '../data/testD.json';
import testE from '../data/testE.json';

const tests = [testA, testB, testC, testD, testE];

function DemographicsPage({ onSubmit, setTestData }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    email: '',
    age: '',
    sex: '',
    ethnicity: '',
    subRegion: '',
    countryOfOrigin: '',
    countryResiding: '',
    education: '',
    primaryLanguage: '',
    consentToResearch: false
  });

  const ethnicityOptions = [
    { value: 'african', label: 'African' },
    { value: 'european', label: 'European' },
    { value: 'asian', label: 'Asian' },
    { value: 'indigenous', label: 'Indigenous/Native American' },
    { value: 'pacificIslander', label: 'Pacific Islander' },
    { value: 'middleEastern', label: 'Middle Eastern/North African' },
    { value: 'mixed', label: 'Mixed/Multiracial' },
    { value: 'other', label: 'Other' },
    { value: 'preferNotToSay', label: 'Prefer not to say' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      // Reset subRegion if ethnicity changes
      ...(name === 'ethnicity' ? { subRegion: '' } : {})
    }));
    
    // Clear error when field is filled
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.age) {
        newErrors.age = 'Age is required';
      } else if (formData.age < 13 || formData.age > 120) {
        newErrors.age = 'Please enter a valid age (13-120)';
      }
      if (!formData.sex) {
        newErrors.sex = 'Please select an option';
      }
    }
    
    if (currentStep === 2) {
      if (!formData.ethnicity) {
        newErrors.ethnicity = 'Please select an option';
      }
      if (formData.ethnicity && regions[formData.ethnicity] && !formData.subRegion) {
        newErrors.subRegion = 'Please select a region';
      }
    }
    
    if (currentStep === 3) {
      if (!formData.countryOfOrigin) {
        newErrors.countryOfOrigin = 'Please select your country of origin';
      }
      if (!formData.countryResiding) {
        newErrors.countryResiding = 'Please select your current country';
      }
      if (!formData.education) {
        newErrors.education = 'Please select your education level';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateStep(step)) return;
    
    // Randomly select a test version
    const randomTest = tests[Math.floor(Math.random() * tests.length)];
    
    // Add device info
    const userData = {
      ...formData,
      deviceType: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
      browser: navigator.userAgent,
      timestamp: new Date().toISOString()
    };
    
    onSubmit(userData);
    setTestData(randomTest);
    navigate('/test');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-step animate-slide-up">
            <div className="step-header">
              <h2>Basic Information</h2>
              <p>Let's start with some basic details</p>
            </div>
            
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
              <span className="form-hint">Results will be sent to this email</span>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Age *</label>
                <input
                  type="number"
                  name="age"
                  className={`form-input ${errors.age ? 'error' : ''}`}
                  placeholder="25"
                  min="13"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                />
                {errors.age && <span className="error-text">{errors.age}</span>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Sex *</label>
                <select
                  name="sex"
                  className={`form-select ${errors.sex ? 'error' : ''}`}
                  value={formData.sex}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="preferNotToSay">Prefer not to say</option>
                </select>
                {errors.sex && <span className="error-text">{errors.sex}</span>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step animate-slide-up">
            <div className="step-header">
              <h2>Background</h2>
              <p>Tell us about your background</p>
            </div>
            
            <div className="form-group">
              <label className="form-label">Ethnicity/Race *</label>
              <select
                name="ethnicity"
                className={`form-select ${errors.ethnicity ? 'error' : ''}`}
                value={formData.ethnicity}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                {ethnicityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.ethnicity && <span className="error-text">{errors.ethnicity}</span>}
            </div>
            
            {formData.ethnicity && regions[formData.ethnicity] && (
              <div className="form-group">
                <label className="form-label">Region *</label>
                <select
                  name="subRegion"
                  className={`form-select ${errors.subRegion ? 'error' : ''}`}
                  value={formData.subRegion}
                  onChange={handleChange}
                >
                  <option value="">Select region...</option>
                  {regions[formData.ethnicity].map(region => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.subRegion && <span className="error-text">{errors.subRegion}</span>}
              </div>
            )}
            
            <div className="form-group">
              <label className="form-label">Primary Language</label>
              <input
                type="text"
                name="primaryLanguage"
                className="form-input"
                placeholder="English"
                value={formData.primaryLanguage}
                onChange={handleChange}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step animate-slide-up">
            <div className="step-header">
              <h2>Location & Education</h2>
              <p>Almost there!</p>
            </div>
            
            <div className="form-group">
              <label className="form-label">Country of Origin *</label>
              <select
                name="countryOfOrigin"
                className={`form-select ${errors.countryOfOrigin ? 'error' : ''}`}
                value={formData.countryOfOrigin}
                onChange={handleChange}
              >
                <option value="">Select country...</option>
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.countryOfOrigin && <span className="error-text">{errors.countryOfOrigin}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label">Country Currently Residing *</label>
              <select
                name="countryResiding"
                className={`form-select ${errors.countryResiding ? 'error' : ''}`}
                value={formData.countryResiding}
                onChange={handleChange}
              >
                <option value="">Select country...</option>
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.countryResiding && <span className="error-text">{errors.countryResiding}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label">Education Level *</label>
              <select
                name="education"
                className={`form-select ${errors.education ? 'error' : ''}`}
                value={formData.education}
                onChange={handleChange}
              >
                <option value="">Select level...</option>
                {educationLevels.map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.education && <span className="error-text">{errors.education}</span>}
            </div>
            
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="consentToResearch"
                  checked={formData.consentToResearch}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <span>I consent to my anonymized data being used for research purposes</span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="demographics-page">
      <div className="demographics-container">
        <div className="form-sidebar">
          <div className="sidebar-content">
            <div className="logo">
              <span className="logo-icon">◆</span>
              <span className="logo-text">Intelligentes</span>
            </div>
            
            <div className="progress-steps">
              <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-info">
                  <span className="step-title">Basic Info</span>
                  <span className="step-desc">Email, age, sex</span>
                </div>
              </div>
              <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-info">
                  <span className="step-title">Background</span>
                  <span className="step-desc">Ethnicity, language</span>
                </div>
              </div>
              <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-info">
                  <span className="step-title">Location</span>
                  <span className="step-desc">Country, education</span>
                </div>
              </div>
            </div>
            
            <div className="sidebar-footer">
              <div className="test-info">
                <div className="info-item">
                  <span className="info-icon">⏱</span>
                  <span>60 minutes</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">📝</span>
                  <span>60 questions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="form-main">
          <form onSubmit={handleSubmit}>
            {renderStep()}
            
            <div className="form-actions">
              {step > 1 && (
                <button type="button" className="btn btn-secondary" onClick={handleBack}>
                  ← Back
                </button>
              )}
              
              {step < 3 ? (
                <button type="button" className="btn btn-primary" onClick={handleNext}>
                  Continue →
                </button>
              ) : (
                <button type="submit" className="btn btn-primary btn-large">
                  Begin Test →
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DemographicsPage;
