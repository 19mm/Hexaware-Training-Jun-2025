import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Books from '../pages/Books';
import BookEdit from '../pages/BookEdit';
import BookDetails from '../components/Book/BookDetails';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/books"
          element={
            <RequireAuth>
              <Books />
            </RequireAuth>
          }
        />
        <Route
          path="/books/:isbn"
          element={
            <RequireAuth>
              <BookDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/edit"
          element={
            <RequireAuth>
              <BookEdit />
            </RequireAuth>
          }
        />
        <Route
          path="/edit/:isbn"
          element={
            <RequireAuth>
              <BookEdit />
            </RequireAuth>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;