import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin }) => {
    const { isAuthenticated, user } = useSelector((state) => state.user);

    if (isAuthenticated && (isAdmin === true && user.role !== "Admin")) {
        return <Outlet />
    }
    else if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    else {
        return <Outlet />
    }

};

export default ProtectedRoute;