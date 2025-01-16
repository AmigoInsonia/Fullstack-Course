import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ filteredCountries }) => {

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

	else if(filteredCountries.length == 1) {
		console.log("Only one country, return other stuff!")
		const country = filteredCountries[0]
		console.log(country)
		const flagUrl = country.flags.png
		return (
			<div>
				<h1>{country.name.common}</h1>
				<div>capital {country.capital[0]}</div>
				<div>area {country.area}</div>

				<h2>languages</h2>
				{Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)}
				<img src={flagUrl} />
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