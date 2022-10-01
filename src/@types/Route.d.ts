import React from "react";
import RoleProps from "./Role";

export type RouteType = "element" | "nested";

interface RouteProps {
  /** Type of route, boundary or element */
  type: RouteType;
  /** Path to element */
  path: string;
  /** Alternate path when failing authentication */
  alt?: string;
  /** React component for rendering */
  element?: React.ReactComponentElement;
  exact?: boolean;
  /** Allowed auth roles */
  auth?: Array<RoleProps>;
  /** type=nested only => nested routes */
  nested?: Array<Route>;
}

export default RouteProps;
