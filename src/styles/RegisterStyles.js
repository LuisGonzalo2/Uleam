import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: theme.spacing(3),
        borderRadius: theme.shape.borderRadius,
    },
    paper: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        boxShadow: theme.shadows[5],
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
    inputIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default useStyles;
