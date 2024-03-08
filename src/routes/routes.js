import React from "react";
import { Navigate } from "react-router-dom";

// lazy load all the views
const Dashboard = React.lazy(() => import("../pages/dashboard/index"));
const SuscriptionPlans = React.lazy(() => import("../pages/SuscriptionPlans/index"));
const ReadProfiles = React.lazy(() => import("../pages/ReadProfiles/index"));
const Library = React.lazy(() => import("../pages/Library/index"));

// auth
const Logout = React.lazy(() => import("../pages/Auth/Logout"));

// declare all routes
const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard />, sidebar: true },
  { path: "/subscription/plans", component: <SuscriptionPlans /> },
  { path: "/profiles", component: <ReadProfiles /> },
  { path: "/library", component: <Library /> },

    // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  ...authProtectedRoutes
];

export { authProtectedRoutes, publicRoutes };
