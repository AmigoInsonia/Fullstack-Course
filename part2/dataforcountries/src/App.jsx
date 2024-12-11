import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    console.log('fetching all countries from server')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data)
        console.log("Countries got!")

      })
  }, [])

  const handleChange = (event) => {
    const filterToUse = event.target.value
    if(filterToUse.length == 0){
      setFilteredCountries([])
    } else {
      const countries = allCountries.filter(({name}) => name.common.toLowerCase().search(filterToUse.toLowerCase()) != -1)
      setFilteredCountries(countries)
    }

  }


  return (
    <div>
        find countries: <input onChange={handleChange} />
      <Countries filteredCountries={filteredCountries} />
    </div>
  )
}

export default App