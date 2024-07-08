import React, { useState } from 'react';
import { Modal, Backdrop, Fade, Paper, TextField, Button, Grid, InputAdornment } from '@material-ui/core';
import useStyles from '../styles/CreditCardModalStyles';
import frontCardImage from '../assets/front-card.jpg';
import backCardImage from '../assets/back-card.jpg';

const CreditCardModal = ({ open, onClose, onCardSubmit }) => {
    const classes = useStyles();
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);
    const [labelColor, setLabelColor] = useState('#000'); // Estado para el color del label

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

    const handleSubmit = () => {
        if (cardNumber.length < 19 || expiryDate.length < 5 || cvv.length < 3) {
            alert('Por favor complete todos los campos correctamente.');
            return;
        }
        onCardSubmit({ cardNumber, cardName, expiryDate, cvv });
    };

    const handleLabelColorChange = (e) => {
        setLabelColor(e.target.value);
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
    );
};

export default CreditCardModal;
