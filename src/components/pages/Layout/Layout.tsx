import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function Layout() {
  return (
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
    </Box>
  );
}

export default Layout;
