import { makeStyles } from '@material-ui/core/styles';
import campusScenery from '../assets/campus.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(4),
    },
    heroContainer: {
        backgroundImage: `url(${campusScenery})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: theme.spacing(10, 2),
        borderRadius: theme.shape.borderRadius,
        color: '#fff',
    },
    heroTextContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
    },
    heroText: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
    },
    subtitle: {
        marginBottom: theme.spacing(4),
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
    },
    buttonContainer: {
        marginTop: theme.spacing(4),
    },
    iconButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textDecoration: 'none',
        color: theme.palette.text.primary,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            transform: 'scale(1.05)',
        },
    },
    icon: {
        fontSize: '3rem',
        color: theme.palette.secondary.main,
        marginBottom: theme.spacing(1),
    },
    applyButton: {
        marginTop: theme.spacing(4),
    },
    imageGrid: {
        marginTop: theme.spacing(4),
    },
    imageCard: {
        maxWidth: 345,
        margin: 'auto',
        cursor: 'pointer',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: theme.shadows[5],
        },
    },
    media: {
        height: 200,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: theme.shape.borderRadius,
        maxWidth: 600,
        width: '90%',
    },
}));

export default useStyles;
