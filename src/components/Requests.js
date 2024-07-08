import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Modal, Backdrop, Fade, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import RequestDetailModal from './RequestDetailModal';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [alert, setAlert] = useState({ open: false, severity: '', message: '' });

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/questions`);
            setRequests(Object.values(response.data).filter(request => request.status === 'pending'));
        };

        fetchRequests();
    }, []);

    const handleOpen = (request) => {
        setSelectedRequest(request);
    };

    const handleClose = () => {
        setSelectedRequest(null);
    };

    const handleStatusChange = async (cedula, status) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/questions/${cedula}`, { status });
            setRequests(prevRequests => prevRequests.filter(request => request.cedula !== cedula));
            setAlert({ open: true, severity: 'success', message: `Solicitud ${status === 'approved' ? 'aprobada' : 'rechazada'} con éxito` });
            handleClose();
        } catch (error) {
            console.error('Error updating status:', error);
            setAlert({ open: true, severity: 'error', message: 'Error actualizando el estado de la solicitud' });
        }
    };

    const handleCloseAlert = () => {
        setAlert({ open: false, severity: '', message: '' });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Solicitudes de Residencia
            </Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Cédula</TableCell>
                            <TableCell>Preguntas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests.map((request, index) => (
                            <TableRow key={request.cedula}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{request.name}</TableCell>
                                <TableCell>{request.cedula}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleOpen(request)}>
                                        Ver Detalle
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <Modal
                open={!!selectedRequest}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={!!selectedRequest}>
                    <div>
                        {selectedRequest && <RequestDetailModal request={selectedRequest} onClose={handleClose} onStatusChange={handleStatusChange} />}
                    </div>
                </Fade>
            </Modal>
            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Requests;