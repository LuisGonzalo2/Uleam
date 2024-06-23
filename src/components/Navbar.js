import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AccountCircle from '@material-ui/icons/AccountCircle';
import universityLogo from '../assets/download.png'; // Logo de la universidad

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        logout();
        navigate('/login');
    };

    const handleProfile = () => {
        handleClose();
        navigate('/profile');
    };

    const handleResidence = () => {
        handleClose();
        navigate('/residence');
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
                {location.pathname === '/login' ? (
                    <Button color="inherit" component={Link} to="/">
                        Inicio
                    </Button>
                ) : (
                    !isAuthenticated && (
                        <Button color="inherit" component={Link} to="/login">
                            Iniciar Sesión
                        </Button>
                    )
                )}
                {isAuthenticated && user && (
                    <>
                        <Typography variant="body1" style={{ marginRight: '10px' }}>
                            {user.name}
                        </Typography>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleProfile}>Perfil</MenuItem>
                            <MenuItem onClick={handleResidence}>Residencia</MenuItem>
                            <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
