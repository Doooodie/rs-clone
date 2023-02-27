import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Box, Divider, Button, Toolbar } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

import { useAppDispatch } from '../../../hooks/hooks';
import { addFile } from '../../../store/slices/driveSlice';
import ModalCreateFile from './Modals/ModalCreateFile';

export default function DriveHeader() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleAddFile() {
    dispatch(
      addFile({
        name: 'test1',
        owner: 'me',
        lastChange: 33333,
        size: 13,
        id: Math.random(),
      }),
    );
  }

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
        <Box sx={{ flexGrow: 1 }} />
        <Button variant='outlined' onClick={() => handleAddFile()}>
          {t('explorer.byumore')}
        </Button>
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
