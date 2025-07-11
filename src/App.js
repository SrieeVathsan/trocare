import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import Upload from './components/Upload'; // File upload page
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const isAuthenticated = !!document.cookie.includes('jwt'); // Simple cookie check

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/upload"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h2>404 - Page not found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;