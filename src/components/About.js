import React from 'react';
import { Container, Typography } from '@material-ui/core';

const About = () => {
    return (
        <Container component="main" maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Sobre Nosotros
            </Typography>
            <Typography variant="body1">
                Aquí va la información sobre la residencia universitaria.
            </Typography>
        </Container>
    );
};

export default About;
