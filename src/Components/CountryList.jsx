function CountryList({ data, handleCountrySelect }) {
  // const handleCountrySelect = (e) => {
  //   const { id, value, checked } = e.target;

  //   console.log(id);
  //   console.log(value);
  //   console.log(checked);
  // }

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