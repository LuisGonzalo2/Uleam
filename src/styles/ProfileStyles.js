import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(3),
        margin: theme.spacing(3),
        maxWidth: '800px',
        width: '100%',
        boxShadow: theme.shadows[3],
    },
    title: {
        marginBottom: theme.spacing(2),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    fieldLabel: {
        fontWeight: 'bold',
        marginRight: theme.spacing(1),
    },
    fieldValue: {
        display: 'flex',
        alignItems: 'center',
        wordBreak: 'break-word',
    },
    saveButton: {
        marginTop: theme.spacing(2),
    },
    input: {
        flexGrow: 1,
        marginRight: theme.spacing(1),
    },
}));

export default useStyles;
