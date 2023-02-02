import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { getAllCountries } from './API'
import 'virtual:fonts.css'
import './style.css'

let data = async function () {
  let countries = localStorage.getItem('countries');

  if (!countries) {
    const res = await getAllCountries();
    localStorage.setItem('countries', JSON.stringify(res))
    let countries = localStorage.getItem('countries');

    return JSON.parse(countries)
  }

  return JSON.parse(countries)
};

data().then(res => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App initialData={res} />
    </React.StrictMode>,
  )
})