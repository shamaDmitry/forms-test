import { useState, useEffect } from 'react'
import Search from './Components/Search';
import Filter from './Components/Filter';
import { FILTER_MAP } from './helpers';
import ListItem from './Components/ListItem';

function App({ initialData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([...initialData]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedData, setSelectedData] = useState([]);

  const onFilter = (event, filterName) => {
    const { checked } = event.target

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

  const handleCountrySelect = (country) => (event) => {
    console.log('render');

    const { id, checked } = event.target;

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

  const handleDisabled = (country) => (event) => {
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
    console.log(e);
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
                  onFilter={event => onFilter(event, filter[0])}
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
                <ListItem
                  key={item.id}
                  item={item}
                  handleCountrySelect={handleCountrySelect}
                  handleDisabled={handleDisabled}
                />
              )
            })
          }
        </div>

        <div style={{ padding: '20px' }}>
          <button
            className='rounded-[50px] px-[25px] py-[8px] bg-red-900 text-white'
            disabled={!selectedData.length}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
