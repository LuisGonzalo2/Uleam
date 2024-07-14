import React from 'react';
import { Container, Typography, TextField, Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
    },
    form: {
        marginTop: theme.spacing(2),
    },
    section: {
        marginBottom: theme.spacing(4),
    },
    submitButton: {
        marginTop: theme.spacing(2),
    },
}));

const Contact = () => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="md">
            <Paper className={classes.root}>
                <Typography variant="h4" gutterBottom>
                    Contacto
                </Typography>
                <Typography variant="body1" className={classes.section}>
                    Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos. Estamos aquí para ayudarte.
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Información de Contacto
                </Typography>
                <Typography variant="body1" className={classes.section}>
                    Email: info@residenciauniversitaria.com
                </Typography>
                <Typography variant="body1" className={classes.section}>
                    Teléfono: (123) 456-7890
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Envíanos un Mensaje
                </Typography>
                <form className={classes.form} noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Nombre"
                                name="name"
                                autoComplete="name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Correo Electrónico"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="subject"
                                label="Asunto"
                                name="subject"
                                autoComplete="subject"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="message"
                                label="Mensaje"
                                name="message"
                                multiline
                                rows={4}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submitButton}
                    >
                        Enviar
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Contact;
