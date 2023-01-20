import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const json = await res.json();

        const result = json.map(country => ({
          id: Math.random().toString(36).substring(3, 8),
          name: country.name.common,
          isSelected: false,
          isDisabled: false,
        }));

        setData(result);
      } catch (e) {
        console.log(e);
      }
    })()
  }, []);

  const handleCountrySelect = (e) => {
    const id = e.target.id;

    setData(prevState => {
      const target = prevState.filter(item => item.id === id ? item.isSelected = true : null);
      console.log(target);

      return [
        ...target
      ];
    })
  }

  const handleCountrySearch = (e) => {
    setSearchTerm(e.target.value);

    const filtered = !searchTerm
      ? data
      : data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

    console.log(filtered);

    setData(prevState => {
      return [
        ...prevState,
        filtered
      ]
    })
  }

  return (
    <div className="App">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, dolores. Nemo ipsa id, beatae sunt velit voluptatibus quos illo voluptate sequi! Temporibus ex nemo quo in tenetur explicabo velit totam.

      <input type="text" onChange={(e) => handleCountrySearch(e)} />
      <div>
        <div>
          <label htmlFor="selectedOnly">
            <input type="checkbox" name="" id="selectedOnly" />
            Show selected only
          </label>

          <button>
            clear all
          </button>
        </div>

        <div style={{ height: '350px', width: '350px', overflow: 'auto' }}>
          <ul>
            {
              data.map(country => {
                return (
                  <li key={country.id}>
                    <label htmlFor={country.id}>
                      <input
                        type="checkbox"
                        checked={country.isSelected}
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
        </div>

        <button>
          save
        </button>
      </div>
    </div>
  )
}

export default App
