import { IconButton } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks';
import { changeReverse, setSort } from '../../../../../../store/slices/filterSlice';

const DriveItemHeaderName = styled.div`
  display: flex;
  width: 100%;
  min-width: 100px;
  height: 40px;
  padding: 0.5rem 0;
  align-items: center;
  justify-content: flex-start;
  font-weight: bold;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
`;

export default function DriveItemHeader() {
  const { t } = useTranslation();
  const { sort, isReverse } = useAppSelector((store) => store.filter);
  const dispatch = useAppDispatch();

  function handleSetSortValue(
    e: React.MouseEvent<HTMLDivElement>,
    sortName: 'name' | 'lastChange' | 'size',
  ) {
    e.stopPropagation();
    dispatch(setSort(sortName));
  }

  function handleReverse(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    dispatch(changeReverse(!isReverse));
  }
  return (
    <div className='file-list-item'>
      <DriveItemHeaderName role='presentation' onClick={(e) => handleSetSortValue(e, 'name')}>
        <span>{t(`explorer.filename`)}</span>
        {sort === 'name' && (
          <IconButton onClick={(e) => handleReverse(e)}>
            {isReverse ? <NorthIcon fontSize='small' /> : <SouthIcon fontSize='small' />}
          </IconButton>
        )}
      </DriveItemHeaderName>

      <DriveItemHeaderName>
        <span>{t(`explorer.owner`)}</span>
      </DriveItemHeaderName>

      <DriveItemHeaderName role='presentation' onClick={(e) => handleSetSortValue(e, 'lastChange')}>
        <span>{t(`explorer.modified`)}</span>
        {sort === 'lastChange' && (
          <IconButton onClick={(e) => handleReverse(e)}>
            {isReverse ? <NorthIcon fontSize='small' /> : <SouthIcon fontSize='small' />}
          </IconButton>
        )}
      </DriveItemHeaderName>

      <DriveItemHeaderName role='presentation' onClick={(e) => handleSetSortValue(e, 'size')}>
        <span>{t(`explorer.size`)}</span>
        {sort === 'size' && (
          <IconButton onClick={(e) => handleReverse(e)}>
            {isReverse ? <NorthIcon fontSize='small' /> : <SouthIcon fontSize='small' />}
          </IconButton>
        )}
      </DriveItemHeaderName>
    </div>
  );
}
