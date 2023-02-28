import { ChangeEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import { UploadFile } from '@mui/icons-material';
import { useCreateFileMutation } from '../../../../store/api/filesApi';

interface IModal {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}

export default function ModalCreateFile({ anchorEl, open, handleClose }: IModal) {
  const { t } = useTranslation();
  const [createFile] = useCreateFileMutation();
  const fileInput = useRef<HTMLInputElement>(null);

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('name', file.name);
    formData.append('size', `${file.size}`);
    formData.append('info', '');
    formData.append('filePath', '');
    formData.append('type', 'file');
    formData.append('file', file);

    await createFile(formData);
    handleClose();
  };

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      <MenuList>
        <MenuItem onClick={() => fileInput.current?.click()}>
          <ListItemIcon>
            <UploadFile />
          </ListItemIcon>
          <ListItemText>{t('explorer.fileupload')}</ListItemText>
          <input type='file' hidden ref={fileInput} onChange={(e) => uploadFile(e)} />
        </MenuItem>
      </MenuList>
    </Menu>
  );
  /* eslint-enable react/jsx-props-no-spreading */
}
