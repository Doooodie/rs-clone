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

interface IModal {
  visible: boolean;
}

export default function ModalCreateFile({ visible }: IModal) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <span>Создать папку</span>
        </button>
        <div className='header-actions-item'>
          <UploadFileIcon htmlColor='#5f6368' />
          <span>Загрузить файлы</span>
        </div>
        <div className='header-actions-item'>
          <DriveFolderUploadIcon htmlColor='#5f6368' />
          <span>Загрузить папку</span>
        </div>
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Новая папка</DialogTitle>
        <DialogContent>
          <TextField
            placeholder='Без названия'
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
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleClose}>Создать</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
