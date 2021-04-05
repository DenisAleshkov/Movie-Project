import React from "react";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ component: Component, isAuth, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuth || localStorage.getItem("token") ? (
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
  
  export default PublicRoute;