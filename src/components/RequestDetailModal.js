import React from 'react';
import { Container, Typography, Button, Paper, Grid } from '@material-ui/core';
import useStyles from '../styles/RequestDetailModalStyles';

const RequestDetailModal = ({ request, onClose }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Container>
                <Typography variant="h5" gutterBottom>
                    Detalles de Solicitud
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Nombre:</Typography>
                        <Typography>{request.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Cédula:</Typography>
                        <Typography>{request.cedula}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Preguntas y Respuestas:</Typography>
                        {Object.entries(request.questions).map(([key, value]) => (
                            <div key={key} className={classes.questionContainer}>
                                <Typography className={classes.question}>{key}:</Typography>
                                <Typography className={classes.answer}>{value}</Typography>
                            </div>
                        ))}
                    </Grid>
                </Grid>
                <div className={classes.actions}>
                    <Button variant="contained" color="primary" onClick={() => onClose('approved')}>
                        Aceptar
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => onClose('rejected')}>
                        Rechazar
                    </Button>
                </div>
            </Container>
        </Paper>
    );
};

export default RequestDetailModal;
