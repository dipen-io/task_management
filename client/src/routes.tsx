import { LandingPage } from "./pages/LandingPage";
import { createBrowserRouter, Navigate } from "react-router";
import { NotFound } from "./pages/NotFoundPage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { Home } from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

import { AllTasks } from "./components/FetchTaskByAdmin";
import { DashboardLayout } from "./components/DashboardLayout";
import { AdminDashboard } from "./components/AdminDashborad";
import { EmployeeDashbaord } from "./components/EmployeeDashboard";
import { SingleTask } from "./components/SingleTask";
import { EmployeeTask } from "./components/EmployeeTasks";

export const router = createBrowserRouter([
    {
        path: '/',
        //  ProtectedRoute
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        )
    },
    // --- ADMIN ROUTES ---
    {
        path: '/admin',
        element: (
            <ProtectedRoute>
                <DashboardLayout user="Admin" />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            { path: 'dashboard', element: <AdminDashboard /> },
            { path: 'tasks', element: <AllTasks /> },
        ]
    },
    {
        path: '/admin/task/:id',
        element: (
            <ProtectedRoute>
                <SingleTask />
            </ProtectedRoute>
        )
    },
    // --- EMPLOYEE ROUTES ---
    {
        path: '/employee',
        element: (
            <ProtectedRoute>
                <DashboardLayout user="Employee" />
            </ProtectedRoute>
        ),
        children: [
            { path: 'dashboard', element: <EmployeeDashbaord /> },
            { path: 'tasks', element: <EmployeeTask /> },
            // Add other employee views here
        ]
    },
    {
        path: '/landing',
        element: (
            <LandingPage />
        )
    },
    {
        path: '/signup',
        element: (
            <SignupPage />
        )
    },
    {
        path: '/login',

        element: (
            < LoginPage />
        )
    },
    {
        path: '*',
        Component: NotFound
    }
]);
