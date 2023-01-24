import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { getAllCountries } from './API'
let data = (function () {
  let countries = localStorage.getItem('countries');

  if (!countries) {
    getAllCountries().then(res => {
      localStorage.setItem('countries', JSON.stringify(res))
    })
  }
  return JSON.parse(countries);
})();

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <App initialData={data} />
  // </React.StrictMode>,
)
