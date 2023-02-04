import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import MenuArrowDownIcon from '../../../../../assets/SvgComponents/MenuArrowDown';
import './Files.css';
import ModalCreateFile from '../CreateModal/ModalCreateFile';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { changeHeaderModal } from '../../../../store/modalSlice';

export default function Files() {
  const dispatch = useAppDispatch();
  const modalVisible = useAppSelector((store) => store.modal.headerModal);

  function handleModalOpen(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    dispatch(changeHeaderModal(!modalVisible));
  }

  return (
    <section className='files'>
      <div className='files-header'>
        <div className={modalVisible ? `file-header-menu visible` : 'file-header-menu'}>
          <button
            type='button'
            className='files-header-menu-button'
            onClick={(e) => handleModalOpen(e)}
          >
            <span>Мой диск</span>
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
      <div className='files-list'>
        <div className='file1' />
        <div className='file1' />
        <div className='file1' />
        <div className='file1' />
        <div className='file1' />
      </div>
    </section>
  );
}
