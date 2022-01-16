import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({handleFilter, newFilter}) => {
  return (
    <div> 
        Filter (case-insensitive): <input value={newFilter} onChange ={handleFilter}/>
    </div>
  )
}
const Weather = ({ weather, city }) => {
  console.log(weather)
  if (!weather) {
    return null
  }

  return (
    <div>
      <h3>Weather in {city}</h3>
      <div>
        <strong>Temperature:</strong> {weather.main.temp} Celcius
      </div>
      <div><strong>Weather description:</strong> {weather.weather[0].description} </div> 
      <div>
        <strong>Wind:</strong> {weather.wind.speed} mph direction {weather.wind.deg}
      </div>
      
    </div>
  )
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const REACT_APP_API_KEY = '3b53c222bcecee6c1ae5770125f8c577'
  const api_key = process.env.REACT_APP_API_KEY
  //const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${REACT_APP_API_KEY}`
  useEffect(() => {
    axios.get(url).then(response => {
      setWeather(response.data)
    })
  }, [url])

  return (
    <div>
      <h2>{country.name.common}</h2>

      <div>capital {country.capital}</div>
      <div>population {country.population}</div>

      <div>
        <h1>Flag</h1>
        {country.flag}
      </div> 
      <Weather weather={weather} city={country.capital} />
    </div>
  )
}

const Countries = ({countries}) => {
  if (countries.length === 1) {
    return(
      <Country country = {countries[0]}/>
    )}
  else if (countries.length < 10) {
  return(
    <div>
      {countries.map(c =>
        <div key={c.alpha2Code}>
          {c.name.common}
          <div>
          <h3>Flag {c.flag}</h3>
          </div> 
        </div>
      )}
    </div>
  )}
  return (
    <div>
      Too many matches, specify another filter
    </div>
  )
}

const App = () => {

  const [countries, setCountries] = useState([]) 
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Countries</h2>
      <Filter 
        handleFilter = {handleFilter}
        newFilter = {newFilter}
      />
      <Countries 
        countries = {filteredCountries} 
        />
    </div>
  )
}

export default App
