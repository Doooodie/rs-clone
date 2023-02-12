import styled from 'styled-components';
import FolderIcon from '@mui/icons-material/Folder';
import { useTranslation } from 'react-i18next';
import { MyFile } from '../../../../../types/types';
import convertNumberToDate from '../../../../../helpers/convertNumberToDate';
import convertBytesToKbMb from '../../../../../helpers/convertBytesToKbMd';

const DetailsContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  ul {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    align-items: flex-start;
    gap: 1.125rem;
    width: 100%;
    padding: 10px;

    p {
      margin: 0;
      font-size: 12px;
      color: var(--gray-medium);
      font-weight: 500;
    }

    span {
      font-size: 12px;
      color: var(--gray);
    }
  }
`;

const DetailsPreviewStyled = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type DriveItemInfoContentProps = {
  file: MyFile;
};

export default function DetailsContent({ file }: DriveItemInfoContentProps) {
  const { t } = useTranslation();
  const { convertedSize, convertedName } = convertBytesToKbMb(file.size);
  const sizeString = `${convertedSize}${t(`explorer.${convertedName}`)}`;

  return (
    <DetailsContentStyled>
      <DetailsPreviewStyled>
        <FolderIcon htmlColor='var(--gray)' style={{ fontSize: '6rem' }} />
      </DetailsPreviewStyled>
      <ul>
        <li>
          <p>Type</p>
          <span>{file.name}</span>
        </li>
        <li>
          <p>Size</p>
          <span>{sizeString}</span>
        </li>
        <li>
          <p>Owner</p>
          <span>{file.owner}</span>
        </li>
        <li>
          <p>Created</p>
          <span>{convertNumberToDate(file.lastChange)}</span>
        </li>
      </ul>
    </DetailsContentStyled>
  );
}
