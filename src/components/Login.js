import React, { useState } from 'react';
import {
    Button, Container, Typography, Grid, Avatar, TextField, InputAdornment, IconButton, Paper
} from '@material-ui/core';
import { Visibility, VisibilityOff, LockOutlined as LockOutlinedIcon, Email as EmailIcon, Lock as LockIcon } from '@material-ui/icons';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useStyles from '../styles/LoginStyles';

const validationSchema = Yup.object({
    email: Yup.string().email('Email inválido').required('Email es requerido'),
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

    const handleSubmit = (values, { setSubmitting }) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === values.email && u.password === values.password);

        if (user) {
            login();
            navigate('/Home'); // Ajusta la ruta de redirección según sea necesario
        } else {
            setError('Credenciales incorrectas');
            setSubmitting(false);
        }
    };

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
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="email"
                                        label="Correo Electrónico"
                                        fullWidth
                                        error={touched.email && !!errors.email}
                                        helperText={touched.email && errors.email}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon />
                                                </InputAdornment>
                                            ),
                                            className: classes.input,
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
        </Container>
    );
};

export default Login;
