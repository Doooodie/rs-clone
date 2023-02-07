import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppDispatch } from '../../../../hooks';
import { removeFolder } from '../../../../store/driveSlice';
import convertNumberToDate from '../../helpers/convertNumberToDate';
import convertBytesToKbMb from '../../helpers/convertBytesToKbMd';
import FolderIcon from '../../../../../assets/SvgComponents/FolderIcon';
import { addActiveClassOnDriveItem } from '../../helpers/handleFileItem';

type FolderComponentProps = {
  name: string;
  owner: string;
  lastChange: number;
  size: number;
  id: number;
};

export default function FolderComponent({
  name,
  owner,
  lastChange,
  size = 0,
  id,
}: FolderComponentProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { convertedSize, convertedName } = convertBytesToKbMb(size);
  const sizeString = `${convertedSize}${t(`explorer.${convertedName}`)}`;

  function hadleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    dispatch(removeFolder(id));
  }

  return (
    <div role='presentation' className='file-item' onClick={(e) => addActiveClassOnDriveItem(e)}>
      <div className='file-item-img'>
        <FolderIcon />
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
