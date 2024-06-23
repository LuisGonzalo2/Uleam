import React from 'react';
import { Container, Paper, Typography, Grid, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import useStyles from '../styles/ApplyStyles';

const validationSchema = Yup.object({
    question1: Yup.string().required('Campo requerido'),
    question2: Yup.string().required('Campo requerido'),
    question3: Yup.string().required('Campo requerido'),
    // Agrega más validaciones según sea necesario
});

const Apply = () => {
    const classes = useStyles();

    const handleSubmit = (values) => {
        // Aquí podrías enviar los datos a tu servidor
        console.log(values);
    };

    return (
        <Container component="main" maxWidth="md">
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Solicitar Residencia
                </Typography>
                <Formik
                    initialValues={{
                        question1: '',
                        question2: '',
                        question3: '',
                        // Agrega más campos según sea necesario
                    }}
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
                                        label="Pregunta 1"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        name="question2"
                                        label="Pregunta 2"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        component={TextField}
                                        name="question3"
                                        label="Pregunta 3"
                                        fullWidth
                                    />
                                </Grid>
                                {/* Agrega más campos según sea necesario */}
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                                        Enviar Solicitud
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
};

export default Apply;
