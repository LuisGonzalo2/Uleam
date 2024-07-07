import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    questionContainer: {
        marginTop: theme.spacing(2),
    },
    question: {
        fontWeight: 'bold',
    },
    answer: {
        marginLeft: theme.spacing(1),
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(3),
    },
}));

export default useStyles;
