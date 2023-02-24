import { Container } from '@mui/material';
import { useAppDispatch } from '../../hooks/hooks';
import { changeSettingModal } from '../../store/slices/modalSlice';
import { removeFileInfo } from '../../store/slices/fileInfo';
import { setSort } from '../../store/slices/filterSlice';
import { removeActiveClassOnDriveItem } from './helpers/handleFileItem';
import Drive from './components/Drive/Drive';

function Explorer() {
  const dispatch = useAppDispatch();

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
    <Container component='main' maxWidth='xl' onClick={(e) => hiddenModal(e)}>
      <Drive />
    </Container>
  );
}

export default Explorer;
