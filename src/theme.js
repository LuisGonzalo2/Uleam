import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5', // Puedes ajustar esto según los colores de la universidad
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#f4f6f8',
            paper: '#ffffff',
        },
        text: {
            primary: '#000000',
            secondary: '#ffffff',
        },
    },
    typography: {
        h3: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        h6: {
            fontSize: '1.25rem',
            fontWeight: 400,
        },
    },
    shape: {
        borderRadius: 8,
    },
    shadows: ['none', '0px 1px 3px rgba(0, 0, 0, 0.2)', '0px 1px 5px rgba(0, 0, 0, 0.12)', '0px 1px 8px rgba(0, 0, 0, 0.08)'],
});

export default theme;
