import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
// Language
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { initLocale } from "./locales";
// Theme
import type { } from '@mui/x-data-grid/themeAugmentation';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { darkTheme } from './themes/dark';
// Local
import App from './App';
import './App.css';
import { store } from './store';
import * as serviceWorker from './serviceWorker';
import { lightTheme } from './themes/light';
import { DynamicWeb3Provider } from './abstraction/provider/DynamicProvider';


const Root = () => {
  const [darkMode, setDarkMode] = React.useState(true);
  //const [glassMode, setGlassMode] = React.useState(true);
  const preferredMode = useMediaQuery('(prefers-color-scheme: dark)')

  useEffect(() => {
    initLocale();
    // Get info about user preferences (set on machine)
    setDarkMode(preferredMode);
  }, [preferredMode]);

  // Set palette
  const pTheme = createTheme({
    palette: darkMode ? darkTheme.palette : lightTheme.palette
  })
  // Set theme and styling
  const theme = createTheme({
    palette: pTheme.palette,
    typography: {
      fontFamily: ['Rubik', 'Rubik-Light', 'Space Mono'].join(','),
      button: {
        textTransform: 'none'
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Rubik';
          }
        `,
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            //backgroundColor: pTheme.palette.background.default
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            outline: darkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
            boxShadow: 'none',
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          text: {
            color: pTheme.palette.text.primary
          }
        }
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            // TODO: implement standard styling
          },
        },
      }
    },
    shape: {
      borderRadius: 5,
    },
  });

  return (
    <React.StrictMode>
      <Provider store={store}>
        <I18nProvider i18n={i18n}>
          <DynamicWeb3Provider>
            <ThemeProvider theme={theme}>
              <BrowserRouter>
                <App setDarkMode={setDarkMode} />
              </BrowserRouter>
            </ThemeProvider>
          </DynamicWeb3Provider>
        </I18nProvider>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
