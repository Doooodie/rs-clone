import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { AllDrive, Coordinate, MyFile } from '../types/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  addFile,
  addFileToTrash,
  addFolderToTrash,
  removeFile,
  removeFileFromTrash,
  removeFolder,
  removeFolderFromTrash,
  renameFolder,
} from '../../../store/slices/driveSlice';
import ContextMenu from './Modals/ContextMenu';
import MyDialog from './Modals/Dialog';
import ModalDropper from './ModalDropper';
import convertNumberToDate from '../helpers/convertNumberToDate';
import convertBytesToKbMb from '../helpers/convertBytesToKbMd';

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

  const columns: GridColDef[] = [
    { field: 'name', headerName: `${t(`explorer.filename`)}`, flex: 5 },
    { field: 'lastChange', headerName: `${t(`explorer.modified`)}`, flex: 1 },
    { field: 'size', headerName: `${t(`explorer.size`)}`, flex: 1 },
  ];

  const rows: GridRowsProp = files.map((file) => {
    const { convertedSize, convertedName } = convertBytesToKbMb(file.size);
    return {
      name: file.name,
      owner: file.owner,
      lastChange: convertNumberToDate(file.lastChange),
      size: `${convertedSize}${t(`explorer.${convertedName}`)}`,
      id: file.id,
    };
  });

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

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      for (let i = 0; i < acceptedFiles.length; i += 1) {
        const uploadFile = acceptedFiles[i];
        const uploaderFile: MyFile = {
          name: uploadFile.name,
          // todo userID
          owner: 'Me',
          lastChange: uploadFile.lastModified,
          size: uploadFile.size,
          // todo Id
          id: Math.random(),
        };
        // todo add file to server
        dispatch(addFile(uploaderFile));
        setDrop(false);
      }
    },
    [dispatch, setDrop],
  );

  const { getRootProps, isDragActive } = useDropzone({ onDrop, noClick: true, noKeyboard: true });

  function handleRenameFolder() {
    dispatch(renameFolder({ contextId, folderNewName }));
    setFolderNewName('');
    handleClose();
  }

  // context menu

  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    setCoordinate(
      coordinate === null
        ? {
            mouseX: e.clientX + 2,
            mouseY: e.clientY - 6,
          }
        : null,
    );
    const id = e.currentTarget.getAttribute('data-id');
    setIsFile(true);
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
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <div {...getRootProps()}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        hideFooter
        disableColumnMenu
        componentsProps={{
          row: {
            onContextMenu: handleContextMenu,
            style: { cursor: 'context-menu' },
          },
        }}
      />
      <ContextMenu
        coordinate={coordinate}
        handleCloseContextMenu={handleCloseContextMenu}
        handleDelete={() => handleDeleteItem(contextId)}
        handleModalOpen={handleOpen}
      />
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
      <ModalDropper open={isDragActive} />
    </div>
  );
}
