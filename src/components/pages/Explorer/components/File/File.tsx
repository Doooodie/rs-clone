import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from 'react';
import { useAppDispatch } from '../../../../hooks';
import { removeFile } from '../../../../store/driveSlice';
import './File.css';

type FileProps = {
  name: string;
  owner: string;
  lastChange: string;
  size: string;
  id: number;
};

export default function File({ name, owner, lastChange, size, id }: FileProps) {
  const dispatch = useAppDispatch();

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
        <span>{lastChange}</span>
      </div>

      <div className='file-item-info file-item-size'>
        <span>{size}</span>
        <IconButton onContextMenu={(e) => hadleDelete(e)}>
          <DeleteForeverIcon color='error' />
        </IconButton>
      </div>
    </div>
  );
}
