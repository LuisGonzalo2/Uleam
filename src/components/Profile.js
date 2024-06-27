import React, { useState } from 'react';
import {
    Container, Typography, Grid, TextField, Button, Paper, IconButton, Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import useStyles from '../styles/ProfileStyles';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = () => {
    const classes = useStyles();
    const { user, setUser } = useAuth();
    const [editableField, setEditableField] = useState(null);
    const [formData, setFormData] = useState({
        email: user.email,
        address: user.address,
        phone: user.phone,
    });
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleFieldChange = (field, value) => {
        if (field === 'phone') {
            const regex = /^[0-9\b]+$/;
            if ((value === '' || regex.test(value)) && value.length <= 10) {
                setFormData({
                    ...formData,
                    [field]: value,
                });
            }
        } else if (field === 'email') {
            setFormData({
                ...formData,
                [field]: value,
            });
        } else {
            setFormData({
                ...formData,
                [field]: value,
            });
        }
    };

    const handleEditClick = (field) => {
        setEditableField(field);
    };

    const handleSaveClick = async () => {
        if (editableField === 'email' && !/\S+@\S+\.\S+/.test(formData.email)) {
            setMessage('Por favor, ingrese un correo electrónico válido.');
            setOpen(true);
            return;
        }
        try {
            await axios.put(`http://localhost:5000/users/${user.cedula}`, formData);
            setUser({ ...user, ...formData });  // Aseguramos que se actualice el estado del usuario con los nuevos datos
            setMessage('Datos actualizados correctamente');
            setOpen(true);
            setEditableField(null);
        } catch (error) {
            console.error('Error updating user data:', error);
            setMessage('Error actualizando los datos');
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container component="main" maxWidth="md" className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h4" className={classes.title}>
                    Perfil de Usuario
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" className={classes.fieldLabel}>
                            Nombre:
                        </Typography>
                        <Typography variant="body1" className={classes.fieldValue}>
                            {user.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" className={classes.fieldLabel}>
                            Correo Electrónico:
                        </Typography>
                        {editableField === 'email' ? (
                            <TextField
                                value={formData.email}
                                onChange={(e) => handleFieldChange('email', e.target.value)}
                                fullWidth
                                className={classes.input}
                                error={editableField === 'email' && !/\S+@\S+\.\S+/.test(formData.email)}
                                helperText={editableField === 'email' && !/\S+@\S+\.\S+/.test(formData.email) ? 'Correo electrónico no válido' : ''}
                            />
                        ) : (
                            <Typography variant="body1" className={classes.fieldValue}>
                                {user.email}
                                <IconButton onClick={() => handleEditClick('email')}>
                                    <EditIcon />
                                </IconButton>
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" className={classes.fieldLabel}>
                            Dirección:
                        </Typography>
                        {editableField === 'address' ? (
                            <TextField
                                value={formData.address}
                                onChange={(e) => handleFieldChange('address', e.target.value)}
                                fullWidth
                                className={classes.input}
                            />
                        ) : (
                            <Typography variant="body1" className={classes.fieldValue}>
                                {user.address}
                                <IconButton onClick={() => handleEditClick('address')}>
                                    <EditIcon />
                                </IconButton>
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" className={classes.fieldLabel}>
                            Teléfono:
                        </Typography>
                        {editableField === 'phone' ? (
                            <TextField
                                value={formData.phone}
                                onChange={(e) => handleFieldChange('phone', e.target.value)}
                                fullWidth
                                className={classes.input}
                                error={editableField === 'phone' && formData.phone.length !== 10}
                                helperText={editableField === 'phone' && formData.phone.length !== 10 ? 'El teléfono debe tener 10 dígitos' : ''}
                            />
                        ) : (
                            <Typography variant="body1" className={classes.fieldValue}>
                                {user.phone}
                                <IconButton onClick={() => handleEditClick('phone')}>
                                    <EditIcon />
                                </IconButton>
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" className={classes.fieldLabel}>
                            Número de Cédula:
                        </Typography>
                        <Typography variant="body1" className={classes.fieldValue}>
                            {user.cedula}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" className={classes.fieldLabel}>
                            Género:
                        </Typography>
                        <Typography variant="body1" className={classes.fieldValue}>
                            {user.gender}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" className={classes.fieldLabel}>
                            Fecha de Cumpleaños:
                        </Typography>
                        <Typography variant="body1" className={classes.fieldValue}>
                            {user.birthday}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" className={classes.fieldLabel}>
                            Discapacidad:
                        </Typography>
                        <Typography variant="body1" className={classes.fieldValue}>
                            {user.disability}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" className={classes.fieldLabel}>
                            Dormitorio:
                        </Typography>
                        <Typography variant="body1" className={classes.fieldValue}>
                            {user.dormitory || 'No asignado'}
                        </Typography>
                    </Grid>
                    {editableField && (
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />}
                                onClick={handleSaveClick}
                                className={classes.saveButton}
                            >
                                Guardar
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </Paper>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity="success" variant="filled">
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Profile;
