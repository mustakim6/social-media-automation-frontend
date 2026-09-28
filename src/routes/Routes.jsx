import { createBrowserRouter } from "react-router-dom";

// Public Pages
import Home from "../pages/Home.jsx";
import LogIn from "../pages/LogIn.jsx";
import Register from "../pages/Register.jsx";
import PrivacyPolicy from "../pages/PrivacyPolicy.jsx";
import DataDeletion from "../pages/DataDeletion.jsx";

// Protected Pages
import Dashboard from "../pages/Dashboard.jsx";
import Pages from "../pages/Pages.jsx";
import Automations from "../pages/Automations.jsx";
import History from "../pages/History.jsx";
import Posts from "../pages/Posts.jsx";
import Schedule from "../pages/Schedule.jsx";
import Settings from "../pages/Settings.jsx";

// Route Guards
import PublicRoute from "./PublicRoute.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

// Layouts
import PublicLayout from "../components/PublicLayout.jsx";
import DashboardLayout from "../components/DashboardLayout.jsx";

const routes = [
    // =====================================================
    // Public Routes
    // =====================================================

    {
        element: <PublicLayout />,
        children: [
            // Home
            {
                path: "/",
                element: <Home />,
            },

            // Authentication Routes
            {
                element: <PublicRoute />,
                children: [
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

            // Legal Routes
            {
                path: "/privacy-policy",
                element: <PrivacyPolicy />,
            },
            {
                path: "/data-deletion",
                element: <DataDeletion />,
            },
        ],
    },

    // =====================================================
    // Protected Routes
    // =====================================================

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