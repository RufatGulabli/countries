import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  findCountry,
  initCountries,
  logoutStart
} from "../../store/actions/index";
import CountryList from "../countriesList/countryList";
import {
  Temperature,
  convertKelVinToCelsius,
  convertKelvinToFahrenheit,
  CELSIUS,
  FAHRENHEIT,
  KELVIN
} from "../../util/utility";

class Dashboard extends Component {
  state = {
    country: "",
    choosenTemp: +this.props.defaultTemp,
    error: null
  };

  componentDidMount() {
    this.props.initCountries();
  }

  onInputChange = e => {
    this.setState({ country: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const searchValue = this.state.country.toUpperCase();
    const countryExists = this.props.countries.filter(country =>
      country.alpha2Code === searchValue || country.alpha3Code === searchValue
        ? true
        : false
    );
    if (!countryExists.length) {
      this.props.addCountry(this.state.country);
      this.setState({ error: null, country: "" });
    } else {
      this.setState({
        error: "Country already exists in the list.",
        country: ""
      });
    }
  };

  onRadioChange = e => {
    this.setState({ choosenTemp: +e.target.value });
  };

  onLogout = () => {
    this.props.logout();
    this.props.history.replace("/");
  };

  render() {
    const { choosenTemp } = this.state;

    const error =
      this.state.error || this.props.error ? (
        <div class="alert alert-danger" role="alert">
          {this.state.error || this.props.error}
        </div>
      ) : null;

    const updateCountries = this.props.countries.map(c => {
      if (choosenTemp === Temperature.CELSIUS) {
        return {
          ...c,
          temp: Math.round(+convertKelVinToCelsius(c.temp))
        };
      } else if (+choosenTemp === +Temperature.FAHRENHEIT) {
        return {
          ...c,
          temp: Math.round(+convertKelvinToFahrenheit(c.temp))
        };
      }
      return c;
    });

    let radios = [];
    Object.keys(Temperature).forEach(key => {
      radios.push(
        <div
          key={key}
          className="custom-control custom-radio custom-control-inline mb-1"
        >
          <input
            id={Temperature[key]}
            type="radio"
            name="temp"
            value={Temperature[key]}
            className="custom-control-input"
            onChange={this.onRadioChange}
            checked={this.state.choosenTemp === Temperature[key]}
          />
          <label className="custom-control-label" htmlFor={Temperature[key]}>
            {key}
          </label>
        </div>
      );
    });

    let tempSign = Temperature.CELSIUS;
    if (+choosenTemp === Temperature.CELSIUS) {
      tempSign = CELSIUS;
    } else if (+choosenTemp === Temperature.FAHRENHEIT) {
      tempSign = FAHRENHEIT;
    } else {
      tempSign = KELVIN;
    }

    return (
      <div className="col-8 offset-2">
        <div className="d-flex justify-content-between align-items-center m-3">
          <div>
            <h3 className="">Dashboard</h3>
          </div>
          <div className="d-flex justify-content-end">
            <NavLink to="/settings" className="btn mr-2 btn-outline-dark">
              Settings
            </NavLink>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={this.onLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div>
          {error}
          <form className="d-flex" onSubmit={this.onSubmit}>
            <input
              type="text"
              className="form-control w-50"
              placeholder="Type the name of the country"
              onChange={this.onInputChange}
              value={this.state.country}
            />
            <button className="btn btn-outline-success ml-1 mb-2">
              Search
            </button>
          </form>
          <i className="mr-2">Temperature Display Options:</i>
          {radios}
        </div>
        <div
          className="col-12 m-4"
          style={{
            display: "grid",
            gridTemplateColumns: "33.33% 33.33% 33.33%"
          }}
        >
          <CountryList countries={updateCountries} tempSign={tempSign} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    countries: state.countryReducer.countries,
    defaultTemp: state.authReducer.defaultTemp,
    error: state.countryReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCountry: alphaCode => dispatch(findCountry(alphaCode)),
    initCountries: () => dispatch(initCountries()),
    logout: () => dispatch(logoutStart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
