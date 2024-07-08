import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Grid, Button, Snackbar } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import MuiAlert from '@material-ui/lab/Alert';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import useStyles from '../styles/ApplyStyles';
import CreditCardModal from './CreditCardModal';

const validationSchema = Yup.object({
    question1: Yup.string().required('Campo requerido'),
    question2: Yup.string().required('Campo requerido'),
    question3: Yup.string().required('Campo requerido'),
    question4: Yup.string().required('Campo requerido'),
    question5: Yup.string().required('Campo requerido'),
});

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Apply = () => {
    const classes = useStyles();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [alert, setAlert] = useState({ open: false, severity: '', message: '' });
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [isCardEntered, setIsCardEntered] = useState(false);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/questions/${user.cedula}`);
                if (response.data) {
                    setFormData(response.data.questions);
                    setStatus(response.data.status);
                }
            } catch (error) {
                console.error('Error fetching status:', error);
            }
        };

        fetchStatus();
    }, [user.cedula]);

    const handleOpenCardModal = () => {
        setIsCardModalOpen(true);
    };

    const handleCloseCardModal = () => {
        setIsCardModalOpen(false);
    };

    const handleCardSubmit = (cardData) => {
        console.log('Card Data:', cardData);
        setIsCardEntered(true);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        setIsLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/questions`, {
                name: user.name,
                cedula: user.cedula,
                questions: values,
                status: 'pending'
            });
            setAlert({ open: true, severity: 'success', message: 'Solicitud enviada con éxito' });
            setStatus('pending');
        } catch (error) {
            console.error('Error submitting application:', error);
            setAlert({ open: true, severity: 'error', message: 'Error enviando la solicitud' });
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    const handleReapply = () => {
        setStatus('');
        setFormData({
            question1: '',
            question2: '',
            question3: '',
            question4: '',
            question5: '',
        });
    };

    const handleCloseAlert = () => {
        setAlert({ open: false, severity: '', message: '' });
    };

    return (
        <Container component="main" maxWidth="md">
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5" className={classes.title}>
                    Solicitar Residencia
                </Typography>
                <Typography variant="h6" className={classes.subtitle}>
                    Bienvenido, {user.name} ({user.cedula})
                </Typography>
                {status === 'pending' ? (
                    <Typography variant="h6" className={classes.subtitle}>
                        Tu solicitud está en proceso de aprobación.
                    </Typography>
                ) : status === 'approved' ? (
                    <>
                        <Typography variant="h6" className={classes.subtitle}>
                            Tu solicitud ha sido aprobada.
                        </Typography>
                        <Button variant="contained" color="primary" href="/residencia">
                            Residencia
                        </Button>
                    </>
                ) : status === 'rejected' ? (
                    <>
                        <Typography variant="h6" className={classes.subtitle}>
                            Tu solicitud ha sido rechazada.
                        </Typography>
                        <Button variant="contained" color="secondary" onClick={handleReapply}>
                            Rellenar de nuevo
                        </Button>
                    </>
                ) : (
                    <Formik
                        initialValues={formData}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className={classes.form}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            name="question1"
                                            label="¿Por qué te gustaría vivir en la residencia universitaria?"
                                            fullWidth
                                            className={classes.field}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            name="question2"
                                            label="¿Cómo contribuirías a la comunidad de la residencia?"
                                            fullWidth
                                            className={classes.field}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            name="question3"
                                            label="¿Tienes alguna necesidad especial que debamos conocer?"
                                            fullWidth
                                            className={classes.field}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            name="question4"
                                            label="¿Cómo planeas equilibrar tus estudios y tu vida en la residencia?"
                                            fullWidth
                                            className={classes.field}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            name="question5"
                                            label="Proporcione cualquier otra información relevante sobre usted."
                                            fullWidth
                                            className={classes.field}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            onClick={handleOpenCardModal}
                                            disabled={isCardEntered}
                                        >
                                            {isCardEntered ? 'Tarjeta Ingresada' : 'Ingresar Tarjeta'}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            disabled={isSubmitting || isLoading || !isCardEntered}
                                        >
                                            {isSubmitting || isLoading ? 'Enviando...' : 'Enviar Solicitud'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                )}
            </Paper>
            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>
            <CreditCardModal
                open={isCardModalOpen}
                onClose={handleCloseCardModal}
                onCardSubmit={handleCardSubmit}
            />
        </Container>
    );
};

export default Apply;
