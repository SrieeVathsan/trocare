import React from 'react';
import { Navigate } from 'react-router-dom';

function isAuthenticated() {
  return document.cookie.includes('jwt') || localStorage.getItem('token');
}

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;