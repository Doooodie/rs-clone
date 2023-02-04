import { MouseEvent } from 'react';
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

  function handleModalOpen(e: MouseEvent) {
    e.stopPropagation();
    dispatch(changeAsideModal(!modalVisible));
  }

  return (
    <div className='aside'>
      <div className='aside-create'>
        <button type='button' className='aside-button' onClick={(e) => handleModalOpen(e)}>
          <GooglePlusIcon />
          <span>Создать</span>
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
          <span>Мой диск</span>
        </button>
        <button type='button' className='aside-list-item' onClick={(e) => handleAsideItem(e)}>
          <span className='icon'>
            <StarIcon />
          </span>
          <span>Помеченные</span>
        </button>
        <button type='button' className='aside-list-item' onClick={(e) => handleAsideItem(e)}>
          <span className='icon'>
            <CartIcon />
          </span>
          <span>Корзина</span>
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
        <span>Хранилище</span>
      </button>
      <div className='storage-info'>
        <div className='progress-bar'>
          <div style={{ width: '10%' }} className='progress-value' />
        </div>

        <span className='storage-text'>Использовано 1 ГБ из 15 ГБ</span>

        <button type='button' className='byu-memory'>
          Купить больше места
        </button>
      </div>
    </div>
  );
}
