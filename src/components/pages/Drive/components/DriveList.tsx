import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Coordinate, MyFile } from '../types/types';
import { useAppDispatch } from '../../../hooks/hooks';
import { addFile, removeFile, renameFile } from '../../../store/slices/driveSlice';
import ContextMenu from './Modals/ContextMenu';
import MyDialog from './Modals/Dialog';
import ModalDropper from './ModalDropper';
import convertBytesToKbMb from '../helpers/convertBytesToKbMd';

type DriveListProps = {
  files: MyFile[];
};

export default function DriveList({ files }: DriveListProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [coordinate, setCoordinate] = useState<Coordinate | null>(null);
  const [contextId, setContextId] = useState(0);
  const [fileName, setFileName] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      for (let i = 0; i < acceptedFiles.length; i += 1) {
        const uploadFile = acceptedFiles[i];
        const uploaderFile: MyFile = {
          name: uploadFile.name,
          owner: 'Me',
          lastChange: uploadFile.lastModified,
          size: uploadFile.size,
          id: Math.random(),
        };
        dispatch(addFile(uploaderFile));
      }
    },
    [dispatch],
  );

  const { getRootProps, isDragActive } = useDropzone({ onDrop, noClick: true, noKeyboard: true });

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
    setContextId(Number(id));
  }
  const handleCloseContextMenu = () => {
    setCoordinate(null);
  };

  const handleOpen = () => {
    setOpen(true);
    handleCloseContextMenu();
  };
  const handleClose = () => setOpen(false);

  function handleDeleteItem(id: number) {
    dispatch(removeFile(id));
    handleCloseContextMenu();
  }

  function handleRenameFile() {
    dispatch(renameFile({ contextId, fileName }));
    setFileName('');
    handleClose();
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: `${t(`explorer.filename`)}`, flex: 2 },
    {
      field: 'lastChange',
      type: 'date',
      headerName: `${t(`explorer.modified`)}`,
      flex: 1,
      valueGetter: ({ value }) =>
        value &&
        t('intlDateTime', {
          val: new Date(value),
          formatParams: {
            val: { year: 'numeric', month: 'long', day: 'numeric' },
          },
        }),
    },
    { field: 'size', headerName: `${t(`explorer.size`)}`, flex: 1 },
  ];

  const rows: GridRowsProp = files.map((file) => {
    const { convertedSize, convertedName } = convertBytesToKbMb(file.size);
    return {
      name: file.name,
      owner: file.owner,
      lastChange: file.lastChange,
      size: `${convertedSize}${t(`explorer.${convertedName}`)}`,
      id: file.id,
    };
  });

  return (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <Box {...getRootProps()} sx={{ flexGrow: 1, mt: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
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
        value={fileName}
        onChange={(value) => setFileName(value)}
        apply={t('explorer.rename')}
        onApply={() => handleRenameFile()}
        cancel={t('explorer.cancel')}
        placeholder={t('explorer.newname')}
      />
      <ModalDropper open={isDragActive} />
    </Box>
  );
}
