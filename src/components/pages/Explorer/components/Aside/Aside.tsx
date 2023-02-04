import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import GooglePlusIcon from '../../../../../assets/SvgComponents/GooglePlusIcon';
import MyDescIcon from '../../../../../assets/SvgComponents/MyDescIcon';
import StarIcon from '../../../../../assets/SvgComponents/StarIcon';
import CartIcon from '../../../../../assets/SvgComponents/CartIcon';
import SkyIcon from '../../../../../assets/SvgComponents/SkyIcon';
import './Aside.css';
import ModalCreateFile from '../CreateModal/ModalCreateFile';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { changeAsideModal } from '../../../../store/modalSlice';

function handleAsideItem({ currentTarget }: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
  const allButtons = document.querySelectorAll('.aside-list-item');
  allButtons.forEach((item) => {
    const button = item;
    button.classList.remove('aside-list-item-active');
  });
  currentTarget.classList.add('aside-list-item-active');
}

export default function Aside() {
  const dispatch = useAppDispatch();
  const modalVisible = useAppSelector((store) => store.modal.asideModal);
  const { t } = useTranslation();

  function handleModalOpen(e: MouseEvent) {
    e.stopPropagation();
    dispatch(changeAsideModal(!modalVisible));
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
          className='aside-list-item aside-list-item-active'
          onClick={(e) => handleAsideItem(e)}
        >
          <span className='icon'>
            <MyDescIcon />
          </span>
          <span>{t('explorer.mydrive')}</span>
        </button>
        <button type='button' className='aside-list-item' onClick={(e) => handleAsideItem(e)}>
          <span className='icon'>
            <StarIcon />
          </span>
          <span>{t('explorer.important')}</span>
        </button>
        <button type='button' className='aside-list-item' onClick={(e) => handleAsideItem(e)}>
          <span className='icon'>
            <CartIcon />
          </span>
          <span>{t('explorer.cart')}</span>
        </button>
      </div>
      <button
        type='button'
        className='sky-item aside-list-item'
        onClick={(e) => handleAsideItem(e)}
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

        <button type='button' className='byu-memory'>
          <span>{t('explorer.byumore')}</span>
        </button>
      </div>
    </div>
  );
}
