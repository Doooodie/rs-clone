import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  addFile,
  addFileToTrash,
  addFolderToTrash,
  removeFile,
  removeFileFromTrash,
  removeFolder,
  removeFolderFromTrash,
  renameFolder,
} from '../../../../store/driveSlice';
import { MyFile, Coordinate, MyFolder } from '../../types/types';
import { ModalListClass, FileListClass } from '../../types/enums';
import ContextMenu from '../../components/Modals/ContextMenu/ContextMenu';
import DriveItemsHeader from './components/DriveItemHeader/DriveItemHeader';
import DriveItemFile from './components/DriveItem/DriveItemItem';
import DriveHeader from './components/DriveHeader/DriveHeader';
import './Drive.css';
import MyDialog from '../../components/Modals/Dialog/Dialog';
import Details from './components/Details/Details';

export default function Drive() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [drop, setDrop] = useState(false);
  const currentDrive = useAppSelector((store) => store.files.currentDrive);
  const { files, name } = useAppSelector((store) => store.files.allDrive[currentDrive]);
  const { folders } = useAppSelector((store) => store.files.allDrive[currentDrive]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [folderNewName, setFolderNewName] = useState('');
  const query = useAppSelector((store) => store.filter.query);

  function filteredByQuery(value: string, array: MyFile[] | MyFolder[]) {
    if (value.length > 0) {
      return array.filter((item) => item.name.toLocaleUpperCase().includes(value.toUpperCase()));
    }
    return array;
  }

  const filteredFiles = useMemo(() => filteredByQuery(query, files), [files, query]);
  const filteredFolders = useMemo(() => filteredByQuery(query, folders), [folders, query]);

  // context menu
  const [coordinate, setCoodinate] = useState<Coordinate>({ xCoordinate: 0, yCoordinate: 0 });
  const [contextVisible, setContextVisible] = useState(false);
  const [contextId, setContextId] = useState(0);
  const [isFile, setIsFile] = useState(false);

  function hadleContexMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    const { id } = e.currentTarget;
    setIsFile(e.currentTarget.getAttribute('itemtype') === 'file');
    setContextId(Number(id));
    const xCoordinate = e.clientX;
    const yCoordinate = e.clientY;
    setCoodinate({ xCoordinate, yCoordinate });
    setContextVisible(true);
  }

  // rename folder

  function handleRenameFolder() {
    dispatch(renameFolder({ contextId, folderNewName }));
    setFolderNewName('');
    handleClose();
  }

  function handleDeleteItem(id: number) {
    if (isFile) {
      if (currentDrive === 'drive') {
        dispatch(addFileToTrash(id));
        dispatch(removeFile(id));
      } else {
        dispatch(removeFileFromTrash(id));
      }
    } else if (currentDrive === 'drive') {
      dispatch(addFolderToTrash(id));
      dispatch(removeFolder(id));
    } else {
      dispatch(removeFolderFromTrash(id));
    }
  }

  useEffect(() => {
    const handleClick = () => setContextVisible(false);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // context menu end

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
    // todo add file to server
    dispatch(addFile(uploaderFile));
    setDrop(false);
  }

  function onDropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const uploaderFiles = e.dataTransfer.files;
    for (let i = 0; i < uploaderFiles.length; i += 1) {
      const uploadFile = uploaderFiles[i];
      addFileOnDrop(uploadFile);
    }
  }

  return (
    <section className='drive'>
      <div className='drive-items'>
        <DriveHeader name={name} />
        <div className='drive-list-wraper'>
          <div className='file-list'>
          <DriveItemsHeader />

          <div
            className={drop ? FileListClass.active : FileListClass.default}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
          >
            {filteredFolders.map((folder) => (
              <DriveItemFile
                file={folder}
                onContextMenu={(e) => hadleContexMenu(e)}
                isFile={false}
                key={folder.id}
              />
            ))}
            {filteredFiles.map((file) => (
              <DriveItemFile
                file={file}
                onContextMenu={(e) => hadleContexMenu(e)}
                isFile={true}
                key={file.id}
              />
            ))}
            <ContextMenu
              visible={contextVisible}
              x={coordinate.xCoordinate}
              y={coordinate.yCoordinate}
              handleDelete={() => handleDeleteItem(contextId)}
              handleModalOpen={() => handleOpen()}
            />
          </div>
          </div>
          <Details />
        </div>
        <div className={drop ? ModalListClass.active : ModalListClass.default}>
          <div className='modal-dropper-text'>
            <div className='modal-cloudi-icon'>
              <CloudUploadOutlinedIcon color='primary' />
            </div>
            <div>{t(`explorer.dropfile`)}</div>
            <h4>{t(`explorer.${name}`)}</h4>
          </div>
        </div>
        <MyDialog
          open={open}
          onClose={handleClose}
          title={t('explorer.rename')}
          value={folderNewName}
          onChange={(value) => setFolderNewName(value)}
          apply={t('explorer.rename')}
          onApply={() => handleRenameFolder()}
          cancel={t('explorer.cancel')}
          placeholder={t('explorer.newname')}
        />
      </div>
    </section>
  );
}
