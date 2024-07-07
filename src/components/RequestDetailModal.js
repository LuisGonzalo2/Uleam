import React, { useState } from 'react';
import { Container, Typography, Button, Paper, Grid, Divider, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import useStyles from '../styles/RequestDetailModalStyles';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const questionsMap = {
    question1: "¿Por qué te gustaría vivir en la residencia universitaria?",
    question2: "¿Cómo contribuirías a la comunidad de la residencia?",
    question3: "¿Tienes alguna necesidad especial que debamos conocer?",
    question4: "¿Cómo planeas equilibrar tus estudios y tu vida en la residencia?",
    question5: "Proporcione cualquier otra información relevante sobre usted."
};

const RequestDetailModal = ({ request, onClose, onUpdate }) => {
    const classes = useStyles();
    const [alert, setAlert] = useState({ open: false, severity: '', message: '' });

    const handleDecision = async (status) => {
        try {
            await axios.put(`http://localhost:5000/questions/${request.cedula}`, { status });
            setAlert({
                open: true,
                severity: 'success',
                message: `Solicitud ${status === 'approved' ? 'aprobada' : 'rechazada'} con éxito.`
            });
            setTimeout(() => {
                setAlert({ open: false, severity: '', message: '' });
                onUpdate(request.cedula);
                onClose();
            }, 2000); // Ajuste el tiempo según sea necesario
        } catch (error) {
            console.error('Error updating request status:', error);
            setAlert({
                open: true,
                severity: 'error',
                message: 'Error al actualizar la solicitud.'
            });
        }
    };

    const handleCloseAlert = () => {
        setAlert({ open: false, severity: '', message: '' });
        onClose(); // Cerrar modal al cerrar la alerta manualmente
    };

    return (
        <Paper className={classes.paper}>
            <Container>
                <Typography variant="h5" gutterBottom className={classes.header}>
                    Detalles de Solicitud
                </Typography>
                <Divider className={classes.divider} />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" className={classes.fieldLabel}>Nombre:</Typography>
                        <Typography className={classes.fieldValue}>{request.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" className={classes.fieldLabel}>Cédula:</Typography>
                        <Typography className={classes.fieldValue}>{request.cedula}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" className={classes.fieldLabel}>Preguntas y Respuestas:</Typography>
                        {Object.entries(request.questions).map(([key, value]) => (
                            <div key={key} className={classes.questionContainer}>
                                <Typography className={classes.question}>{questionsMap[key]}</Typography>
                                <Typography className={classes.answer}>{value}</Typography>
                                <Divider className={classes.answerDivider} />
                            </div>
                        ))}
                    </Grid>
                </Grid>
                <div className={classes.actions}>
                    <Button variant="contained" color="primary" onClick={() => handleDecision('approved')} className={classes.button}>
                        Aceptar
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDecision('rejected')} className={classes.button}>
                        Rechazar
                    </Button>
                </div>
            </Container>
            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default RequestDetailModal;
