import { Link as RouterLink, useLocation, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppBar, Box, Toolbar, Link, Button, Container, Divider } from '@mui/material';

import ElevationScroll from './ElevationScroll';
import Search from './Search';
import TemporaryDrawer from './TemporaryDrawer';
import UserMenu from './UserMenu';
import { useAppSelector } from '../../../../hooks/hooks';

function Header() {
  const { t } = useTranslation();
  const authToken = useAppSelector((store) => store.auth.token);
  const auth = !!authToken;
  const [, setSearchParams] = useSearchParams();

  const location = useLocation();
  const isInDrive = location.pathname.includes('drive');
  const linkStyle = isInDrive ? { display: { xs: 'none', sm: 'block' } } : null;

  return (
    <ElevationScroll>
      <AppBar position='sticky' color='inherit'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Link
              variant='h6'
              component={RouterLink}
              to='/'
              underline='hover'
              color='inherit'
              sx={linkStyle}
            >
              {t('layout.product-name')}
            </Link>
            {isInDrive && <Search />}
            <Box sx={{ flexGrow: 1 }} />
            <TemporaryDrawer />
            {auth ? (
              <UserMenu />
            ) : (
              <Button color='inherit' onClick={() => setSearchParams({ auth: 'signin' })}>
                {t('layout.login')}
              </Button>
            )}
          </Toolbar>
        </Container>
        <Divider />
      </AppBar>
    </ElevationScroll>
  );
}

export default Header;
