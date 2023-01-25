import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { getAllCountries } from './API'
import './style.css'


let data = (function () {
  let countries = localStorage.getItem('countries');

  if (!countries) {
    getAllCountries().then(res => {
      localStorage.setItem('countries', JSON.stringify(res))
    })
  }
  return JSON.parse(countries);

  // return []
})();

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <App initialData={data} />
  // </React.StrictMode>,
)
