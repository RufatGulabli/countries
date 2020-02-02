import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  Temperature,
  CELSIUS,
  FAHRENHEIT,
  KELVIN,
  convertKelVinToCelsius,
  convertKelvinToFahrenheit
} from "../../util/utility";

const CountryDetails = ({ countries, match, defaultTemp }) => {
  const country = countries.filter(
    c => c.alpha2Code === match.params.countryId
  )[0];
  console.log(country);
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "20% 80%",
    wordWrap: "break-word"
  };

  let tempSign = KELVIN;

  if (+defaultTemp === Temperature.CELSIUS) {
    tempSign = CELSIUS;
    country.temp = Math.round(+convertKelVinToCelsius(country.temp));
  } else if (+defaultTemp === Temperature.FAHRENHEIT) {
    tempSign = FAHRENHEIT;
    country.temp = Math.round(+convertKelvinToFahrenheit(country.temp));
  }

  let html = (
    <div className="col-4 offset-4 mt-4 rounded border p-4 shadow p-3 mb-5 bg-white rounded">
      <p>No any countries exists.</p>
      <Link to="/dashboard" className="btn btn-outline-primary">
        Back
      </Link>
    </div>
  );

  if (country) {
    html = (
      <div className="col-4 offset-4 mt-4 rounded border p-4 shadow p-3 mb-5 bg-white rounded">
        <div style={gridStyle}>
          <p>Flag: </p>
          <img
            src={country.flag}
            style={{ maxHeight: "60px", maxWidth: "200px" }}
            alt={country.name}
          />
        </div>
        <div style={gridStyle}>
          <p>Name: </p>
          <p>{country.name}</p>
        </div>
        <div style={gridStyle}>
          <p>Region: </p>
          <p>{country.region}</p>
        </div>
        <div style={gridStyle}>
          <p>Capital: </p>
          <p>
            {country.capital} | <i>Temperature: {country.temp}</i> {tempSign}
          </p>
        </div>
        <div style={gridStyle}>
          <p>Population: </p>
          <p>{country.population}</p>
        </div>
        <div style={gridStyle}>
          <p>Currency: </p>
          <p>
            {country.currency ? country.currency.code : null},
            {country.currency ? country.currency.name : null}
          </p>
        </div>
        <div style={gridStyle}>
          <p>Borders: </p>
          <p>
            {country.borders && country.borders.length
              ? country.borders.toString()
              : "No any country."}
          </p>
        </div>
        <NavLink to="/dashboard" className="btn btn-outline-primary">
          Back
        </NavLink>
      </div>
    );
  }

  return html;
};

const mapStateToProps = state => {
  return {
    countries: state.countryReducer.countries,
    defaultTemp: state.authReducer.defaultTemp
  };
};

export default connect(mapStateToProps)(CountryDetails);
