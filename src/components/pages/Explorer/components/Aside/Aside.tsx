import GooglePlusIcon from '../../../../../assets/SvgComponents/GooglePlusIcon';
import MyDescIcon from '../../../../../assets/SvgComponents/MyDescIcon';
import StarIcon from '../../../../../assets/SvgComponents/StarIcon';
import CartIcon from '../../../../../assets/SvgComponents/CartIcon';
import SkyIcon from '../../../../../assets/SvgComponents/SkyIcon';
import './Aside.css';

export default function Aside() {
  return (
    <div className='aside'>
      <button type='button' className='aside-button'>
        <GooglePlusIcon />
        <span>Создать</span>
      </button>
      <div className='aside-list'>
        <div className='aside-list-item'>
          <span className='icon'>
            <MyDescIcon />
          </span>
          <span>Мой диск</span>
        </div>
        <div className='aside-list-item'>
          <span className='icon'>
            <StarIcon />
          </span>
          <span>Помеченные</span>
        </div>
        <div className='aside-list-item'>
          <span className='icon'>
            <CartIcon />
          </span>
          <span>Корзина</span>
        </div>
      </div>
      <div className='aside-list-item sky-item'>
        <span className='icon'>
          <SkyIcon />
        </span>
        <span>Хранилище</span>
      </div>
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
