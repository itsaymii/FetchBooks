import React, { useState } from 'react';

const SearchBar = ({ onSearch, onUpload }) => {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
      <button
        type="button"
        className="upload-button"
        onClick={onUpload}
      >
        Upload
      </button>
    </form>
  );
};

export default SearchBar;