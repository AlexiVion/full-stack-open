import { useState, useEffect } from 'react'
import axios from 'axios'

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
          filtered.map(c => <div key={c.cca3}>{c.name.common}</div>)
        )}
        {filtered.length === 1 && (
          <div>
            <h1>{filtered[0].name.common}</h1>
            <p>capital {filtered[0].capital?.[0]}</p>
            <p>area {filtered[0].area}</p>
            <h3>languages:</h3>
            <ul>
              {Object.values(filtered[0].languages || {}).map(lang => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
            <img src={filtered[0].flags.png} alt={`flag of ${filtered[0].name.common}`} width="150" />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
