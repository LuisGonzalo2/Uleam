import React from 'react';
import { Container, Typography } from '@material-ui/core';

const Profile = () => {
    return (
        <Container component="main" maxWidth="sm">
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <Typography variant="h4">Perfil del Usuario</Typography>
                <Typography variant="body1" style={{ marginTop: '1rem' }}>
                    Información del usuario...
                </Typography>
            </div>
        </Container>
    );
};

export default Profile;
