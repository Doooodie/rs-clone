import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import GooglePlusIcon from '../../../../../assets/SvgComponents/GooglePlusIcon';
import MyDescIcon from '../../../../../assets/SvgComponents/MyDescIcon';
import StarIcon from '../../../../../assets/SvgComponents/StarIcon';
import CartIcon from '../../../../../assets/SvgComponents/CartIcon';
import SkyIcon from '../../../../../assets/SvgComponents/SkyIcon';
import ModalCreateFile from '../CreateModal/ModalCreateFile';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { changeAsideModal } from '../../../../store/modalSlice';
import { addFile, changeCurrentDrive } from '../../../../store/driveSlice';
import { DrivesNames, ButtonClassNames } from '../../types/enums';
import { AllDrive } from '../../types/types';
import './Aside.css';

export default function Aside() {
  const dispatch = useAppDispatch();
  const modalVisible = useAppSelector((store) => store.modal.asideModal);
  const { t } = useTranslation();
  const currentDriveName = useAppSelector((store) => store.files.currentDrive);

  function handleModalOpen(e: MouseEvent) {
    e.stopPropagation();
    dispatch(changeAsideModal(!modalVisible));
  }

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

  function isActive(buttonName: string) {
    return buttonName === currentDriveName;
  }

  function handleSwitchDrivePandel(id: keyof AllDrive) {
    dispatch(changeCurrentDrive(id));
  }

  const MAX_STORAGE_SIZE = 15;
  const CURRENT_STORAGE_SIZE = 1;

  const MAX_STORAGE_SIZE_STRING = `${String(MAX_STORAGE_SIZE)}${t('explorer.gb')}`;
  const CURRENT_STORAGE_SIZE_STRING = `${String(CURRENT_STORAGE_SIZE)}${t('explorer.gb')}`;
  const USE = t('explorer.use');
  const OF = t('explorer.of');
  const usedDriveString = `${USE} ${CURRENT_STORAGE_SIZE_STRING} ${OF} ${MAX_STORAGE_SIZE_STRING}`;

  return (
    <div className='aside'>
      <div className='aside-create'>
        <button type='button' className='aside-button' onClick={(e) => handleModalOpen(e)}>
          <GooglePlusIcon />
          <span>{t('explorer.create')}</span>
        </button>
        <ModalCreateFile visible={modalVisible} />
      </div>

      <div className='aside-list'>
        <button
          type='button'
          className={
            isActive(DrivesNames.drive) ? ButtonClassNames.active : ButtonClassNames.default
          }
          onClick={() => handleSwitchDrivePandel(DrivesNames.drive)}
        >
          <span className='icon'>
            <MyDescIcon />
          </span>
          <span>{t('explorer.mydrive')}</span>
        </button>

        <button
          type='button'
          className={
            isActive(DrivesNames.important) ? ButtonClassNames.active : ButtonClassNames.default
          }
          onClick={() => handleSwitchDrivePandel(DrivesNames.important)}
        >
          <span className='icon'>
            <StarIcon />
          </span>
          <span>{t('explorer.important')}</span>
        </button>

        <button
          type='button'
          className={
            isActive(DrivesNames.trash) ? ButtonClassNames.active : ButtonClassNames.default
          }
          onClick={() => handleSwitchDrivePandel(DrivesNames.trash)}
        >
          <span className='icon'>
            <CartIcon />
          </span>
          <span>{t('explorer.cart')}</span>
        </button>
      </div>
      <button
        type='button'
        className={
          isActive(DrivesNames.storage) ? ButtonClassNames.active : ButtonClassNames.default
        }
        onClick={() => handleSwitchDrivePandel(DrivesNames.storage)}
      >
        <span className='icon'>
          <SkyIcon />
        </span>
        <span>{t('explorer.storage')}</span>
      </button>

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
