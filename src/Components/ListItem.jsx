import React from 'react'

export default function ListItem({ item, handleCountrySelect, handleDisabled }) {
  return (
    <div
      className='test'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '15px',
      }}
    >
      <label
        htmlFor={item.id}
        style={{
          color: item.isDisabled ? '#ccc' : null,
          cursor: item.isDisabled ? 'not-allowed' : 'pointer',
        }}
      >
        <input
          type="checkbox"
          checked={item.isSelected}
          value={item.name}
          disabled={item.isDisabled}
          id={item.id}
          onChange={handleCountrySelect(item)}
        />
        {item.name}
      </label>

      <button
        onClick={handleDisabled(item)}
      >
        {item.isDisabled ? 'Enable' : 'Disable'}
      </button>
    </div>
  )
}
