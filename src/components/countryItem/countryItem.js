import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CountryItem = ({ data, tempSign }) => {
  return (
    <div className="card m-2 d-flex">
      <img src={data.flag} className="card-img-top" alt={data.name} />
      <div className="card-body">
        <h5 className="card-title">{data.name}</h5>
        <p className="card-text">{data.capital}</p>
        <p className="card-text">
          Temperature: {data.temp} {tempSign}
        </p>
        <Link to={`/details/${data.alpha2Code}`}>Details</Link>
      </div>
    </div>
  );
};

CountryItem.propTypes = {
  data: PropTypes.shape({
    flag: PropTypes.string,
    name: PropTypes.string,
    capital: PropTypes.string,
    temp: PropTypes.number,
    alpha2Code: PropTypes.string
  }),
  tempSign: PropTypes.element
};

export default CountryItem;
