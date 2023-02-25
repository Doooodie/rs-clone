import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Box, Divider, Button, IconButton, Toolbar } from '@mui/material';
import { InfoOutlined, ArrowDropDown } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks';
import { changeFileInfoModal } from '../../../../../../store/slices/modalSlice';
import { addFile } from '../../../../../../store/slices/driveSlice';
import ModalCreateFile from '../../../Modals/CreateModal/ModalCreateFile';

interface IDriveHeader {
  name: string;
}

export default function DriveHeader({ name }: IDriveHeader) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const fileInfoVisible = useAppSelector((store) => store.modal.fileInfo);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleInfoOpen(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    dispatch(changeFileInfoModal(!fileInfoVisible));
  }

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
    <AppBar position='static' color='transparent' component='div'>
      <Toolbar disableGutters variant='dense'>
        <Button
          onClick={(e) => setAnchorEl(e.currentTarget)}
          endIcon={<ArrowDropDown />}
          color='inherit'
        >
          {t(`explorer.${name}`)}
        </Button>
        <ModalCreateFile anchorEl={anchorEl} open={open} handleClose={handleClose} />
        <Box sx={{ flexGrow: 1 }} />
        <Button variant='outlined' onClick={() => handleAddFile()}>
          {t('explorer.byumore')}
        </Button>
        <IconButton onClick={(e) => handleInfoOpen(e)}>
          <InfoOutlined />
        </IconButton>
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
