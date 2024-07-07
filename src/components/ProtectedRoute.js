import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, reverse = false }) => {
    const { isAuthenticated } = useAuth();

    if (reverse) {
        if (isAuthenticated) {
            return <Navigate to="/" />;
        }
    } else {
        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }
    }

    return children;
};

export default ProtectedRoute;
