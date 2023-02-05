import { IconButton } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import './Drive.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import File from '../File/File';
import DriveHeader from '../DriveHeader/DriveHeader';
import { useAppSelector } from '../../../../hooks';

enum FileListClass {
  active = 'file-list-wrapper file-list-wrapper-active',
  default = 'file-list-wrapper',
}

enum ModalListClas {
  active = 'modal-dropper modal-dropper-active',
  default = 'modal-dropper',
}

export default function Drive() {
  const { t } = useTranslation();
  const [drop, setDrop] = useState(false);
  const currentDrive = useAppSelector((store) => store.files.currentDrive);
  const { files, name } = useAppSelector((store) => store.files.allDrive[currentDrive]);

  function dragStartHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDrop(true);
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDrop(false);
  }

  return (
    <section className='drive'>
      <DriveHeader name={name} />
      <div className='file-list'>
        <div className='file-list-item sticky'>
          <div className='file-item-info file-item-name'>
            <span>Name</span>
            <IconButton>
              <NorthIcon fontSize='small' />
            </IconButton>
          </div>
          <div className='file-list-info file-list-owner'>
            <span>Owner</span>
          </div>

          <div className='file-item-info file-item-time'>
            <span>Last modified</span>
          </div>

          <div className='file-item-size file-item-size'>
            <span>File size</span>
          </div>
        </div>

        <div
          className={drop ? FileListClass.active : FileListClass.default}
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
        >
          {files.map((file) => (
            <File
              name={file.name}
              owner={file.owner}
              key={file.id}
              size={file.size}
              lastChange={file.lastChange}
              id={file.id}
            />
          ))}
        </div>
      </div>

      <div className={drop ? ModalListClas.active : ModalListClas.default}>
        <div className='modal-dropper-text'>
          <div>{t(`explorer.dropfile`)}</div>
          <h4>{t(`explorer.${name}`)}</h4>
        </div>
      </div>
    </section>
  );
}
