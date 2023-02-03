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
    alert(JSON.stringify(selectedData, null, 2))
  }

  return (
    <div className="w-full border border-[#E1E3E6] rounded-[14px] my-8 mx-auto p-[20px] shadow-lg max-w-[490px] max-[580px]:max-w-[90%]">
      <Search
        value={searchTerm}
        onSearch={e => setSearchTerm(e.target.value)}
      />

      <div className="flex justify-between items-center mb-[10px]">
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

        <button
          className="text-[#232323] leading-[22px] font-medium focus:outline-none"
          onClick={onClearAll}
        >
          Clear all
        </button>
      </div>

      <div className="h-[252px] relative overflow-y-auto">
        <div className="pt-[10px] pb-[15px] absolute left-0 top-0 h-full w-full">
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
      </div>

      <div className="flex justify-end mt-[10px] pt-[20px] border-t border-[#ECECEC]">
        <button
          className='rounded-[50px] px-[25px] py-[8px] bg-[#60D09B] text-white leading-[22px] -tracking-[0.5px] disabled:cur disabled:opacity-50'
          disabled={!selectedData.length}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default App