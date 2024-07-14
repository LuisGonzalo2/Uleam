import React, { useState } from 'react';
import axios from 'axios';
import {
    Button, Container, Typography, Grid, Avatar, TextField, InputAdornment, IconButton, Paper
} from '@material-ui/core';
import { Visibility, VisibilityOff, LockOutlined as LockOutlinedIcon, Email as EmailIcon, Lock as LockIcon } from '@material-ui/icons';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useStyles from '../styles/LoginStyles';

const validationSchema = Yup.object({
    identifier: Yup.string().required('Correo Electrónico o Número de Cédula es requerido'),
    password: Yup.string().required('Contraseña es requerida'),
});

const Login = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            console.log('Login request sent:', values);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, values);
            alert(response.data.message);
            login(response.data.user); // Asegurarse de pasar la información del usuario
            navigate('/'); // Redirigir a la pantalla de inicio
        } catch (error) {
            console.error('Login error:', error.response.data.message);
            setError(error.response.data.message);
            setSubmitting(false);
        }
    };

    const labelColor = "#050505";

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Iniciar Sesión
                </Typography>
                <Formik
                    initialValues={{ identifier: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="identifier"
                                        label="Correo Electrónico o Número de Cédula"
                                        fullWidth
                                        error={touched.identifier && !!errors.identifier}
                                        helperText={touched.identifier && errors.identifier}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon />
                                                </InputAdornment>
                                            ),
                                            className: classes.input,
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { color: labelColor },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="password"
                                        label="Contraseña"
                                        type={showPassword ? 'text' : 'password'}
                                        fullWidth
                                        error={touched.password && !!errors.password}
                                        helperText={touched.password && errors.password}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            className: classes.input,
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { color: labelColor },
                                        }}
                                    />
                                </Grid>
                                {error && (
                                    <Grid item xs={12}>
                                        <Typography className={classes.errorText}>{error}</Typography>
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        disabled={isSubmitting}
                                    >
                                        Iniciar Sesión
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Paper>
            <Typography variant="body2">
                ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
            </Typography>
        </Container>
    );
};

export default Login;
