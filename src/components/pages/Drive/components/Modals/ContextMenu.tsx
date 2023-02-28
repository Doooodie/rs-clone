import { DeleteOutline, DriveFileRenameOutline, Download } from '@mui/icons-material';
import { ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import { t } from 'i18next';
import { Coordinate } from '../../types/types';

interface IModal {
  coordinate: Coordinate | null;
  handleCloseContextMenu: () => void;
  handleDelete: () => void;
  handleModalOpen: () => void;
  handleDownload: () => void;
}

export default function ContextMenu({
  coordinate,
  handleCloseContextMenu,
  handleDelete,
  handleModalOpen,
  handleDownload,
}: IModal) {
  return (
    <Menu
      open={coordinate !== null}
      onClose={handleCloseContextMenu}
      anchorReference='anchorPosition'
      anchorPosition={
        coordinate !== null ? { top: coordinate.mouseY, left: coordinate.mouseX } : undefined
      }
    >
      <MenuList>
        <MenuItem onClick={handleDownload}>
          <ListItemIcon>
            <Download />
          </ListItemIcon>
          <ListItemText>{t('explorer.download')}</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleModalOpen}>
          <ListItemIcon>
            <DriveFileRenameOutline />
          </ListItemIcon>
          <ListItemText>{t('explorer.rename')}</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteOutline />
          </ListItemIcon>
          <ListItemText>{t('explorer.remove')}</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
