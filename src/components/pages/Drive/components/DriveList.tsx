import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Coordinate, MyFile } from '../types/types';
import ContextMenu from './Modals/ContextMenu';
import MyDialog from './Modals/Dialog';
import ModalDropper from './ModalDropper';
import convertBytesToKbMb from '../helpers/convertBytesToKbMd';
import {
  useCreateFileMutation,
  useDeleteFileMutation,
  useRenameFileMutation,
  useGetFileMutation,
} from '../../../store/api/filesApi';
import { useAppSelector } from '../../../hooks/hooks';
import { queryUrl } from '../../../services/helpers';

type DriveListProps = {
  files: MyFile[];
};

export default function DriveList({ files }: DriveListProps) {
  const { t } = useTranslation();
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [open, setOpen] = useState(false);
  const [coordinate, setCoordinate] = useState<Coordinate | null>(null);
  const [contextId, setContextId] = useState(0);
  const [fileName, setFileName] = useState('');
  const [createFile] = useCreateFileMutation();
  const [removeFile] = useDeleteFileMutation();
  const [renameFile] = useRenameFileMutation();
  const [getFile] = useGetFileMutation();
  const userName = useAppSelector((store) => store.auth.name);

  useEffect(() => {
    setRows(() =>
      files.map((file) => {
        const { convertedSize, convertedName } = convertBytesToKbMb(file.size);
        return {
          name: file.name,
          size: `${convertedSize}${t(`explorer.${convertedName}`)}`,
          lastChange: file.updatedAt,
          id: file.id,
        };
      }),
    );
  }, [files, t]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append('name', file.name);
      formData.append('size', `${file.size}`);
      formData.append('info', '');
      formData.append('filePath', '');
      formData.append('type', 'file');
      formData.append('file', file);

      await createFile(formData);
    },
    [createFile],
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

  const handleDeleteItem = async (id: number) => {
    await removeFile({ id });
    handleCloseContextMenu();
  };

  const handleRenameFile = async () => {
    await renameFile({ id: contextId, name: fileName });
    setFileName('');
    handleClose();
  };

  const handleDownloadItem = async (id: number) => {
    const file = await getFile({ id }).unwrap();
    const fileUrl = `${queryUrl}/${userName}/${file.name}`;
    const fetchQuery = await fetch(`${fileUrl}`);
    const queryBlob = await fetchQuery.blob();
    const url = window.URL.createObjectURL(new Blob([queryBlob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file.name);
    document.body.appendChild(link);
    link.click();
    link.remove();
    handleCloseContextMenu();
  };

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
        handleDownload={() => handleDownloadItem(contextId)}
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
