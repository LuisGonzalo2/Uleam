import React from 'react';
import { Container, Typography, Grid, Paper, Card, CardContent, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import WifiIcon from '@material-ui/icons/Wifi';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import RestaurantIcon from '@material-ui/icons/Restaurant';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    section: {
        marginBottom: theme.spacing(4),
        textAlign: 'center',
    },
    card: {
        display: 'flex',
        marginBottom: theme.spacing(4),
    },
    cardDetails: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        width: 160,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.grey[200],
    },
    cardIcon: {
        fontSize: '3rem',
    },
    description: {
        color: theme.palette.text.primary,
    },
}));

const services = [
    {
        title: 'Servicio de Habitación',
        description: 'Disfruta de la comodidad de nuestro servicio de habitación disponible las 24 horas.',
        icon: <RoomServiceIcon />,
    },
    {
        title: 'Wi-Fi Gratis',
        description: 'Conéctate con nuestro Wi-Fi de alta velocidad en todas las áreas de la residencia.',
        icon: <WifiIcon />,
    },
    {
        title: 'Lavandería',
        description: 'Acceso a servicios de lavandería para mantener tu ropa limpia y fresca.',
        icon: <LocalLaundryServiceIcon />,
    },
    {
        title: 'Gimnasio',
        description: 'Mantente en forma con nuestro gimnasio equipado con máquinas modernas.',
        icon: <FitnessCenterIcon />,
    },
    {
        title: 'Comedor',
        description: 'Ofrecemos un comedor con una variedad de opciones saludables y deliciosas.',
        icon: <RestaurantIcon />,
    },
];

const Services = () => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="md">
            <Paper className={classes.root}>
                <Typography variant="h4" gutterBottom className={classes.section}>
                    Servicios
                </Typography>
                <Typography variant="body1" paragraph className={classes.section}>
                    Ofrecemos una variedad de servicios para asegurar tu comodidad y bienestar durante tu estancia en nuestra residencia universitaria.
                </Typography>
                <Grid container spacing={4}>
                    {services.map((service) => (
                        <Grid item key={service.title} xs={12} md={6}>
                            <Card className={classes.card}>
                                <CardMedia className={classes.cardMedia}>
                                    {React.cloneElement(service.icon, { className: classes.cardIcon })}
                                </CardMedia>
                                <CardContent className={classes.cardDetails}>
                                    <Typography component="h2" variant="h5">
                                        {service.title}
                                    </Typography>
                                    <Typography variant="subtitle1" className={classes.description}>
                                        {service.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
};

export default Services;
