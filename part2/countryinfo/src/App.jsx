import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import CountryInformation from './components/CountryInformation'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')
  const [showCountries, setShowCountries] = useState([])

  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountries(response.data)
    })
    .catch(error => {
      console.log(error)
    }
    )
  }, [])

  const filterCountryChange = (event) => {
    setFilterCountry(event.target.value)
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filterCountry.toLowerCase())
  )

  const showCountryInformation = (country) => {
    setShowCountries(prevCountries => [...prevCountries, country])
  }

  const hideCountryInformation = (country) => {
    setShowCountries(prevCountries => prevCountries.filter(prevCountry => prevCountry !== country))
  }

  return (
    <>
      <div>
        find countries <input value={filterCountry} onChange={filterCountryChange} />
      </div>
      <div>
        {filteredCountries.length > 10 ? <p>Too many matches, specify another filter</p> : filteredCountries.map(country => <p key={country.name.common}>{country.name.common}
        {showCountries.includes(country) ?
        <button onClick={() =>{hideCountryInformation(country)}}>
          hide</button> :
        <button onClick={() =>{showCountryInformation(country)}}>
          show</button>
        }
        {showCountries.includes(country) ? <CountryInformation country={country} /> : null}
        </p>)}
        </div>
        {filteredCountries.length === 1 ? 
        <CountryInformation country={filteredCountries[0]} /> : null}
    </>
  )
}

export default App
