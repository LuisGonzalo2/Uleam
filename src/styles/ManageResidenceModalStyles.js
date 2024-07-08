import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        padding: theme.spacing(3),
        maxWidth: 800,
        margin: 'auto',
        textAlign: 'center',
        boxShadow: theme.shadows[3],
        backgroundColor: theme.palette.background.default,
    },
    title: {
        marginBottom: theme.spacing(2),
        fontWeight: 'bold',
    },
    field: {
        marginBottom: theme.spacing(2),
    },
    actions: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: '1rem',
        color: '#A3A8A9',
    }
}));

export default useStyles;
