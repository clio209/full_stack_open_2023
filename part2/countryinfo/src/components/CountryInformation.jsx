import React from "react";
import AllWeather from "./AllWeather";

const CountryInformation = ({ country }) => {
  return (
    <div>
      {country &&
          <div key={country.name.common}>
            <h3>capital {country.capital} <br />
            population {country.population} <br />
            area {country.area} km²
            </h3>
            <h2>languages</h2>
            <ul>
              {Object.values(country.languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img
              src={country.flags.png}
              alt={country.name.common}
              width="200"
              height="100"
            />
            <AllWeather country={country} />
          </div>
      }
    </div>
  );
};

export default CountryInformation;
