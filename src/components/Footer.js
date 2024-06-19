import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Footer = () => {
    return (
        <AppBar position="static" style={{ marginTop: 'auto' }}>
            <Toolbar>
                <Typography variant="body1" color="inherit">
                    &copy; 2024 Residencia Universitaria Uleam. Todos los derechos reservados.
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
