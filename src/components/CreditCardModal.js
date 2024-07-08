import React, { useState } from 'react';
import { Modal, Backdrop, Fade, Paper, Typography, TextField, Button, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import useStyles from '../styles/CreditCardModalStyles';

const CreditCardModal = ({ open, onClose, onCardSubmit }) => {
    const classes = useStyles();
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [showCvv, setShowCvv] = useState(false);

    const handleCardNumberChange = (e) => {
        const { value } = e.target;
        const formattedValue = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
        setCardNumber(formattedValue);
    };

    const handleExpiryDateChange = (e) => {
        const { value } = e.target;
        const formattedValue = value.replace(/^(\d\d)(\d)$/, '$1/$2').replace(/(\d{2})(\d)/, '$1/$2');
        setExpiryDate(formattedValue);
    };

    const handleCvvChange = (e) => {
        setCvv(e.target.value);
    };

    const handleCvvVisibilityToggle = () => {
        setShowCvv(!showCvv);
    };

    const handleSubmit = () => {
        onCardSubmit({ cardNumber, cardName, expiryDate, cvv });
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={open}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" gutterBottom>
                        Ingresar Tarjeta de Crédito
                    </Typography>
                    <TextField
                        label="Número de Tarjeta"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            inputProps: { maxLength: 19 },
                            startAdornment: <InputAdornment position="start">💳</InputAdornment>,
                        }}
                    />
                    <TextField
                        label="Nombre del Titular"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Fecha de Expiración"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            inputProps: { maxLength: 5 },
                        }}
                    />
                    <TextField
                        label="CVV"
                        value={cvv}
                        onChange={handleCvvChange}
                        fullWidth
                        margin="normal"
                        type={showCvv ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle cvv visibility"
                                        onClick={handleCvvVisibilityToggle}
                                    >
                                        {showCvv ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div className={classes.actions}>
                        <Button variant="contained" color="secondary" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Guardar
                        </Button>
                    </div>
                </Paper>
            </Fade>
        </Modal>
    );
};

export default CreditCardModal;
