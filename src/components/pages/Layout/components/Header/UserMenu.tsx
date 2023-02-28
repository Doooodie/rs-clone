import { useState, MouseEvent } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar, IconButton, MenuItem, Menu, Tooltip, Box } from '@mui/material';
import stringAvatar from './StringAvatar';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setCredentials } from '../../../../store/slices/authSlice';

function UserMenu() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const username = useAppSelector((store) => store.auth.name);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    dispatch(setCredentials({ name: '', token: '', id: -1 }));
    handleClose();
    navigate('/');
  };

  return (
    <Box>
      <Tooltip title={t('layout.user-menu')}>
        <IconButton onClick={handleMenu}>
          <Avatar sx={stringAvatar(username).sx}>{stringAvatar(username).children}</Avatar>
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
        <MenuItem onClick={logOut}>{t('layout.logout')}</MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenu;
