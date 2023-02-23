import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Paper } from '@mui/material';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileApi, MyFile } from '../../../types/types';
import { addFile } from '../../../../../store/slices/driveSlice';
import { useAppDispatch } from '../../../../../hooks/hooks';
import MyDialog from '../Dialog/Dialog';
import './ModalCreateFile.css';
import { useCreateFileMutation } from '../../../../../store/api/filesApi';

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
  const [createFile] = useCreateFileMutation();

  function handleCreatefolder() {
    // const currentDate = Number(new Date());
    const newFolder: FileApi = {
      name: folderName || 'Untitled folder',
      size: 0,
      info: '',
      filePath: '',
      type: 'dir',
    };
    createFile(newFolder);
    handleClose();
  }

  const onUploadClick = () => {
    if (inputFile.current !== null) inputFile.current.click();
  };

  function addFileOnClick(file: File) {
    const uploaderFile: MyFile = {
      name: file.name,
      // todo userID
      owner: 'Me',
      lastChange: file.lastModified,
      size: file.size,
      // todo Id
      id: Math.random(),
    };
    // todo add file to server
    dispatch(addFile(uploaderFile));
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const uploaderFiles = e.target.files;
    if (uploaderFiles) {
      for (let i = 0; i < uploaderFiles.length; i += 1) {
        const uploadFile = uploaderFiles[i];
        addFileOnClick(uploadFile);
      }
    }
  }

  return (
    <div
      className='modal-list'
      id='modal-list-create-file'
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
          <input
            id='file'
            type='file'
            ref={inputFile}
            style={{ display: 'none' }}
            onChange={(e) => onChangeHandler(e)}
          />
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
