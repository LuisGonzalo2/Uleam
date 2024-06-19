import React from 'react';
import { Container, Typography } from '@material-ui/core';

const Services = () => {
    return (
        <Container component="main" maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Servicios
            </Typography>
            <Typography variant="body1">
                Aquí va la información sobre los servicios que ofrecemos.
            </Typography>
        </Container>
    );
};

export default Services;

