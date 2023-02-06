import { IconButton } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import './Drive.css';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import File from '../File/File';
import DriveHeader from '../DriveHeader/DriveHeader';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { addFile } from '../../../../store/driveSlice';
import { MyFile } from '../../types/types';

enum FileListClass {
  active = 'file-list-wrapper file-list-wrapper-active',
  default = 'file-list-wrapper',
}

enum ModalListClas {
  active = 'modal-dropper modal-dropper-active',
  default = 'modal-dropper',
}

export default function Drive() {
  const dispatch = useAppDispatch();
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

  function addFileOnDrop(file: File) {
    const uploaderFile: MyFile = {
      name: file.name,
      // todo userID
      owner: 'Me',
      lastChange: file.lastModified,
      size: file.size,
      // todo Id
      id: Math.random(),
    };
    dispatch(addFile(uploaderFile));
    setDrop(false);
  }

  function onDropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const uploaderFiles = e.dataTransfer.files;
    for (let i = 0; i < files.length; i += 1) {
      const uploadFile = uploaderFiles[i];
      addFileOnDrop(uploadFile);
    }
  }

  return (
    <section className='drive'>
      <DriveHeader name={name} />
      <div className='file-list'>
        <div className='file-list-item sticky'>
          <div className='file-item-info file-item-name'>
            <span>{t(`explorer.filename`)}</span>
            <IconButton>
              <NorthIcon fontSize='small' />
            </IconButton>
          </div>
          <div className='file-list-info file-list-owner'>
            <span>{t(`explorer.owner`)}</span>
          </div>

          <div className='file-item-info file-item-time'>
            <span>{t(`explorer.modified`)}</span>
          </div>

          <div className='file-item-size file-item-size'>
            <span>{t(`explorer.size`)}</span>
          </div>
        </div>

        <div
          className={drop ? FileListClass.active : FileListClass.default}
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => onDropHandler(e)}
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
          <div className='modal-cloudi-icon'>
            <CloudUploadOutlinedIcon color='primary' />
          </div>
          <div>{t(`explorer.dropfile`)}</div>
          <h4>{t(`explorer.${name}`)}</h4>
        </div>
      </div>
    </section>
  );
}
