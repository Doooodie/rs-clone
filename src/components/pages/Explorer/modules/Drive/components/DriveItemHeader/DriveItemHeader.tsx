import { IconButton } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import { useTranslation } from 'react-i18next';

export default function DriveItemHeader() {
  const { t } = useTranslation();
  return (
    <div className='file-list-item sticky'>
      <div className='file-item-info file-item-name'>
        <span>{t(`explorer.filename`)}</span>
        <IconButton>
          <NorthIcon fontSize='small' />
        </IconButton>
      </div>
      <div className='file-list-info file-list-owner'>
        <span>{t(`explorer.owner`)}</span>
      </div>

      <div className='file-item-info file-item-time'>
        <span>{t(`explorer.modified`)}</span>
      </div>

      <div className='file-item-size file-item-size'>
        <span>{t(`explorer.size`)}</span>
      </div>
    </div>
  );
}
