import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        boxShadow: theme.shadows[3],
        marginTop: theme.spacing(8),
    },
    title: {
        marginBottom: theme.spacing(2),
        fontWeight: 'bold',
    },
    subtitle: {
        marginBottom: theme.spacing(2),
        fontStyle: 'italic',
    },
}));

export default useStyles;
