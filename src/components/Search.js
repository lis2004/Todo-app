import React from 'react';

function Search({ setSearch }) {
  return (
    <input
      type="text"
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search tasks"
      className="search-input"
    />
  );
}

export default Search;