import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, TextField, Button, IconButton, makeStyles, CircularProgress } from '@material-ui/core';
import { Edit as EditIcon, Check as CheckIcon } from '@material-ui/icons';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    field: {
        marginBottom: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        marginTop: theme.spacing(2),
    },
    input: {
        flexGrow: 1,
        marginRight: theme.spacing(1),
    },
}));

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
        } catch (error) {
            console.error('Error updating user data:', error);
        } finally {
            setLoading(false);
        }
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
                        <Typography variant="body1" className={classes.input}>{user.dormitory ? `Dormitorio ${user.dormitory}` : 'No asignado'}</Typography>
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
        </Container>
    );
};

export default Profile;
