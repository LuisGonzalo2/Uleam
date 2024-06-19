import React from 'react';
import { Container, Typography } from '@material-ui/core';

const Contact = () => {
    return (
        <Container component="main" maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Contacto
            </Typography>
            <Typography variant="body1">
                Aquí va la información de contacto.
            </Typography>
        </Container>
    );
};

export default Contact;
