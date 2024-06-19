import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Container component="main" maxWidth="lg">
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <Typography variant="h4">Bienvenido a la Residencia Universitaria</Typography>
                <Grid container spacing={3} justifyContent="center" style={{ marginTop: '2rem' }}>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={() => navigate('profile')}>
                            Perfil
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={handleLogout}>
                            Cerrar Sesión
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Home;
