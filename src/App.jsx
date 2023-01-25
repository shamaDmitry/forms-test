import { useState } from 'react'
import Search from './Components/Search';
import Filter from './Components/Filter';
import { FILTER_MAP } from './helpers';

function App({ initialData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([...initialData]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedData, setSelectedData] = useState([]);

  const onFilter = (e, filterName) => {
    const { checked } = e.target

    if (checked && filterName === 'selectedOnly') {
      setActiveFilter('selectedOnly')
    } else {
      setActiveFilter('all')
    }
  }

  const onClearAll = () => {
    setSearchTerm('');
    setActiveFilter('all');
    setSelectedData([]);
    setData(prevState => {
      return [
        ...prevState.map(item => {
          return {
            ...item,
            isSelected: false,
            isDisabled: false,
          }
        })
      ]
    })
  }

  const handleCountrySelect = (e, country) => {
    const { id, checked } = e.target;

    if (checked) {
      setData(prevState => {
        return [
          ...prevState.filter(item => item.id === id ? item.isSelected = true : item)
        ];
      });

      setSelectedData(prevState => {
        return [
          ...prevState,
          country
        ]
      })
    } else {
      setData(prevState => {
        const newState = prevState.map(item => {
          if (item.id === id && item.isSelected) {
            return {
              ...item,
              isSelected: !item.isSelected
            }
          }

          return item;
        })

        return newState;
      });

      setSelectedData(prevState => {
        return [
          ...prevState.filter(item => item.id !== country.id),
        ]
      })
    }
  }

  const handleDisabled = (e, country) => {
    setData(prevState => {
      return [
        ...prevState.map(item => {
          if (item.id === country.id) {
            return {
              ...item,
              isDisabled: !item.isDisabled
            }
          } else {
            return item
          }
        })
      ]
    });

    setSelectedData(prevState => {
      return [
        ...prevState.map(item => {
          if (item.id === country.id) {
            return {
              ...item,
              isDisabled: !item.isDisabled
            }
          } else {
            return item
          }
        })
      ]
    })
  }

  const handleSave = (e) => {
    alert(JSON.stringify(selectedData, null, 2))
  }

  return (
    <div className="App" style={{ maxWidth: '300px', margin: '0 auto' }}>
      <Search
        value={searchTerm}
        onSearch={e => setSearchTerm(e.target.value)}
      />

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {
            Object.entries(FILTER_MAP).filter(item => item[0] !== 'all').map((filter) => {
              return (
                <Filter
                  key={filter}
                  data={filter}
                  activeFilter={activeFilter}
                  onFilter={e => onFilter(e, filter[0])}
                />
              )
            })
          }

          <button onClick={onClearAll}>
            clear all
          </button>
        </div>

        <div style={{ height: '350px', overflow: 'auto' }}>
          {data
            ?.filter(item =>
              item.name
                .toLowerCase()
                .includes(
                  searchTerm.toLowerCase()
                ))
            .filter(FILTER_MAP[activeFilter])
            .map(item => {
              return (
                <label
                  key={item.id}
                  htmlFor={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '15px',
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
                    onChange={(e) => handleCountrySelect(e, item)}
                  />
                  {item.name}

                  <button
                    style={{ marginLeft: 'auto' }}
                    onClick={e => handleDisabled(e, item)}
                  >
                    {item.isDisabled ? 'Enable' : 'Disable'}
                  </button>
                </label>
              )
            })
          }
        </div>

        <div style={{ padding: '20px' }}>
          <button
            disabled={!selectedData.length}
            onClick={(e) => handleSave(e)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
