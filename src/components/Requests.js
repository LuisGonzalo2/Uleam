import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Modal, Backdrop, Fade } from '@material-ui/core';
import axios from 'axios';
import RequestDetailModal from './RequestDetailModal';

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await axios.get('http://localhost:5000/questions');
            setRequests(Object.values(response.data));
        };

        fetchRequests();
    }, []);

    const handleOpen = (request) => {
        setSelectedRequest(request);
    };

    const handleClose = () => {
        setSelectedRequest(null);
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
                                    <Button variant="contained" color="primary" onClick={() => handleOpen(request)}>
                                        Ver Detalle
                                    </Button>
                                </TableCell>
                                <TableCell>{request.status}</TableCell>
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
                    <div onClick={handleClose} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <div onClick={(e) => e.stopPropagation()}>
                            {selectedRequest && <RequestDetailModal request={selectedRequest} onClose={handleClose} />}
                        </div>
                    </div>
                </Fade>
            </Modal>
        </Container>
    );
};

export default Requests;
