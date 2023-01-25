import React from 'react';

const Filter = ({ data, activeFilter, onFilter }) => {
  let name;

  switch (data[0]) {
    case 'selectedOnly':
      name = 'Show selected only';
      break;

    default:
      name = 'All'
  }

  return (
    <div>
      <label htmlFor={data[0]}>
        <input
          type="checkbox"
          checked={activeFilter === data[0] ? true : false}
          id={data[0]}
          onChange={onFilter}
        />
        {name}
      </label>
    </div>
  );
}

export default Filter;
