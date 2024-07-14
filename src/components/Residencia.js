import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Grid, Box } from '@material-ui/core';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import useStyles from '../styles/ResidenciaStyles';

const Residencia = () => {
    const classes = useStyles();
    const { user } = useAuth();
    const [residencyData, setResidencyData] = useState(null);
    const [roommateName, setRoommateName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${user.cedula}`);
                if (response.data) {
                    setResidencyData(response.data);
                    if (response.data.roommate) {
                        fetchRoommateName(response.data.roommate);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchRoommateName = async (roommateCedula) => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${roommateCedula}`);
                if (response.data) {
                    setRoommateName(response.data.name);
                }
            } catch (error) {
                console.error('Error fetching roommate data:', error);
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
                {residencyData ? (
                    residencyData.residency ? (
                        <Box mt={4}>
                            <Typography variant="h6" className={classes.subtitle}>
                                Tu residencia ha sido asignada. ¡Bienvenido a tu nuevo hogar!
                            </Typography>
                            <Grid container spacing={2} className={classes.residencyDetails}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1"><strong>Comportamiento:</strong> {residencyData.behavior}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1"><strong>Número de Dormitorio:</strong> {residencyData.dormitory}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1"><strong>Nota:</strong> {residencyData.note}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1"><strong>Compañero de cuarto:</strong> {roommateName}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    ) : (
                        <Typography variant="h6" className={classes.subtitle}>
                            Tu solicitud ha sido aprobada, pero aún estás a la espera de la asignación de residencia por parte del supervisor.
                        </Typography>
                    )
                ) : (
                    <Typography variant="h6" className={classes.subtitle}>
                        Cargando datos...
                    </Typography>
                )}
            </Paper>
        </Container>
    );
};

export default Residencia;
