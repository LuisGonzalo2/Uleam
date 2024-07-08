import React, { useState } from 'react';
import { Modal, Backdrop, Fade, Paper, TextField, Button, Grid, InputAdornment, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from '../styles/CreditCardModalStyles';
import frontCardImage from '../assets/front-card.jpg';
import backCardImage from '../assets/back-card.jpg';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const CreditCardModal = ({ open, onClose, onCardSubmit }) => {
    const classes = useStyles();
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);
    const [labelColor, setLabelColor] = useState('#000'); // Estado para el color del label
    const [snackbar, setSnackbar] = useState({ open: false, severity: '', message: '' });

    const [errors, setErrors] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });

    const handleCardNumberChange = (e) => {
        const { value } = e.target;
        const onlyNumbers = value.replace(/[^\d]/g, '');
        const formattedValue = onlyNumbers.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
        setCardNumber(formattedValue);
    };

    const handleExpiryDateChange = (e) => {
        const { value } = e.target;
        const onlyNumbers = value.replace(/[^\d]/g, '');
        const formattedValue = onlyNumbers.replace(
            /^(\d{2})(\d{0,2})$/,
            (match, p1, p2) => (p2 ? `${p1}/${p2}` : p1)
        );
        setExpiryDate(formattedValue);
    };

    const handleCvvChange = (e) => {
        const { value } = e.target;
        if (/^\d{0,3}$/.test(value)) {
            setCvv(value);
        }
    };

    const validateFields = () => {
        let newErrors = {
            cardNumber: '',
            cardName: '',
            expiryDate: '',
            cvv: '',
        };
        if (cardNumber.length < 19) newErrors.cardNumber = 'Número de tarjeta inválido';
        if (!cardName) newErrors.cardName = 'Nombre en la tarjeta es requerido';
        if (expiryDate.length < 5) newErrors.expiryDate = 'Fecha de expiración inválida';
        if (cvv.length < 3) newErrors.cvv = 'CVV inválido';
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleSubmit = () => {
        if (validateFields()) {
            onCardSubmit({ cardNumber, cardName, expiryDate, cvv });
            setSnackbar({ open: true, severity: 'success', message: 'Datos de la tarjeta guardados exitosamente' });
            onClose();
        }
    };

    const handleLabelColorChange = (e) => {
        setLabelColor(e.target.value);
    };

    const handleSnackbarClose = () => {
        setSnackbar({ open: false, severity: '', message: '' });
    };

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <div
                                    className={classes.cardContainer}
                                    onMouseEnter={() => setIsFlipped(true)}
                                    onMouseLeave={() => setIsFlipped(false)}
                                >
                                    <div className={`${classes.card} ${isFlipped ? classes.isFlipped : ''}`}>
                                        <div className={classes.cardFront}>
                                            <img src={frontCardImage} alt="front" className={classes.cardImage} />
                                            <div className={classes.cardDetails}>
                                                <div className={classes.cardNumber}>{cardNumber}</div>
                                                <div className={classes.cardName}>{cardName}</div>
                                                <div className={classes.cardExpiry}>{expiryDate}</div>
                                            </div>
                                        </div>
                                        <div className={classes.cardBack}>
                                            <img src={backCardImage} alt="back" className={classes.cardImage} />
                                            <div className={classes.cardCvv}>{cvv}</div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Número de Tarjeta"
                                    fullWidth
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    InputProps={{
                                        inputProps: { maxLength: 19 },
                                        startAdornment: <InputAdornment position="start">💳</InputAdornment>,
                                    }}
                                    InputLabelProps={{
                                        style: { color: labelColor },
                                    }}
                                    error={Boolean(errors.cardNumber)}
                                    helperText={errors.cardNumber}
                                />
                                <TextField
                                    label="Nombre en la Tarjeta"
                                    fullWidth
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">👤</InputAdornment>,
                                    }}
                                    InputLabelProps={{
                                        style: { color: labelColor },
                                    }}
                                    style={{ marginTop: '16px' }}
                                    error={Boolean(errors.cardName)}
                                    helperText={errors.cardName}
                                />
                                <TextField
                                    label="Fecha de Expiración"
                                    fullWidth
                                    value={expiryDate}
                                    onChange={handleExpiryDateChange}
                                    InputProps={{
                                        inputProps: { maxLength: 5 },
                                        startAdornment: <InputAdornment position="start">📅</InputAdornment>,
                                    }}
                                    InputLabelProps={{
                                        style: { color: labelColor },
                                    }}
                                    style={{ marginTop: '16px' }}
                                    error={Boolean(errors.expiryDate)}
                                    helperText={errors.expiryDate}
                                />
                                <TextField
                                    label="CVV"
                                    fullWidth
                                    value={cvv}
                                    onChange={handleCvvChange}
                                    InputProps={{
                                        inputProps: { maxLength: 3 },
                                        startAdornment: <InputAdornment position="start">🔒</InputAdornment>,
                                    }}
                                    InputLabelProps={{
                                        style: { color: labelColor },
                                    }}
                                    style={{ marginTop: '16px' }}
                                    error={Boolean(errors.cvv)}
                                    helperText={errors.cvv}
                                />
                                <div className={classes.actions}>
                                    <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '16px' }}>
                                        Guardar
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Fade>
            </Modal>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CreditCardModal;
