import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import universityLogo from '../assets/download.png'; // Logo de la universidad

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box display="flex" alignItems="center" flexGrow={1}>
                    <img src={universityLogo} alt="Universidad Laica Eloy Alfaro de Manabí" style={{ width: 50, marginRight: 10 }} />
                    <Typography variant="h6">
                        Residencia Universitaria
                    </Typography>
                </Box>
                {!isAuthenticated && (
                    <>
                        <Button color="inherit" component={Link} to="/login">
                            Iniciar Sesión
                        </Button>
                    </>
                )}
                {isAuthenticated && (
                    <>
                        <Button color="inherit" component={Link} to="/home/profile">
                            Perfil
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
                            Cerrar Sesión
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
