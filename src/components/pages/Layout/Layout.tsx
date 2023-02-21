import { useState, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Fab, useMediaQuery } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ColorModeContext } from './components/Header/ThemeButtons';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setTheme } from '../../store/slices/appThemeSlice';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ScrollTop from './components/ScrollTop';
import Auth from './components/Auth';

function Layout() {
  const dispatch = useAppDispatch();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const savedTheme = useAppSelector((store) => store.appTheme.theme);

  if (!savedTheme) {
    if (prefersDarkMode) dispatch(setTheme('dark'));
    else dispatch(setTheme('light'));
  }

  const [mode, setMode] = useState<'dark' | 'light'>(savedTheme === 'dark' ? 'dark' : 'light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <SnackbarProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={responsiveFontSizes(theme)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <CssBaseline enableColorScheme />
            <Header />
            <Outlet />
            <Footer />
            <ScrollTop>
              <Fab size='small'>
                <KeyboardArrowUpIcon />
              </Fab>
            </ScrollTop>
            <Auth />
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </SnackbarProvider>
  );
}

export default Layout;
