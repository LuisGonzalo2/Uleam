import React, { useState } from 'react';
//import axios from 'axios';
import {
    Button, Container, Typography, Grid, Paper, Avatar, MenuItem, InputAdornment, IconButton
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import CakeIcon from '@material-ui/icons/Cake';
import IdIcon from '@material-ui/icons/PermIdentity';
import { useNavigate } from 'react-router-dom';
import useStyles from '../styles/RegisterStyles';
import Progress from './Progress';
import CustomAlert from './Register/CustomAlert';
import CustomTextField from './Register/CustomTextField';
import CustomSelect from './Register/CustomSelect';
import PasswordStrengthBar from './Register/PasswordStrengthBar';
import zxcvbn from 'zxcvbn';

const validationSchema = Yup.object({
    name: Yup.string().required('Nombre es requerido'),
    email: Yup.string().email('Email inválido').required('Email es requerido'),
    password: Yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('Contraseña es requerida'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('Confirmar contraseña es requerido'),
    address: Yup.string().required('Dirección es requerida'),
    phone: Yup.string().matches(/^[0-9]+$/, 'El número de teléfono solo puede contener dígitos').required('Número de teléfono es requerido'),
    cedula: Yup.string().matches(/^[0-9]+$/, 'El número de cédula solo puede contener dígitos').required('Número de cédula es requerido'),
    gender: Yup.string().required('Género es requerido'),
    birthday: Yup.date().required('Fecha de cumpleaños es requerida'),
    disability: Yup.string().required('Indicar si tiene discapacidad es requerido'),
});

const getStrength = (password) => {
    const result = zxcvbn(password);
    switch (result.score) {
        case 0:
        case 1:
            return { label: 'Mala', color: 'red', score: result.score * 25 };
        case 2:
            return { label: 'Media', color: 'orange', score: result.score * 25 };
        case 3:
        case 4:
            return { label: 'Excelente', color: 'green', score: result.score * 25 };
        default:
            return { label: '', color: 'grey', score: 0 };
    }
};

const Register = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ open: false, severity: '', message: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ label: '', color: 'grey', score: 0 });
    const navigate = useNavigate();

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (event, setFieldValue) => {
        const { value } = event.target;
        setFieldValue('password', value);
        setPasswordStrength(getStrength(value));
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ ...alert, open: false });
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            //const response = await axios.post('http://localhost:5000/register', values);
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
                setAlert({ open: true, severity: 'success', message: 'Registro exitoso' });
                resetForm();
                setSubmitting(false);
                navigate('/login');
            }, 2000);
        } catch (error) {
            setAlert({ open: true, severity: 'error', message: error.response.data.message });
            setSubmitting(false);
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registrarse
                    </Typography>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            address: '',
                            phone: '',
                            cedula: '',
                            gender: '',
                            birthday: '',
                            disability: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors, touched, handleChange, setFieldValue }) => (
                            <Form className={classes.form}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            component={CustomTextField}
                                            name="name"
                                            label="Nombre"
                                            InputLabelProps={{ shrink: true }}
                                            startAdornment={<PersonIcon />}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={CustomTextField}
                                            name="email"
                                            label="Correo Electrónico"
                                            InputLabelProps={{ shrink: true }}
                                            startAdornment={<EmailIcon />}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={CustomTextField}
                                            name="password"
                                            label="Contraseña"
                                            type={showPassword ? 'text' : 'password'}
                                            InputLabelProps={{ shrink: true }}
                                            startAdornment={<LockIcon />}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            onChange={(event) => handlePasswordChange(event, setFieldValue)}
                                        />
                                        <PasswordStrengthBar score={passwordStrength.score} label={passwordStrength.label} color={passwordStrength.color} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={CustomTextField}
                                            name="confirmPassword"
                                            label="Confirmar Contraseña"
                                            type={showPassword ? 'text' : 'password'}
                                            InputLabelProps={{ shrink: true }}
                                            startAdornment={<LockIcon />}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={CustomTextField}
                                            name="address"
                                            label="Dirección"
                                            InputLabelProps={{ shrink: true }}
                                            startAdornment={<HomeIcon />}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={CustomTextField}
                                            name="phone"
                                            label="Número de Teléfono"
                                            InputLabelProps={{ shrink: true }}
                                            startAdornment={<PhoneIcon />}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={CustomTextField}
                                            name="cedula"
                                            label="Número de Cédula"
                                            InputLabelProps={{ shrink: true }}
                                            startAdornment={<IdIcon />}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={CustomSelect}
                                            name="gender"
                                            label="Género"
                                            InputLabelProps={{ shrink: true }}
                                        >
                                            <MenuItem value="male">Masculino</MenuItem>
                                            <MenuItem value="female">Femenino</MenuItem>
                                            <MenuItem value="other">Otro</MenuItem>
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={CustomTextField}
                                            name="birthday"
                                            label="Fecha de Cumpleaños"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            startAdornment={<CakeIcon />}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={CustomSelect}
                                            name="disability"
                                            label="Discapacidad"
                                            InputLabelProps={{ shrink: true }}
                                        >
                                            <MenuItem value="yes">Sí</MenuItem>
                                            <MenuItem value="no">No</MenuItem>
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting} className={classes.submit}>
                                            Registrarse
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </div>
            <Progress open={open} />
            <CustomAlert open={alert.open} handleClose={handleClose} severity={alert.severity} message={alert.message} />
        </Container>
    );
};

export default Register;

