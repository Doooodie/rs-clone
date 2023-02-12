import { useState, MouseEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar, IconButton, MenuItem, Menu, Tooltip, Box } from '@mui/material';
import stringAvatar from './StringAvatar';

function UserMenu() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title={t('layout.user-menu')}>
        <IconButton onClick={handleMenu}>
          <Avatar sx={stringAvatar('Kostya Yurkevich').sx}>
            {stringAvatar('Kostya Yurkevich').children}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id='menu-appbar'
        sx={{ mt: 8 }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={RouterLink} onClick={handleClose} to='/drive'>
          {t('layout.explorer-link')}
        </MenuItem>
        <MenuItem onClick={handleClose}>{t('layout.logout')}</MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenu;
