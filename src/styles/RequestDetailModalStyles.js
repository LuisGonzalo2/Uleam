import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(4),
        outline: 'none',
        maxWidth: '600px',
        margin: 'auto',
        marginTop: theme.spacing(5),
    },
    header: {
        textAlign: 'center',
        marginBottom: theme.spacing(2),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    fieldLabel: {
        fontWeight: 'bold',
    },
    fieldValue: {
        marginBottom: theme.spacing(1),
    },
    questionContainer: {
        marginBottom: theme.spacing(2),
    },
    question: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
    },
    answer: {
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    answerDivider: {
        margin: theme.spacing(1, 0),
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(4),
    },
    button: {
        minWidth: '120px',
    },
}));

export default useStyles;
