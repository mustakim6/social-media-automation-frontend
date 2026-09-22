
import { createBrowserRouter, Navigate } from "react-router-dom";

import LogIn from "../pages/LogIn.jsx";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";
import DashboardLayout from "../components/DashboardLayout.jsx";
import Pages from "../pages/Pages.jsx";
import Posts from "../pages/Posts.jsx";
import Schedule from "../pages/Schedule.jsx";
import Settings from "../pages/Settings.jsx";
import Automations from "../pages/Automations.jsx";
import History from "../pages/History.jsx";

const routes = [
  

  // Public Routes
  {
    path:"/",
    element: <PublicRoute />,
    children: [
      {
    index: true,
    element: <Navigate to="/login" replace />,
},
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  // Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
  element: <DashboardLayout />,
  children: [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/pages",
      element: <Pages />,
    },
    {
    path: "/automations",
    element: <Automations />,
},
{
    path: "/history",
    element: <History />,
},
    {
      path: "/posts",
      element: <Posts />,
    },
    {
      path: "/schedule",
      element: <Schedule />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
  ],
},
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;

