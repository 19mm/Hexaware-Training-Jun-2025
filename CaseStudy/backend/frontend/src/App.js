import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import CarListingPage from './pages/Cars/CarListingPage';
import CarDetailsPage from './pages/Cars/CarDetailsPage';
import MyBookingsPage from './pages/Booking/MyBookingPage';
import MakeBookingPage from './pages/Booking/MakeBookingPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageCars from './pages/Admin/ManageCars';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageBookings from './pages/Admin/ManageBooking';
import ManagePayments from './pages/Admin/ManagePayments';
import UserProfilePage from './pages/UserProfile/UserProfilePage';
import PaymentPage from './pages/Payments/PaymentPage';
import BrowseCarsPage from './pages/Cars/BrowseCarsPage'; 

import { Segment } from 'semantic-ui-react';

function App() {
  return (
    <Router>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        <Segment style={{ padding: '4.1em 0em', flexGrow: 1, border: 'none', boxShadow: 'none' }} vertical>
          <Routes>
            <Route path="/" element={<CarListingPage />} />
            <Route path="/browse-cars" element={<BrowseCarsPage />} /> 
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cars/:id" element={<CarDetailsPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/make-booking" element={<MakeBookingPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/manage-cars" element={<ManageCars />} />
            <Route path="/admin/manage-users" element={<ManageUsers />} />
            <Route path="/admin/manage-bookings" element={<ManageBookings />} />
            <Route path="/admin/manage-payments" element={<ManagePayments />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </Segment>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
