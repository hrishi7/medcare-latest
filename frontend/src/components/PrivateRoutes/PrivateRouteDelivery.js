import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouteDelivery = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.auth);
  let isAuthenticated =
    auth.isAuthenticated && auth.user.role === "deliveryperson" ? true : false;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRouteDelivery;
