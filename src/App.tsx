import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import ModelPage from './components/ModelPage';
import InterpretabilityPage from './components/InterpretabilityPage';
import ResultsPage from './components/ResultsPage';
import AboutPage from './components/AboutPage';
import { getCurrentUser, setCurrentUser, logout, validateLogin, registerUser } from './utils/auth';
import { User, TwitterProfile, PredictionResult } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [analysisData, setAnalysisData] = useState<{
    profile: TwitterProfile | null;
    result: PredictionResult | null;
  }>({
    profile: null,
    result: null
  });

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    if (validateLogin(username, password)) {
      const newUser: User = {
        id: username,
        username,
        email: `${username}@example.com`,
        isAuthenticated: true
      };
      setCurrentUser(newUser);
      setUser(newUser);
      return true;
    }
    return false;
  };

  const handleRegister = async (username: string, password: string, email: string): Promise<boolean> => {
    if (registerUser(username, password, email)) {
      const newUser: User = {
        id: username,
        username,
        email,
        isAuthenticated: true
      };
      setCurrentUser(newUser);
      setUser(newUser);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setCurrentPage('home');
    setAnalysisData({ profile: null, result: null });
  };

  const handleAnalysisComplete = (profile: TwitterProfile, result: PredictionResult) => {
    setAnalysisData({ profile, result });
    setCurrentPage('interpretability');
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} onRegister={handleRegister} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'model':
        return <ModelPage onAnalysisComplete={handleAnalysisComplete} />;
      case 'interpretability':
        return <InterpretabilityPage profile={analysisData.profile} result={analysisData.result} />;
      case 'results':
        return <ResultsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />
      {renderCurrentPage()}
    </div>
  );
}

export default App;