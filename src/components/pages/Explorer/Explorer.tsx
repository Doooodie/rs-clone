import { useAppDispatch } from '../../hooks';
import { changeHeaderModal, changeAsideModal, changeSettingModal } from '../../store/modalSlice';
import Aside from './components/Aside/Aside';
import Drive from './components/Drive/Drive';
import Header from './components/Header/Header';
import './Explorer.css';
import { removeActiveClassOnDriveItem } from './helpers/handleFileItem';

function Explorer() {
  const dispatch = useAppDispatch();

  function hiddenModal(e: React.MouseEvent<HTMLDivElement>) {
    dispatch(changeHeaderModal(false));
    dispatch(changeAsideModal(false));

    if (e.target === null) return;
    const target = e.target as HTMLElement;
    const isLangButtons = target.classList.contains('setting-button-lang');
    if (!isLangButtons) dispatch(changeSettingModal(false));
    const isFileItem = target.classList.contains('file-item');
    if (!isFileItem) removeActiveClassOnDriveItem();
  }

  return (
    <div role='presentation' id='explorer' className='explorer' onClick={(e) => hiddenModal(e)}>
      <Header />
      <main className='main'>
        <Aside />
        <Drive />
      </main>
    </div>
  );
}

export default Explorer;
