import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import ArticleIcon from '@mui/icons-material/Article';
import FolderIcon from '@mui/icons-material/Folder';
import convertNumberToDate from '../../../../helpers/convertNumberToDate';
import convertBytesToKbMb from '../../../../helpers/convertBytesToKbMd';
import { addActiveClassOnDriveItem } from '../../../../helpers/handleFileItem';
import { FileProps } from '../../../../types/types';
import { useAppDispatch } from '../../../../../../hooks/hooks';
import { setFileInfo } from '../../../../../../store/slices/fileInfo';

const DriveItemStyle = styled.div`
  display: grid;
  padding: 0 10px;
  align-items: center;
  border-bottom: solid 1px #dadce0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  grid-template-columns: 6fr 2fr 4fr 1fr;
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

export default function DriveItem({ file, onContextMenu, isFile }: FileProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { convertedSize, convertedName } = convertBytesToKbMb(file.size);
  const sizeString = `${convertedSize}${t(`explorer.${convertedName}`)}`;

  function handleFile(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    addActiveClassOnDriveItem(e);
    dispatch(setFileInfo(file));
  }

  return (
    <DriveItemStyle
      className='file-item'
      itemType={isFile ? 'file' : 'folder'}
      role='presentation'
      onContextMenu={(e) => onContextMenu(e)}
      onClick={(e) => handleFile(e)}
      id={`${file.id}`}
    >
      <DriveItemName>
        {isFile ? <ArticleIcon /> : <FolderIcon />}
        <span>{file.name}</span>
      </DriveItemName>

      <div className='file-item-info file-item-owner'>
        <span>{file.owner}</span>
      </div>

      <div className='file-item-info file-item-time'>
        <span>{convertNumberToDate(file.lastChange)}</span>
      </div>

      <div className='file-item-info file-item-size'>
        <span>{sizeString}</span>
      </div>
    </DriveItemStyle>
  );
}