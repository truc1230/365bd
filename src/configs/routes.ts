import { RouteProps } from "@types";
import { Dashboard } from "pages/Dashboard";
import SignInPage from "pages/SignInPage";
import SignUpPage from "pages/SignUpPage";



/**
 * WARNING: never set path as empty string or only slash string '/'
 * For forwarding to default initial page, using default props of Router wrapper
 */
const routes: Array<RouteProps> = [
  {
    path: "/",
    type: "element",
    element: Dashboard,
    auth: ["guest"],
  },
  {
    path: "/login",
    type: "element",
    element: SignInPage,
    auth: ["guest"],
  },
  {
    path: "/register",
    type: "element",
    element: SignUpPage,
    auth: ["guest"],
  },
];

export default routes;
