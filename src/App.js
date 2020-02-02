import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { checkLocalStorage } from "./store/actions/index";
import Dashboard from "./components/dashboard/dashboard";
import Settings from "./components/setting/setting";
import CountryDetails from "./components/details/countryDetails";

class App extends Component {
  componentDidMount() {
    this.props.checkLocalStorageIfTokenExists();
  }

  render() {
    let routes = null;
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/settings" component={Settings} />
          <Route path="/details/:countryId" component={CountryDetails} />
          <Redirect to="/dashboard" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return routes;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.idToken !== null
  };
};

const mapDispathToProps = dispatch => {
  return {
    checkLocalStorageIfTokenExists: () => dispatch(checkLocalStorage())
  };
};

export default withRouter(connect(mapStateToProps, mapDispathToProps)(App));
