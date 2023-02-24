import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileListClass } from '../../../../types/enums';
import DriveItemHeader from '../DriveItemHeader/DriveItemHeader';
import { AllDrive, Coordinate, MyFile } from '../../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks';
import {
  addFile,
  addFileToTrash,
  addFolderToTrash,
  removeFile,
  removeFileFromTrash,
  removeFolder,
  removeFolderFromTrash,
  renameFolder,
} from '../../../../../../store/slices/driveSlice';
import DriveItem from '../DriveItem/DriveItemItem';
import ContextMenu from '../../../Modals/ContextMenu/ContextMenu';
import MyDialog from '../../../Modals/Dialog/Dialog';

type DriveListProps = {
  files: MyFile[];
  folders: MyFile[];
  drop: boolean;
  setDrop: (val: boolean) => void;
};

export default function DriveList({ folders, files, drop, setDrop }: DriveListProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isFile, setIsFile] = useState(false);
  const [folderNewName, setFolderNewName] = useState('');
  const currentDrive = useAppSelector((store) => store.files.currentDrive) as keyof AllDrive;

  const [open, setOpen] = useState(false);
  const [coordinate, setCoordinate] = useState<Coordinate | null>(null);

  const handleCloseContextMenu = () => {
    setCoordinate(null);
  };

  const handleOpen = () => {
    setOpen(true);
    handleCloseContextMenu();
  };
  const handleClose = () => setOpen(false);

  // drag and drop
  const [contextId, setContextId] = useState(0);

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrop(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrop(false);
  };

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

  function handleRenameFolder() {
    dispatch(renameFolder({ contextId, folderNewName }));
    setFolderNewName('');
    handleClose();
  }

  // context menu

  function hadleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    setCoordinate(
      coordinate === null
        ? {
            mouseX: e.clientX + 2,
            mouseY: e.clientY - 6,
          }
        : null,
    );
    const { id } = e.currentTarget;
    setIsFile(e.currentTarget.getAttribute('itemtype') === 'file');
    setContextId(Number(id));
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
    handleCloseContextMenu();
  }

  return (
    <div className='file-list'>
      <DriveItemHeader />
      <div
        className={drop ? FileListClass.active : FileListClass.default}
        onDragStart={(e) => dragStartHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragOver={(e) => dragStartHandler(e)}
        onDrop={(e) => onDropHandler(e)}
      >
        {folders.map((folder) => (
          <DriveItem
            file={folder}
            onContextMenu={(e) => hadleContextMenu(e)}
            isFile={false}
            key={folder.id}
          />
        ))}
        {files.map((file) => (
          <DriveItem file={file} onContextMenu={(e) => hadleContextMenu(e)} isFile key={file.id} />
        ))}
        <ContextMenu
          coordinate={coordinate}
          handleCloseContextMenu={handleCloseContextMenu}
          handleDelete={() => handleDeleteItem(contextId)}
          handleModalOpen={handleOpen}
        />
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
  );
}
