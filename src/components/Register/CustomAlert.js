import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const CustomAlert = ({ open, handleClose, severity, message }) => (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
            {message}
        </Alert>
    </Snackbar>
);

export default CustomAlert;
