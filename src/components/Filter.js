import React from 'react';

function Filter({ setFilter }) {
  return (
    <div className="filter">
      <button onClick={() => setFilter('all')} className="filter-button">All</button>
      <button onClick={() => setFilter('active')} className="filter-button">Active</button>
      <button onClick={() => setFilter('completed')} className="filter-button">Completed</button>
    </div>
  );
}

export default Filter;