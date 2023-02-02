import React from 'react';

const Search = ({ value, onSearch }) => {
  return (
    <div className="border-b border-[#ececec] mb-[23px]">
      <input
        className="py-[6px] block w-full m-0 focus:outline-none leading-[19px]"
        type="search"
        value={value}
        placeholder="Search"
        onChange={onSearch}
      />
    </div>
  );
}

export default Search;
