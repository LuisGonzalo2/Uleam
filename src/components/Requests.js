import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Modal,
    Backdrop,
    Fade,
    makeStyles,
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Requests = () => {
    const classes = useStyles();
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/questions')
            .then(response => {
                const data = Object.values(response.data);
                setRequests(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleOpen = (request) => {
        setSelectedRequest(request);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleStatusChange = (cedula, status) => {
        axios.put(`http://localhost:5000/questions/${cedula}`, { status })
            .then(response => {
                setRequests(prevRequests =>
                    prevRequests.map(request =>
                        request.cedula === cedula ? { ...request, status } : request
                    )
                );
                setOpen(false);
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    };

    return (
        <Container component="main" maxWidth="lg">
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Solicitudes de Residencia
                </Typography>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Cédula</TableCell>
                                <TableCell>Preguntas</TableCell>
                                <TableCell>Perfil</TableCell>
                                <TableCell>Estado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.map((request, index) => (
                                <TableRow key={request.cedula}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{request.name}</TableCell>
                                    <TableCell>{request.cedula}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleOpen(request)}
                                        >
                                            Ver Detalle
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleOpen(request)}
                                        >
                                            Ver Perfil
                                        </Button>
                                    </TableCell>
                                    <TableCell>{request.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            {selectedRequest && (
                <Modal
                    open={open}
                    onClose={handleClose}
                    className={classes.modal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <Typography variant="h4">Detalles de Solicitud</Typography>
                            <Typography variant="h6">Nombre: {selectedRequest.name}</Typography>
                            <Typography variant="h6">Cédula: {selectedRequest.cedula}</Typography>
                            <Typography variant="h6">Preguntas y Respuestas:</Typography>
                            {Object.entries(selectedRequest.questions).map(([question, answer]) => (
                                <Typography key={question} variant="body1">
                                    {question}: {answer}
                                </Typography>
                            ))}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleStatusChange(selectedRequest.cedula, 'approved')}
                                style={{ margin: '10px' }}
                            >
                                Aceptar
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleStatusChange(selectedRequest.cedula, 'rejected')}
                                style={{ margin: '10px' }}
                            >
                                Rechazar
                            </Button>
                        </div>
                    </Fade>
                </Modal>
            )}
        </Container>
    );
};

export default Requests;
