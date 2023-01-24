import React from 'react';

const Filter = ({ data, onFilter }) => {
  return (
    <div>
      <label htmlFor={data.title}>
        <input
          type="checkbox"
          id={data.title}
          onChange={onFilter}
        />
        {data.title}
      </label>

      {/* <button>
        clear all
      </button> */}
    </div>
  );
}

export default Filter;
