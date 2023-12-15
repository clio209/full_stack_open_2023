import { useEffect, useState } from "react";
import axios from "axios";

const AllWeather = ({ country }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const api_key = import.meta.env.VITE_API_KEY;
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
        console.log(response.data)
      })
  }
  , [])

  if (weather.length === 0) {
    return (
      <div>
        <p>Weather in {country.capital[0]}</p>
        <p>loading...</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>Weather in {country.capital[0]}</p>
        <p>temperature: {(weather.main.temp - 273.5).toFixed(1)} Celsius</p>
      </div>
    )
  }
}

export default AllWeather;
