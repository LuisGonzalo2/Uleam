import React, { useState, useEffect } from 'react';
import { Modal, Backdrop, Fade, Paper, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import useStyles from '../styles/ManageResidenceModalStyles';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const ManageResidenceModal = ({ open, onClose, user, fetchUsers }) => {
    const classes = useStyles();
    const [residenceData, setResidenceData] = useState({
        dormitory: user.dormitory || '',
        behavior: '',
        roommate: '',
        note: ''
    });
    const [roommateOptions, setRoommateOptions] = useState([]);
    const [alert, setAlert] = useState({ open: false, severity: '', message: '' });

    useEffect(() => {
        setResidenceData({
            dormitory: user.dormitory || '',
            behavior: '',
            roommate: '',
            note: ''
        });
        fetchRoommateOptions();
    }, [user]);

    const fetchRoommateOptions = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}users`);
            const approvedUsers = Object.values(response.data).filter(u => u.status === 'approved');
            setRoommateOptions(approvedUsers);
        } catch (error) {
            console.error('Error fetching roommate options:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResidenceData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/users/${user.cedula}`, residenceData);
            setAlert({ open: true, severity: 'success', message: 'Datos de residencia actualizados con éxito' });
            fetchUsers();
            onClose();
        } catch (error) {
            console.error('Error updating residence data:', error);
            setAlert({ open: true, severity: 'error', message: 'Error actualizando los datos de residencia' });
        }
    };

    const handleExpel = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/users/${user.cedula}`);
            setAlert({ open: true, severity: 'success', message: 'Usuario expulsado con éxito' });
            fetchUsers();
            onClose();
        } catch (error) {
            console.error('Error expelling user:', error);
            setAlert({ open: true, severity: 'error', message: 'Error expulsando al usuario' });
        }
    };

    const handleCloseAlert = () => {
        setAlert({ open: false, severity: '', message: '' });
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Fade in={open}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" gutterBottom className={classes.title}>
                        Administrar Residencia
                    </Typography>
                    <TextField
                        variant="outlined"
                        label="Número de cuarto"
                        name="dormitory"
                        value={residenceData.dormitory}
                        onChange={handleChange}
                        fullWidth
                        className={classes.field}
                        InputLabelProps={{
                            classes: {
                                root: classes.label,
                            },
                        }}
                    />
                    <FormControl variant="outlined" fullWidth margin="normal" className={classes.field}>
                        <InputLabel className={classes.label}>Comportamiento</InputLabel>
                        <Select
                            name="behavior"
                            value={residenceData.behavior}
                            onChange={handleChange}
                            label="Comportamiento"
                        >
                            <MenuItem value="buena">Buena</MenuItem>
                            <MenuItem value="excelente">Excelente</MenuItem>
                            <MenuItem value="regular">Regular</MenuItem>
                            <MenuItem value="mala">Mala</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth margin="normal" className={classes.field}>
                        <InputLabel className={classes.label}>Compañero</InputLabel>
                        <Select
                            name="roommate"
                            value={residenceData.roommate}
                            onChange={handleChange}
                            label="Compañero"
                        >
                            {roommateOptions.map(option => (
                                <MenuItem key={option.cedula} value={option.cedula}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        label="Nota"
                        name="note"
                        value={residenceData.note}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                        className={classes.field}
                        InputLabelProps={{
                            classes: {
                                root: classes.label,
                            },
                        }}
                    />
                    <div className={classes.actions}>
                        <Button variant="contained" color="secondary" onClick={handleExpel}>
                            Expulsar
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Guardar
                        </Button>
                    </div>
                    <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity={alert.severity}>
                            {alert.message}
                        </Alert>
                    </Snackbar>
                </Paper>
            </Fade>
        </Modal>
    );
};

export default ManageResidenceModal;
