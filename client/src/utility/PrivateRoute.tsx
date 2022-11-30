import React, { NewLifecycle } from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";

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
