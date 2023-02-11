import { useState, ChangeEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppBar, Box, Toolbar, Link, Button, Container } from '@mui/material';

import ElevationScroll from './ElevationScroll';
import Search from './Search';
import TemporaryDrawer from './TemporaryDrawer';
import UserMenu from './UserMenu';

function Header() {
  const { t } = useTranslation();
  const [auth, setAuth] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  return (
    <ElevationScroll>
      <AppBar position='sticky' color='inherit' variant='outlined'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Link
              variant='h6'
              component={RouterLink}
              to='/'
              underline='hover'
              color='inherit'
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              {t('product-name')}
            </Link>
            {auth && <Search />}
            <Box sx={{ flexGrow: 1 }} />
            <TemporaryDrawer auth={auth} handleChange={handleChange} />
            {auth ? <UserMenu /> : <Button color='inherit'>{t('login')}</Button>}
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}

export default Header;
