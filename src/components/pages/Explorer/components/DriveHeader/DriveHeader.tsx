import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { changeHeaderModal } from '../../../../store/modalSlice';
import MenuArrowDownIcon from '../../../../../assets/SvgComponents/MenuArrowDown';
import ModalCreateFile from '../CreateModal/ModalCreateFile';
import './DriveHeader.css';

interface IDriveHeader {
  name: string;
}

export default function DriveHeader({ name }: IDriveHeader) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const modalVisible = useAppSelector((store) => store.modal.headerModal);

  function handleModalOpen(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    dispatch(changeHeaderModal(!modalVisible));
  }

  return (
    <div className='drive-header'>
      <div className={modalVisible ? `drive-header-menu visible` : 'drive-header-menu'}>
        <button
          type='button'
          className='drive-header-menu-button'
          onClick={(e) => handleModalOpen(e)}
        >
          <span>{t(`explorer.${name}`)}</span>
          <MenuArrowDownIcon />
        </button>
        <ModalCreateFile visible={modalVisible} />
      </div>
      <div className='setting'>
        <IconButton>
          <CalendarViewMonthIcon />
        </IconButton>

        <IconButton>
          <InfoIcon />
        </IconButton>
      </div>
    </div>
  );
}
