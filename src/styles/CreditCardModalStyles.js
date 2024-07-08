import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: 800,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none',
    },
    cardContainer: {
        perspective: 1000,
        margin: '0 auto',
    },
    card: {
        width: '100%',
        maxWidth: 400,
        height: 250,
        position: 'relative',
        transition: 'transform 0.6s',
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
    },
    isFlipped: {
        transform: 'rotateY(180deg)',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        borderRadius: '10px',
    },
    cardDetails: {
        position: 'absolute',
        top: '30%',
        left: '10%',
        color: '#000',
        fontSize: '18px',
        fontFamily: 'monospace',
    },
    cardNumber: {
        marginBottom: '20px',
    },
    cardName: {
        marginBottom: '20px',
    },
    cardExpiry: {
        marginBottom: '20px',
        position: 'absolute',
        top: '50%',
        left: '100%',
    },
    cardCvv: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '18px',
        fontFamily: 'monospace',
        color: '#000',
    },
    actions: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
    cardFront: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
    },
    cardBack: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
    },
}));

export default useStyles;
