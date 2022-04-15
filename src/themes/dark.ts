import { ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        neutral: Palette['primary'];
    }
    interface PaletteOptions {
        neutral: PaletteOptions['primary'];
    }
}

export const darkTheme: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            light: '#e3f2fd',
            main: '#90caf9', //'#fe815f',
            dark: '#42a5f5',
            contrastText: "#fff"
        },
        secondary: {
            main: '#424859',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
        background: {
            default: '#252A37',
            paper: '#2e3343',
        },
        text: {
            primary: '#fff',
            secondary: '#72798a'
        },
    }
}