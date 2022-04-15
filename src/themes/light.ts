import { ThemeOptions } from '@mui/material/styles';

export const lightTheme: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            light: '#8187ff',
            main: '#3d5afe', //'#fe815f',
            dark: '#0031ca',
            contrastText: "#fff"
        },
        secondary: {
            main: '#254bb8',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#000',
        },
        background: {
            default: '#EFF3F8',
            paper: '#FAFBFC'
        },
    }
}