import { useState, useEffect } from 'react'
import CountryList from './Components/CountryList';
import { compare } from './helpers';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const json = await res.json();

        const result = json.map(country => ({
          id: country.name.common,
          name: country.name.common,
          isSelected: false,
          isDisabled: false,
        }));

        setData(result.sort(compare));
      } catch (e) {
        console.log(e);
      }
    })()
  }, []);

  let filteredData = data.filter(item => {
    if (searchTerm === '') {
      return item;
    } else {
      return item.name.toLowerCase().includes(searchTerm)
    }
  });

  console.log(filteredData);

  const handleCountrySelect = (e) => {
    const { id, value, checked } = e.target;

    if (checked) {
      // push selected value in list
      setData(prev => {
        return [
          ...prev.filter(item => item.id === id ? item.isSelected = true : item)
        ]
      });
    } else {
      // remove unchecked value from the list
      setData(prev => {
        return [
          ...prev.filter(item => item.id === id && item.isSelected ? !item.isSelected : item)
        ]
      });
    }
  }

  const handleCountrySearch = (e) => {
    let result = e.target.value.toLowerCase().trim();
    setSearchTerm(result);
  }

  const handleSelectedOnly = (e) => {
    console.log(e);
  }

  const handleSave = (e) => {
    console.log(e);
    alert(JSON.stringify(filteredData, null, 2))
  }

  return (
    <div className="App">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleCountrySearch(e)}
      />
      <div>
        <div>
          <label htmlFor="selectedOnly">
            <input
              type="checkbox"
              id="selectedOnly"
              onChange={e => handleSelectedOnly(e)}
            />
            Show selected only
          </label>

          <button>
            clear all
          </button>
        </div>

        <div style={{ height: '350px', width: '350px', overflow: 'auto' }}>
          <CountryList
            handleCountrySelect={handleCountrySelect}
            data={filteredData}
          />
        </div>

        <button onClick={(e) => handleSave(e)}>
          save
        </button>
      </div>
    </div>
  )
}

export default App
