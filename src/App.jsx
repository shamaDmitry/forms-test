import { useState, useEffect } from 'react'
import CountryList from './Components/CountryList';
import Search from './Components/Search';
import Filter from './Components/Filter';
import { isSelectedFilter } from './helpers';

function App({ initialData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(initialData);
  const [activeFilter, setActiveFilter] = useState(null);

  const filters = {
    1: 'Show selected only'
  };

  // let filteredData = data.filter(item => {
  //   if (searchTerm === '') {
  //     return item;
  //   } else {
  //     return item.name.toLowerCase().includes(searchTerm)
  //   }
  // });

  const handleCountrySelect = (e) => {
    const { id, value, checked } = e.target;

    if (checked) {
      setData(prevState => {
        return [
          ...prevState.filter(item => item.id === id ? item.isSelected = true : item)
        ]
      });
    } else {
      setData(prevState => {
        return [
          ...prevState,
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

  const onFilter = (e) => {
    console.log('filter', e.target);
    setActiveFilter();
  }

  return (
    <div className="App">
      <Search
        onSearch={e => setSearchTerm(e.target.value)}
      />

      <div>
        {
          Object.entries(filters).map((filter) => {
            return (
              <Filter
                key={filter}
                data={filter}
                onFilter={e => onFilter(e)}
              />
            )
          })
        }

        <div style={{ height: '350px', width: '350px', overflow: 'auto' }}>
          {/* {posts
            ?.filter((el) =>
              el.title
                .toLowerCase()
                .includes(inputValue.toLowerCase()),
            )
            .filter((e) => e.status.includes(activeFilter))
            .map(
              (
                post: { title: string; status: string },
                index: number,
              ) => {
                return (
                  <Card
                    key={index}
                    title={post.title}
                    status={post.status}
                  />
                );
              },
            )} */}

          {/* item.name.toLowerCase().includes(searchTerm) */}

          {data
            ?.filter(item =>
              item.name
                .toLowerCase()
                .includes(
                  searchTerm.toLowerCase()
                ))
            .filter(isSelectedFilter)
            .map((item, index) => {
              return (
                <p key={item.id}>
                  {item.name}
                </p>
              )
              // return (
              //   <CountryList
              //     handleCountrySelect={handleCountrySelect}
              //     data={item}
              //   />
              // )
            })
          }
        </div>

        <button onClick={(e) => handleSave(e)}>
          save
        </button>
      </div>
    </div>
  )
}

export default App
