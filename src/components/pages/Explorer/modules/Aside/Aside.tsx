import { MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GooglePlusIcon from '../../../../../assets/SvgComponents/GooglePlusIcon';
import ModalCreateFile from '../../components/Modals/CreateModal/ModalCreateFile';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { addFile, changeCurrentDrive } from '../../../../store/driveSlice';
import AsideButton from './Components/AsideButton';
import { ButtonClassNames } from '../../types/enums';
import './Aside.css';

const names = ['drive', 'important', 'trash'];

export default function Aside() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const currentDriveName = useAppSelector((store) => store.files.currentDrive);
  const MAX_STORAGE_SIZE = 15;
  const CURRENT_STORAGE_SIZE = 1;
  const MAX_STORAGE_SIZE_STRING = `${String(MAX_STORAGE_SIZE)}${t('explorer.gb')}`;
  const CURRENT_STORAGE_SIZE_STRING = `${String(CURRENT_STORAGE_SIZE)}${t('explorer.gb')}`;
  const USE = t('explorer.use');
  const OF = t('explorer.of');
  const usedDriveString = `${USE} ${CURRENT_STORAGE_SIZE_STRING} ${OF} ${MAX_STORAGE_SIZE_STRING}`;

  function handleAddFile() {
    dispatch(
      addFile({
        name: 'test1',
        owner: 'me',
        lastChange: 33333,
        size: 13,
        id: Math.random(),
      }),
    );
  }

  function modalOpen(e: MouseEvent) {
    e.stopPropagation();
    setModalVisible(true);
  }

  useEffect(() => {
    const modalClose = () => setModalVisible(false);
    window.addEventListener('click', modalClose);
    return () => window.removeEventListener('click', modalClose);
  }, []);

  return (
    <div className='aside'>
      <div className='aside-create'>
        <button type='button' className='aside-button' onClick={(e) => modalOpen(e)}>
          <GooglePlusIcon />
          <span>{t('explorer.create')}</span>
        </button>
        <ModalCreateFile visible={modalVisible} />
      </div>

      <div className='aside-list'>
        {
          names.map((name) => {
            return <AsideButton 
              className = 
                { currentDriveName === name 
                ?  ButtonClassNames.active
                : ButtonClassNames.default
                }
              name={name}
              onClick={() => dispatch(changeCurrentDrive(name))}
              key={name}
            />
          })
        }
      </div>

      <div className='storage-info'>
        <div className='progress-bar'>
          <div style={{ width: '10%' }} className='progress-value' />
        </div>
        <span className='storage-text'>{usedDriveString}</span>
        <button type='button' className='byu-memory' onClick={() => handleAddFile()}>
          <span>{t('explorer.byumore')}</span>
        </button>
      </div>
    </div>
  );
}
