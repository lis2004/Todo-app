import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <h2>Todo</h2>
      <ul>
        <li><Link to="/">My Todos</Link></li>
        <li><Link to="/shared">API Todos</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;