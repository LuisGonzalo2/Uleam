import React from 'react';
import { Container, Typography, Button, Paper, Grid, Divider } from '@material-ui/core';
import useStyles from '../styles/RequestDetailModalStyles';

const questionsMap = {
    question1: "¿Por qué te gustaría vivir en la residencia universitaria?",
    question2: "¿Cómo contribuirías a la comunidad de la residencia?",
    question3: "¿Tienes alguna necesidad especial que debamos conocer?",
    question4: "¿Cómo planeas equilibrar tus estudios y tu vida en la residencia?",
    question5: "Proporcione cualquier otra información relevante sobre usted."
};

const RequestDetailModal = ({ request, onClose, onStatusChange }) => {
    const classes = useStyles();

    const handleAccept = () => {
        onStatusChange(request.cedula, 'approved');
    };

    const handleReject = () => {
        onStatusChange(request.cedula, 'rejected');
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
                    <Button variant="contained" color="primary" onClick={handleAccept} className={classes.button}>
                        Aceptar
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleReject} className={classes.button}>
                        Rechazar
                    </Button>
                </div>
            </Container>
        </Paper>
    );
};

export default RequestDetailModal;
