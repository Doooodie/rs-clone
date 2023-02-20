import { useAppDispatch } from '../../hooks/hooks';
import { changeSettingModal } from '../../store/slices/modalSlice';
import Aside from './modules/Aside/Aside';
import Drive from './modules/Drive/Drive';
import { removeActiveClassOnDriveItem } from './helpers/handleFileItem';
import { removeFileInfo } from '../../store/slices/fileInfo';
import { setSort } from '../../store/slices/filterSlice';

function Explorer() {
  const dispatch = useAppDispatch();

  function hiddenModal(e: React.MouseEvent<HTMLDivElement>) {
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
    <div role='presentation' id='explorer' className='explorer' onClick={(e) => hiddenModal(e)}>
      <main className='main'>
        <Aside />
        <Drive />
      </main>
    </div>
  );
}

export default Explorer;
