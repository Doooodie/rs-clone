import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppDispatch } from '../../../../hooks';
import { removeFile } from '../../../../store/driveSlice';
import convertNumberToDate from '../../helpers/convertNumberToDate';
import convertBytesToKbMb from '../../helpers/convertBytesToKbMd';
import './File.css';

type FileProps = {
  name: string;
  owner: string;
  lastChange: number;
  size: number;
  id: number;
};

export default function File({ name, owner, lastChange, size, id }: FileProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { convertedSize, convertedName } = convertBytesToKbMb(size);
  const sizeString = `${convertedSize}${t(`explorer.${convertedName}`)}`;
  function hadleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    dispatch(removeFile(id));
  }

  return (
    <div className='file-item'>
      <div className='file-item-img'>
        <img
          src='https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document'
          alt='docs'
        />
        <span>{name}</span>
      </div>

      <div className='file-item-info file-item-owner'>
        <span>{owner}</span>
      </div>

      <div className='file-item-info file-item-time'>
        <span>{convertNumberToDate(lastChange)}</span>
      </div>

      <div className='file-item-info file-item-size'>
        <span>{sizeString}</span>
        <IconButton onContextMenu={(e) => hadleDelete(e)}>
          <DeleteForeverIcon color='error' />
        </IconButton>
      </div>
    </div>
  );
}
