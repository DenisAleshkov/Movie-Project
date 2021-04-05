import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth || localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/auth" />
      )
    }
  />
);

export default PrivateRoute;
