import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import ArticleIcon from '@mui/icons-material/Article';
import FolderIcon from '@mui/icons-material/Folder';
import convertNumberToDate from '../../../../helpers/convertNumberToDate';
import convertBytesToKbMb from '../../../../helpers/convertBytesToKbMd';
import { addActiveClassOnDriveItem } from '../../../../helpers/handleFileItem';
import { FileProps } from '../../../../types/types';

const DriveItemStyle = styled.div`
  display: grid;
  padding: 0 10px;
  align-items: center;
  border-bottom: solid 1px #dadce0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  grid-template-columns: 7fr 2fr 3fr 1fr;
  color: #3c4043;
  font-size: 13px;
  &:hover {
    background-color: rgba(60 60 60 / 10%);
  }
`;

const DriveItemName = styled('div')({
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'bold',
  gap: '1rem',
});

export default function DriveItem({
  name,
  owner,
  lastChange,
  size,
  id,
  onContextMenu,
  isFile,
}: FileProps) {
  const { t } = useTranslation();
  const { convertedSize, convertedName } = convertBytesToKbMb(size);
  const sizeString = `${convertedSize}${t(`explorer.${convertedName}`)}`;

  return (
    <DriveItemStyle
      itemType={isFile ? 'file' : 'folder'}
      role='presentation'
      onContextMenu={(e) => onContextMenu(e)}
      onClick={(e) => addActiveClassOnDriveItem(e)}
      id={`${id}`}
    >
      <DriveItemName>
        {isFile ? <ArticleIcon /> : <FolderIcon />}
        <span>{name}</span>
      </DriveItemName>

      <div className='file-item-info file-item-owner'>
        <span>{owner}</span>
      </div>

      <div className='file-item-info file-item-time'>
        <span>{convertNumberToDate(lastChange)}</span>
      </div>

      <div className='file-item-info file-item-size'>
        <span>{sizeString}</span>
      </div>
    </DriveItemStyle>
  );
}
