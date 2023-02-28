import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Divider, Button, Toolbar } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

import ModalCreateFile from './Modals/ModalCreateFile';

export default function DriveHeader() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position='static' color='transparent' component='div' elevation={0}>
      <Toolbar disableGutters variant='dense'>
        <Button
          onClick={(e) => setAnchorEl(e.currentTarget)}
          endIcon={<ArrowDropDown />}
          color='inherit'
        >
          {t(`explorer.drive`)}
        </Button>
        <ModalCreateFile anchorEl={anchorEl} open={open} handleClose={handleClose} />
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
