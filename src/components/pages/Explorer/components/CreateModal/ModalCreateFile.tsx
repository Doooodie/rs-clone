import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
} from '@mui/material';
import './ModalCreateFile.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IModal {
  visible: boolean;
}

export default function ModalCreateFile({ visible }: IModal) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();

  return (
    <div
      className='modal-list'
      style={visible ? { opacity: 1, zIndex: 100 } : { opacity: 0, zIndex: -1 }}
    >
      <Paper elevation={3} sx={{ width: '100%' }}>
        <button
          type='button'
          className='header-actions-item header-actions-item-main'
          onClick={handleOpen}
        >
          <AddToDriveIcon htmlColor='#5f6368' />
          <span>{t('explorer.createdir')}</span>
        </button>
        <div className='header-actions-item'>
          <UploadFileIcon htmlColor='#5f6368' />
          <span>{t('explorer.fileupload')}</span>
        </div>
        <div className='header-actions-item'>
          <DriveFolderUploadIcon htmlColor='#5f6368' />
          <span>{t('explorer.dirupload')}</span>
        </div>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('explorer.newdir')}</DialogTitle>
        <DialogContent>
          <TextField
            placeholder={t('explorer.dirname') || ''}
            sx={{ minWidth: '300px', padding: '0 20px' }}
            autoFocus
            margin='dense'
            size='small'
            type='text'
            fullWidth
            variant='outlined'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('explorer.cancel')}</Button>
          <Button onClick={handleClose}>{t('explorer.create')}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
