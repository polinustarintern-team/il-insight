import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Jika tidak ada token, redirect ke login
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Jika ada role restriction dan user tidak memiliki role yang diizinkan
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Redirect ke dashboard sesuai role user
        if (user.role === 'admin') {
            return <Navigate to="/admin/dashboard" replace />;
        } else if (user.role === 'mentor') {
            return <Navigate to="/user/dashboard" replace />;
        } else if (user.role === 'manajemen') {
            return <Navigate to="/management/dashboard" replace />;
        }
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
