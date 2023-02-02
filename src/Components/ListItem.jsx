import React from 'react'

export default function ListItem({ item, handleCountrySelect, handleDisabled }) {
  return (
    <div className="flex justify-between items-center mr-3 mb-[18px] last:mb-0">
      <label
        htmlFor={item.id}
        className="relative flex items-center gap-[15px]"
        style={{
          color: item.isDisabled ? '#ccc' : '#343434',
          cursor: item.isDisabled ? 'not-allowed' : 'pointer',
        }}
      >
        <input
          className="sr-only peer"
          type="checkbox"
          checked={item.isSelected}
          value={item.name}
          disabled={item.isDisabled}
          id={item.id}
          onChange={handleCountrySelect(item)}
        />
        <div className="w-[22px] h-[22px] relative bg-[#ECECEC] rounded-[8px] bg-center bg-no-repeat
        peer-checked:bg-blue-600 
        peer-disabled:bg-[#ccc]
          peer-checked:bg-[url('/src/assets/icons/check.svg')]"
        />
        <span className="text-[#343434] select-none peer-disabled:text-[#ccc]">
          {item.name}
        </span>
      </label>

      <button
        className="text-red-900 leading-[22px] font-medium focus:outline-none"
        onClick={handleDisabled(item)}
      >
        {item.isDisabled ? 'Enable' : 'Disable'}
      </button>
    </div>
  )
}