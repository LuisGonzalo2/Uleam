import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, TextField, Button, IconButton, CircularProgress, Snackbar } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from '../styles/ProfileStyles';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Profile = () => {
    const classes = useStyles();
    const { user, setUser } = useAuth();
    const [isEditing, setIsEditing] = useState({
        email: false,
        address: false,
        phone: false,
    });
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: user.email,
        address: user.address,
        phone: user.phone,
    });
    const [hasEdits, setHasEdits] = useState(false);
    const [alert, setAlert] = useState({ open: false, severity: '', message: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setHasEdits(true);
    };

    const handleEditClick = (field) => {
        setIsEditing((prevIsEditing) => ({
            ...prevIsEditing,
            [field]: true,
        }));
    };

    const handleSaveClick = async () => {
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:5000/users/${user.cedula}`, formData);
            setUser(response.data.user);
            setIsEditing({
                email: false,
                address: false,
                phone: false,
            });
            setHasEdits(false);
            setAlert({ open: true, severity: 'success', message: 'Datos actualizados correctamente' });
        } catch (error) {
            console.error('Error updating user data:', error);
            setAlert({ open: true, severity: 'error', message: 'Error actualizando los datos' });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ open: false, severity: '', message: '' });
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    if (!user) {
        return <Typography variant="h5">Cargando...</Typography>;
    }

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h4" className={classes.title}>Perfil de Usuario</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.field}>
                        <Typography variant="h6">Nombre:</Typography>
                        <Typography variant="body1" className={classes.input}>{user.name}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.field}>
                        <Typography variant="h6">Correo Electrónico:</Typography>
                        {isEditing.email ? (
                            <TextField
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                fullWidth
                                className={classes.input}
                            />
                        ) : (
                            <Typography variant="body1" className={classes.input}>{user.email}</Typography>
                        )}
                        <IconButton onClick={() => handleEditClick('email')}>
                            <EditIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} className={classes.field}>
                        <Typography variant="h6">Dirección:</Typography>
                        {isEditing.address ? (
                            <TextField
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                fullWidth
                                className={classes.input}
                            />
                        ) : (
                            <Typography variant="body1" className={classes.input}>{user.address}</Typography>
                        )}
                        <IconButton onClick={() => handleEditClick('address')}>
                            <EditIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} className={classes.field}>
                        <Typography variant="h6">Teléfono:</Typography>
                        {isEditing.phone ? (
                            <TextField
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                fullWidth
                                className={classes.input}
                            />
                        ) : (
                            <Typography variant="body1" className={classes.input}>{user.phone}</Typography>
                        )}
                        <IconButton onClick={() => handleEditClick('phone')}>
                            <EditIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} className={classes.field}>
                        <Typography variant="h6">Número de Cédula:</Typography>
                        <Typography variant="body1" className={classes.input}>{user.cedula}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.field}>
                        <Typography variant="h6">Género:</Typography>
                        <Typography variant="body1" className={classes.input}>{user.gender}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.field}>
                        <Typography variant="h6">Fecha de Cumpleaños:</Typography>
                        <Typography variant="body1" className={classes.input}>{user.birthday}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.field}>
                        <Typography variant="h6">Discapacidad:</Typography>
                        <Typography variant="body1" className={classes.input}>{user.disability}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.field}>
                        <Typography variant="h6">Dormitorio:</Typography>
                        <Typography variant="body1" className={classes.input}>{user.dormitory || 'No asignado'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {hasEdits && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveClick}
                                disabled={loading}
                                endIcon={loading ? <CircularProgress size={20} /> : null}
                            >
                                Guardar
                            </Button>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" onClick={handleLogout}>
                            Cerrar Sesión
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Profile;
