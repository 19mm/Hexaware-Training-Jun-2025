import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './Register';
import BookList from './BookList';
import BookForm from './BookForm';
import BookDetails from './BookDetails';
import './App.css';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/books"
          element={token ? <BookList /> : <Navigate to="/login" />}
        />
        <Route
          path="/books/add"
          element={token ? <BookForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/books/edit/:isbn"
          element={token ? <BookForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/books/:isbn"
          element={token ? <BookDetails /> : <Navigate to="/login" />}
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to={token ? "/books" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;