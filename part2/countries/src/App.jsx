import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const apiKey = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    if (!capital) return
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(() => setWeather(null))
  }, [capital, apiKey])

  if (!weather) return null

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {weather.main.temp} Celsius</p>
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
        alt={weather.weather[0].description} 
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

const CountryDetail = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital?.[0]}</p>
    <p>area {country.area}</p>
    <h3>languages:</h3>
    <ul>
      {Object.values(country.languages || {}).map(lang => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>
    <img src={country.flags.png} alt={`flag of ${country.name.common}`} width="150" />
    {country.capital?.[0] && <Weather capital={country.capital[0]} />}
  </div>
)

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filtered = query === ''
    ? []
    : countries.filter(c => c.name.common.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      find countries <input value={query} onChange={e => setQuery(e.target.value)} />
      <div>
        {filtered.length > 10 && <p>Too many matches, specify another filter</p>}
        {filtered.length <= 10 && filtered.length > 1 && (
          filtered.map(c => (
            <div key={c.cca3}>
              {c.name.common} <button onClick={() => setQuery(c.name.common)}>show</button>
            </div>
          ))
        )}
        {filtered.length === 1 && <CountryDetail country={filtered[0]} />}
      </div>
    </div>
  )
}

export default App
