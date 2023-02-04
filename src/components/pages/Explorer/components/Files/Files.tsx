import { IconButton, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import MenuArrowDownIcon from '../../../../../assets/SvgComponents/MenuArrowDown';

import './Files.css';

export default function Files() {
  function handleHeaderFilesButton() {
    document
      .getElementById('files-action-modal')
      ?.classList.toggle('files-header-actions-list-visible');
  }

  return (
    <section className='files'>
      <div className='files-header'>
        <div className='file-header-menu'>
          <button
            type='button'
            onClick={() => handleHeaderFilesButton()}
            className='files-header-menu-button'
          >
            <span>Мой диск</span>
            <MenuArrowDownIcon />
          </button>

          <div id='files-action-modal' className='files-header-actions-list'>
            <Paper elevation={3}>
              <div className='header-actions-item'>
                <span>Создать папку</span>
              </div>
              <div className='header-actions-item'>
                <span>Загрузить файлы</span>
              </div>
              <div className='header-actions-item'>
                <span>Загрузить папку</span>
              </div>
            </Paper>
          </div>
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
