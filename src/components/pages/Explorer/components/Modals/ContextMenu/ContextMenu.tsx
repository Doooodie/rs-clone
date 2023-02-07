import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import { Paper } from '@mui/material';
import './ContextMenu.css';

interface IModal {
  visible: boolean;
  x: number;
  y: number;
  handleDelete: () => void;
}

export default function ContextMenu({ visible, x, y, handleDelete}: IModal) {

  return (
    <div
      className='modal-list file-modal'
      style={visible ? { opacity: 1, zIndex: 2000, top: `${y}px`, left: `${x}px` } : { opacity: 0, zIndex: -1, top: `${x}`, left: `${y}` }}
    >
      <Paper elevation={3} sx={{ width: '100%' }}>
        <button
          type='button'
          className='header-actions-item header-actions-item-main'
          onClick={handleDelete}
        >
          <AddToDriveIcon htmlColor='#5f6368' />
          <span>Delete</span>
        </button>
      </Paper>
    </div>
  );
}
