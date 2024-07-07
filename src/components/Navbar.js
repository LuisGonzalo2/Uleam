import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import universityLogo from '../assets/download.png'; // Logo de la universidad

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static" style={{ backgroundColor: user?.isAdmin ? 'darkred' : 'blue' }}>
            <Toolbar>
                <Box display="flex" alignItems="center" flexGrow={1}>
                    <img src={universityLogo} alt="Universidad Laica Eloy Alfaro de Manabí" style={{ width: 50, marginRight: 10 }} />
                    <Typography variant="h6">
                        Residencia Universitaria
                    </Typography>
                </Box>
                {location.pathname !== '/' && (
                    <Button color="inherit" component={Link} to="/">
                        Inicio
                    </Button>
                )}
                {!isAuthenticated && location.pathname !== '/login' && (
                    <Button color="inherit" component={Link} to="/login">
                        Iniciar Sesión
                    </Button>
                )}
                {isAuthenticated && !user?.isAdmin && location.pathname !== '/profile' && (
                    <Button color="inherit" component={Link} to="/profile">
                        Mi Perfil
                    </Button>
                )}
                {isAuthenticated && (
                    <Button color="inherit" onClick={handleLogout}>
                        Cerrar Sesión
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
