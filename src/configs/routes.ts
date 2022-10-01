import { RouteProps } from "../@types";
import { Dashboard } from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";


/**
 * WARNING: never set path as empty string or only slash string '/'
 * For forwarding to default initial page, using default props of Router wrapper
 */
const routes: Array<RouteProps> = [
  {
    path: "/",
    type: "element",
    element: LoginPage,
    auth: ["guest"],
  },
  {
    path: "/dashboard",
    type: "element",
    element: Dashboard,
    auth: ["guest"],
  }
];

export default routes;
