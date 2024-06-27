import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: theme.spacing(4),
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
    },
    fieldLabel: {
        fontWeight: 'bold',
    },
    fieldValue: {
        display: 'flex',
        alignItems: 'center',
    },
    fieldValueContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    saveButton: {
        marginTop: theme.spacing(2),
    },
}));

export default useStyles;
