import React from 'react';

const Filter = ({ data, activeFilter, onFilter }) => {
  let name;
  let toggleClass = `w-[37px]
  h-[22px]
  relative
  peer-focus:outline-none
  peer-focus:ring-0
  peer-focus:ring-blue-300
  peer-checked:bg-blue-600
  peer-checked:after:left-0
  peer-checked:after:translate-x-[calc(100%-1px)]
  bg-gray-200
  rounded-full`

  let toggleClassDark = `dark:peer-focus:ring-blue-800
  dark:bg-gray-700
  dark:border-gray-600`

  let toggleClassAfter = `after:content-['']
  after:absolute
  after:top-[2px] 
  after:left-[2px]
  after:bg-white
  after:rounded-full 
  after:shadow
  after:h-[18px]
  after:w-[18px]
  after:transition-all`

  switch (data[0]) {
    case 'selectedOnly':
      name = 'Show selected only';
      break;

    default:
      name = 'All'
  }

  return (
    <label
      className="relative
        inline-flex
        items-center
        cursor-pointer"
    >
      <input
        type="checkbox"
        onChange={onFilter}
        className="sr-only peer"
        checked={activeFilter === data[0]}
      />
      <div className={`${toggleClass} ${toggleClassAfter} ${toggleClassDark}`} />
      <span className="ml-[10px] font-medium text-[#232323] -tracking-[0.5px] dark:text-gray-600 select-none">
        {name}
      </span>
    </label>
  );
}

export default Filter;