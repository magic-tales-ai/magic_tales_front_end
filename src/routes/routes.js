import React from "react";
import { Navigate } from "react-router-dom";

// lazy load all the views
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const SubscriptionPlans = React.lazy(() => import("../pages/SubscriptionPlans"));
const ReadProfiles = React.lazy(() => import("../pages/ReadProfiles"));
const Library = React.lazy(() => import("../pages/Library"));
const Landing = React.lazy(() => import("../pages/Landing"));
const Settings = React.lazy(() => import("../pages/Settings"));

// auth
const Logout = React.lazy(() => import("../pages/Auth/Logout"));

// declare all routes
const authProtectedRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/dashboard", component: <Dashboard />, sidebar: true },
  { path: "/subscription/plans", component: <SubscriptionPlans /> },
  { path: "/profiles", component: <ReadProfiles /> },
  { path: "/library", component: <Library /> },
  { path: "/settings", component: <Settings /> },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/dashboard", component: <Dashboard />, sidebar: true },
  { path: "/subscription/plans", component: <SubscriptionPlans /> },
  {
    path: "/",
    exact: true,
    component: <Landing />,
  },
  { path: "*", component: <Navigate to="/" /> },
];

export { authProtectedRoutes, publicRoutes };
