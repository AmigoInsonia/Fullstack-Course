import { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const Countries = ({ filteredCountries }) => {
		const [weather, setWeather] = useState(null)
		const country = filteredCountries[0]
		useEffect(() => {
		if(filteredCountries.length == 1) {
		    console.log('fetching weather')
		    axios
		      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`)
		      .then(response => {
		        console.log("Weather Got!")
			    setWeather(response.data)
			    console.log(weather)
		      })
		  }
	  }, [filteredCountries])


	function showCountry(countryID) {
		var country = document.getElementById(countryID)
		if (country.style.display === "none") {
			country.style.display = "block";
		}
		else {
			country.style.display = "none";
		}
	}

	if (filteredCountries.length === 0) {
		console.log("Countries is null!")
		return null
	}

	if(filteredCountries.length == 1) {
		console.log("Only one country, return other stuff!")
		const country = filteredCountries[0]
		console.log(country)
		const flagUrl = country.flags.png
		if (weather)
			return (
				<div>
					<h1>{country.name.common}</h1>
					<div>capital {country.capital[0]}</div>
					<div>area {country.area}</div>

					<h2>languages</h2>
					{Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)}
					<img src={flagUrl} />
					<h1>Weather in {country.capital[0]}</h1>
					<div>temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</div>
					<img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
					<div>wind {weather.wind.speed} m/s</div>

				</div>
			)
	}

	else if (filteredCountries.length > 10) {
		console.log("Countries is bigger than 10!")
		return (
			<div>
				Too Many Countries!
			</div>
		)
	}


	else if (filteredCountries.length > 1) {
		console.log("Countries is normal, printing!")
		console.log(filteredCountries)
		return (
			<div>
				{filteredCountries.map((filteredCountries) => 
					<div>
						<div key={filteredCountries.name.common}>{filteredCountries.name.common}
							<button onClick={() => showCountry(filteredCountries.name.common)}>
						      show
						    </button>
						</div>

					    <div id={filteredCountries.name.common} style={{display:"none"}}>
					            <div>capital {filteredCountries.capital[0]}</div>
								<div>area {filteredCountries.area}</div>

								<h2>languages</h2>
								{Object.entries(filteredCountries.languages).map(([key, value]) => <li key={key}>{value}</li>)}
								<img src={filteredCountries.flags.png} />
					    </div>					    
					</div>
					)}					
			</div>
		)
	}


}

export default Countries