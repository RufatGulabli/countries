import React from "react";
import PropTypes from "prop-types";
import CountryItem from "../countryItem/countryItem";

const CountryList = ({ countries, tempSign }) => {
  const data = countries.map(country => {
    return (
      <CountryItem key={country.name} data={country} tempSign={tempSign} />
    );
  });
  return !data.length ? <p>No any countries. Please add some...</p> : data;
};

CountryList.propTypes = {
  countries: PropTypes.array,
  tempSign: PropTypes.element
};

export default CountryList;
