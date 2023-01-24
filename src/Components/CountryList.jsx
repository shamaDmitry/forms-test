function CountryList({ data, handleCountrySelect }) {
  if (!data.length) return <h1>Nothing is here</h1>

  return (
    <ul>
      {
        data.map(country => {
          return (
            <li key={country.id}>
              <label htmlFor={country.id}>
                <input
                  type="checkbox"
                  checked={country.isSelected}
                  value={country.name}
                  disabled={country.isDisabled}
                  id={country.id}
                  onChange={(e) => handleCountrySelect(e)}
                />
                {country.name}
              </label>
            </li>
          )
        })
      }
    </ul>
  )
}

export default CountryList