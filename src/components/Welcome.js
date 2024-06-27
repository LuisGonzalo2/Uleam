import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import useStyles from '../styles/WelcomeStyles';
import InfoIcon from '@material-ui/icons/Info';
import BuildIcon from '@material-ui/icons/Build';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import dormRoom from '../assets/dorm_room.jpg';
import universityLife from '../assets/university_life.webp';
import campusScenery from '../assets/campus.jpg';
import { useAuth } from '../context/AuthContext';

const Welcome = () => {
    const classes = useStyles();
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const handleApplyClick = () => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            navigate('/apply');
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.heroContainer}>
                <div className={classes.heroTextContainer}>
                    <Typography variant="h3" className={classes.heroText}>
                        Bienvenido a la Residencia Universitaria{isAuthenticated ? `, ${user.name}` : ''}
                    </Typography>
                </div>
                <Typography variant="h6" className={classes.subtitle}>
                    La mejor opción para tu estancia universitaria
                </Typography>
            </div>
            <Container className={classes.buttonContainer}>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item>
                        <Link to="/about" className={classes.iconButton}>
                            <InfoIcon className={classes.icon} />
                            <Typography>Sobre Nosotros</Typography>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/services" className={classes.iconButton}>
                            <BuildIcon className={classes.icon} />
                            <Typography>Servicios</Typography>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/contact" className={classes.iconButton}>
                            <ContactMailIcon className={classes.icon} />
                            <Typography>Contacto</Typography>
                        </Link>
                    </Grid>
                    {!isAuthenticated && (
                        <Grid item>
                            <Link to="/register" className={classes.iconButton}>
                                <PersonAddIcon className={classes.icon} />
                                <Typography>Registrarse</Typography>
                            </Link>
                        </Grid>
                    )}
                    <Grid item>
                        <div className={classes.iconButton} onClick={handleApplyClick}>
                            <AssignmentIcon className={classes.icon} />
                            <Typography>Solicitar Residencia</Typography>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            <Container>
                <Grid container spacing={4} className={classes.imageGrid}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.imageCard}>
                            <CardMedia
                                className={classes.media}
                                image={dormRoom}
                                title="Habitaciones del Dormitorio"
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Habitaciones del Dormitorio
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Conoce nuestras cómodas y modernas habitaciones diseñadas para tu bienestar.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.imageCard}>
                            <CardMedia
                                className={classes.media}
                                image={universityLife}
                                title="Vida Universitaria"
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Vida Universitaria
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Experimenta la vida en el campus con una comunidad vibrante y diversa.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.imageCard}>
                            <CardMedia
                                className={classes.media}
                                image={campusScenery}
                                title="Escenarios del Campus"
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Escenarios del Campus
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Disfruta de nuestros hermosos y bien cuidados escenarios en el campus.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Welcome;
