import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Paper } from '@mui/material';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MyFolder } from '../../../types/types';
import { addFolder } from '../../../../../store/driveSlice';
import { useAppDispatch } from '../../../../../hooks';
import MyDialog from '../Dialog/Dialog';
import './ModalCreateFile.css';

interface IModal {
  visible: boolean;
}

export default function ModalCreateFile({ visible }: IModal) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState(t(`explorer.dirname`));
  const dispatch = useAppDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const inputFile = useRef<HTMLInputElement | null>(null);

  function handleCreatefolder() {
    // todo translation folder name
    // todo id and parent id
    const currentDate = Number(new Date());
    const newFolder: MyFolder = {
      id: Math.random(),
      name: folderName || 'Untitled folder',
      owner: 'Me',
      lastChange: currentDate,
      size: 0,
      files: [],
      children: [],
      parent: Math.random(),
    };
    dispatch(addFolder(newFolder));
    handleClose();
  }

  const onUploadClick = () => {
    if (inputFile.current !== null) inputFile.current.click();
  };

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
        <button type='button' className='header-actions-item' onClick={onUploadClick}>
          <UploadFileIcon htmlColor='#5f6368' />
          <span>{t('explorer.fileupload')}</span>
          <input type='file' ref={inputFile} style={{ display: 'none' }} />
        </button>
        <div className='header-actions-item'>
          <DriveFolderUploadIcon htmlColor='#5f6368' />
          <span>{t('explorer.dirupload')}</span>
        </div>
      </Paper>
      <MyDialog
        open={open}
        onClose={handleClose}
        title={t('explorer.newdir')}
        placeholder={t('explorer.dirname') || ''}
        value={folderName || ''}
        onChange={(value) => setFolderName(value)}
        apply={t('explorer.create')}
        onApply={() => handleCreatefolder()}
        cancel={t('explorer.cancel')}
      />
    </div>
  );
}
