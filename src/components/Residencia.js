import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper } from '@material-ui/core';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import useStyles from '../styles/ResidenciaStyles';

const Residencia = () => {
    const classes = useStyles();
    const { user } = useAuth();
    const [residencyStatus, setResidencyStatus] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log(`Fetching data for user cedula: ${user.cedula}`); // Agrega este log
                const response = await axios.get(`http://localhost:5000/users/${user.cedula}`);
                if (response.data) {
                    setResidencyStatus(response.data.residency);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user.cedula]);

    return (
        <Container component="main" maxWidth="md">
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5" className={classes.title}>
                    Solicitar Residencia
                </Typography>
                <Typography variant="h6" className={classes.subtitle}>
                    Bienvenido, {user.name} ({user.cedula})
                </Typography>
                {residencyStatus ? (
                    <Typography variant="h6" className={classes.subtitle}>
                        Tu residencia ha sido asignada. ¡Bienvenido a tu nuevo hogar!
                    </Typography>
                ) : (
                    <Typography variant="h6" className={classes.subtitle}>
                        Tu solicitud ha sido aprobada, pero aún estás a la espera de la asignación de residencia por parte del supervisor.
                    </Typography>
                )}
            </Paper>
        </Container>
    );
};

export default Residencia;
