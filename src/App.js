import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Welcome from './components/Welcome';
import Apply from "./components/Apply";
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import Requests from './components/Requests';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

const App = () => {
    return (
        <Router>
            <CssBaseline />
            <Navbar />
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={
                    <ProtectedRoute>
                        <Register />
                    </ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/apply" element={
                    <ProtectedRoute>
                        <Apply />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="/admin" element={
                    <AdminRoute>
                        <AdminPanel />
                    </AdminRoute>
                } />
                <Route path="/requests" element={
                    <AdminRoute>
                        <Requests />
                    </AdminRoute>
                } />
                <Route path="/home" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
};

export default App;
