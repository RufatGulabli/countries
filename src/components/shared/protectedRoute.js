import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ isAutehticated, component: Component, ...rest }) => {
  console.log(isAutehticated);
  return (
    <Route
      {...rest}
      render={props =>
        isAutehticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
