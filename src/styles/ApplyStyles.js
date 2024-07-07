import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
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
    subtitle: {
        marginBottom: theme.spacing(2),
        fontStyle: 'italic',
    },
    form: {
        marginTop: theme.spacing(2),
    },
    field: {
        marginBottom: theme.spacing(2),
    },
}));

export default useStyles;
