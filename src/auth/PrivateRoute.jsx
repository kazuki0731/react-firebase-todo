import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../contexts/AuthProvider";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to="/login" />
  );
};
