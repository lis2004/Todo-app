import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import SharedTodosPage from './pages/SharedTodosPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shared" element={<SharedTodosPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;