import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DemographicsPage from './pages/DemographicsPage';
import TestPage from './pages/TestPage';
import ResultsPage from './pages/ResultsPage';
import './index.css';

function App() {
  const [userData, setUserData] = useState(null);
  const [testData, setTestData] = useState(null);
  const [testResults, setTestResults] = useState(null);

  // Load saved data from sessionStorage on mount
  useEffect(() => {
    const savedUserData = sessionStorage.getItem('intelligentes_user');
    const savedTestResults = sessionStorage.getItem('intelligentes_results');
    
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
    if (savedTestResults) {
      setTestResults(JSON.parse(savedTestResults));
    }
  }, []);

  // Save user data to sessionStorage
  const handleUserDataSubmit = (data) => {
    setUserData(data);
    sessionStorage.setItem('intelligentes_user', JSON.stringify(data));
  };

  // Save test results
  const handleTestComplete = (results) => {
    setTestResults(results);
    sessionStorage.setItem('intelligentes_results', JSON.stringify(results));
  };

  // Clear all data (for retaking test)
  const handleReset = () => {
    setUserData(null);
    setTestData(null);
    setTestResults(null);
    sessionStorage.removeItem('intelligentes_user');
    sessionStorage.removeItem('intelligentes_results');
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<LandingPage />} 
        />
        <Route 
          path="/start" 
          element={
            <DemographicsPage 
              onSubmit={handleUserDataSubmit}
              setTestData={setTestData}
            />
          } 
        />
        <Route 
          path="/test" 
          element={
            userData && testData ? (
              <TestPage 
                userData={userData}
                testData={testData}
                onComplete={handleTestComplete}
              />
            ) : (
              <Navigate to="/start" replace />
            )
          } 
        />
        <Route 
          path="/results" 
          element={
            testResults ? (
              <ResultsPage 
                userData={userData}
                results={testResults}
                onReset={handleReset}
              />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
