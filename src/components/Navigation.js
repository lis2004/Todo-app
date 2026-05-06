import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <h2>Todo App</h2>
      <ul>
        <li>
          <Link to="/">My Todos</Link>
        </li>
        <li>
          <Link to="/shared">Shared Todos</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;