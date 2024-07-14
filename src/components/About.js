import React from 'react';
import { Container, Typography, Paper, Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
    },
    section: {
        marginBottom: theme.spacing(4),
    },
    largeAvatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        margin: 'auto',
    },
    teamMember: {
        textAlign: 'center',
        padding: theme.spacing(2),
    },
}));

const teamMembers = [
    { name: 'Juan Perez', role: 'Director', avatar: 'https://via.placeholder.com/150' },
    { name: 'Maria Gomez', role: 'Coordinadora', avatar: 'https://via.placeholder.com/150' },
    { name: 'Luis Martinez', role: 'Asistente Administrativo', avatar: 'https://via.placeholder.com/150' },
];

const About = () => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="md">
            <Paper className={classes.root}>
                <Typography variant="h4" gutterBottom>
                    Sobre Nosotros
                </Typography>
                <Typography variant="body1" className={classes.section}>
                    La Residencia Universitaria ofrece un ambiente seguro y cómodo para los estudiantes, con todas las facilidades necesarias para garantizar una estancia agradable y productiva. Nuestro objetivo es proporcionar un hogar lejos de casa, donde los estudiantes puedan concentrarse en sus estudios y desarrollo personal.
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Nuestro Equipo
                </Typography>
                <Grid container spacing={4} className={classes.section}>
                    {teamMembers.map((member, index) => (
                        <Grid item xs={12} sm={4} key={index} className={classes.teamMember}>
                            <Avatar alt={member.name} src={member.avatar} className={classes.largeAvatar} />
                            <Typography variant="h6">{member.name}</Typography>
                            <Typography variant="body2">{member.role}</Typography>
                        </Grid>
                    ))}
                </Grid>
                <Typography variant="h5" gutterBottom>
                    Nuestra Misión
                </Typography>
                <Typography variant="body1" className={classes.section}>
                    La misión de la Residencia Universitaria es ofrecer a los estudiantes un entorno de vida que apoye su crecimiento académico y personal. Nos esforzamos por crear una comunidad inclusiva y colaborativa donde todos los residentes se sientan valorados y respetados.
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Contacto
                </Typography>
                <Typography variant="body1">
                    Para más información, contáctenos en:
                </Typography>
                <Typography variant="body1">
                    Email: info@residenciauniversitaria.com
                </Typography>
                <Typography variant="body1">
                    Teléfono: (123) 456-7890
                </Typography>
            </Paper>
        </Container>
    );
};

export default About;
