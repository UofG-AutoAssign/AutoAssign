import React, { NewLifecycle } from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";

// @Todo
// Redirect user away from the page if their user type and JWT don't match
// 1. Simple condition user type check
// 2. Network call with JWT check

type PrivateRouteProps = {
};

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
  const authenticated = true;

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Route>
    </Route>
  );
};

export default PrivateRoute;
