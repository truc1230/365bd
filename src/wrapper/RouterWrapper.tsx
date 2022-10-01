import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { RoleProps, RouteProps } from "../@types";
import LoadingScreen from "../components/LoadingScreen";




interface PrivateRouteProps {
  auth?: Array<RoleProps>;
  alt?: string;
  children: React.ReactElement;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { alt, children } = props;
  /** Modify this base on user information */
  const isAuth = true;

  return isAuth ? children : <Navigate to={alt || "/"} />;
};

const renderRoute = (route: RouteProps) => {
  const { type: routeType, path, element: Element, nested, auth, alt } = route;
  return (
    <Route
      key={path}
      path={path}
      element={
        <React.Suspense fallback={<LoadingScreen />}>
          <PrivateRoute auth={auth} alt={alt}>
            <Element />
          </PrivateRoute>
        </React.Suspense>
      }
    >
      {routeType === "nested" && nested?.map(renderRoute)}
    </Route>
  );
};

interface RouterProps {
  routes: Array<RouteProps>;
  default: string;
}

const CustomRouter = (props: RouterProps) => {
  const { default: defaultRoute, routes } = props;
  return (
    <Router>
      <Routes>
        {routes.map(renderRoute)}
        <Route path="/*" element={<Navigate to={defaultRoute} />} />
      </Routes>
    </Router>
  );
};

export default CustomRouter;
