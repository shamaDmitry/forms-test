import React from 'react';

const Search = ({ value, onSearch }) => {
  return (
    <div>
      <input
        style={{ width: '100%', margin: '0 0 20px 0' }}
        type="text"
        value={value}
        onChange={onSearch}
      />
    </div>
  );
}

export default Search;
