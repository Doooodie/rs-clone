import './Header.css';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTranslation } from 'react-i18next';
import SearchField from '../../components/UI/SearchField';
import SettingModal from '../../components/Modals/SettingModal/SettingModal';
import { changeSettingModal } from '../../../../store/modalSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

export default function Header() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const modalVisible = useAppSelector((store) => store.modal.settingModal);

  function handleModalOpen(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    dispatch(changeSettingModal(!modalVisible));
  }
  return (
    <header className='header'>
      <Link to='/'>
        <div className='header-logo'>
          <img
            src='https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png'
            alt=''
          />
          <span>{t('explorer.driver')}</span>
        </div>
      </Link>
      <div className='header-search'>
        <SearchField />
        <div className='setting'>
          <IconButton>
            <HelpOutlineIcon />
          </IconButton>

          <IconButton onClick={(e) => handleModalOpen(e)}>
            <SettingsIcon color={modalVisible ? 'primary' : 'inherit'} />
          </IconButton>
          <SettingModal visible={modalVisible} />
        </div>
      </div>
    </header>
  );
}
