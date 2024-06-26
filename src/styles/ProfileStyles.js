import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4),
    },
    gridContainer: {
        marginTop: theme.spacing(4),
    },
    logoutButton: {
        marginTop: theme.spacing(4),
    },
}));

export default useStyles;
