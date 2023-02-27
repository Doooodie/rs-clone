import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import { CreateNewFolderOutlined, UploadFile, DriveFolderUpload } from '@mui/icons-material';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../../hooks/hooks';
import { FileApi, MyFile } from '../../types/types';
import { addFile } from '../../../../store/slices/driveSlice';
import { useCreateFileMutation } from '../../../../store/api/filesApi';
import MyDialog from './Dialog';

interface IModal {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}

export default function ModalCreateFile({ anchorEl, open, handleClose }: IModal) {
  const { t } = useTranslation();
  const [folderName, setFolderName] = useState(t(`explorer.dirname`));
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [createFile] = useCreateFileMutation();

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => {
    setDialogOpen(false);
    handleClose();
  };

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
    handleDialogClose();
  }

  const onUploadClick = () => {
    if (inputFile.current !== null) inputFile.current.click();
    handleClose();
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
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      <MenuList>
        <MenuItem onClick={handleDialogOpen}>
          <ListItemIcon>
            <CreateNewFolderOutlined />
          </ListItemIcon>
          <ListItemText>{t('explorer.createdir')}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={onUploadClick}>
          <ListItemIcon>
            <UploadFile />
          </ListItemIcon>
          <ListItemText>{t('explorer.fileupload')}</ListItemText>
          <input
            id='file'
            type='file'
            ref={inputFile}
            hidden
            onChange={(e) => onChangeHandler(e)}
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DriveFolderUpload />
          </ListItemIcon>
          <ListItemText>{t('explorer.dirupload')}</ListItemText>
        </MenuItem>
      </MenuList>
      <MyDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        title={t('explorer.newdir')}
        placeholder={t('explorer.dirname') || ''}
        value={folderName || ''}
        onChange={(value) => setFolderName(value)}
        apply={t('explorer.create')}
        onApply={() => handleCreatefolder()}
        cancel={t('explorer.cancel')}
      />
    </Menu>
  );
}
