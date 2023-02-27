import { useMemo } from 'react';
import { Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeSettingModal } from '../../store/slices/modalSlice';
import { removeFileInfo } from '../../store/slices/fileInfo';
import { setSort } from '../../store/slices/filterSlice';
import { removeActiveClassOnDriveItem } from './helpers/handleFileItem';
import DriveHeader from './components/DriveHeader';
import DriveList from './components/DriveList';
import sortFiles from './helpers/sortFiles';
import { AllDrive, MyFile, MyFolder } from './types/types';

function Drive() {
  const dispatch = useAppDispatch();

  const currentDrive = useAppSelector((store) => store.files.currentDrive) as keyof AllDrive;
  const { files, name } = useAppSelector((store) => store.files.allDrive[currentDrive]);
  const { query, sort, isReverse } = useAppSelector((store) => store.filter);

  function filteredByQuery(value: string, array: MyFile[] | MyFolder[]) {
    if (value.length > 0) {
      return [
        ...array.filter((item) => item.name.toLocaleUpperCase().includes(value.toUpperCase())),
      ];
    }
    return [...array];
  }

  const filteredFiles = useMemo(() => filteredByQuery(query, files), [files, query]);

  const filteredAndSortFiles = useMemo(
    () => sortFiles(sort, filteredFiles, isReverse),
    [sort, filteredFiles, isReverse],
  );

  function hiddenModal(e: React.MouseEvent<HTMLElement>) {
    if (e.target === null) return;
    const target = e.target as HTMLElement;
    const isLangButtons = target.classList.contains('setting-button-lang');
    if (!isLangButtons) dispatch(changeSettingModal(false));
    const isFileItem = target.classList.contains('file-item');
    if (!isFileItem) {
      removeActiveClassOnDriveItem();
      dispatch(removeFileInfo(null));
    }
    dispatch(setSort(null));
  }

  return (
    <Container
      component='main'
      maxWidth='xl'
      onClick={(e) => hiddenModal(e)}
      sx={{ my: 2, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 220px)' }}
    >
      <DriveHeader name={name} />
      <DriveList files={filteredAndSortFiles} />
    </Container>
  );
}

export default Drive;
