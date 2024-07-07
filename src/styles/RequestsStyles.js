import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        margin: theme.spacing(3),
        maxWidth: '100%',
        boxShadow: theme.shadows[3],
    },
    title: {
        marginBottom: theme.spacing(2),
        fontWeight: 'bold',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(2),
    },
}));

export default useStyles;
