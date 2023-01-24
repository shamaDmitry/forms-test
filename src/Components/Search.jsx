import React from 'react';

const Search = ({ onSearch }) => {
  return (
    <div>
      <input
        type="text"
        onChange={onSearch}
      />
    </div>
  );
}

export default Search;
