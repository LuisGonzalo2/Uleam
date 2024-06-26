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
import PrivateRoute from './components/PrivateRoute';

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
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/apply" element={<Apply />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/home" element={<PrivateRoute />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
