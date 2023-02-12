import './Details.css';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FolderIcon from '@mui/icons-material/Folder';
import DefaultDetails from './DetailsContent/DefaultDetails';
import DetailsContent from './DetailsContent/DetailsContent';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { changeFileInfoModal } from '../../../../../../store/modalSlice';

export default function Details() {

  const file = useAppSelector((store) => store.fileInfo.file);
  const dispatch = useAppDispatch();
  const detailsVisible = useAppSelector((store) => store.modal.fileInfo);

  function handleInfoOpen(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    dispatch(changeFileInfoModal(!detailsVisible));
  }

  return (
    <aside className={detailsVisible ? `details details-visible` : `details`} id='details'>
      <div className='details-header'>
        <div className='details-header-name'>
          <FolderIcon htmlColor='var(--gray)' />
          <h3 className='details-header-title'>
            {
              file
              ? file.name
              : `My Drive`
            }
          </h3>
        </div>
        <IconButton onClick={(e) => handleInfoOpen(e)}>
          <CloseIcon />
        </IconButton>
      </div>
      <h2 className='details-subtitle'>Details</h2>
      {
        file
        ? <DetailsContent file={file}/>
        : <DefaultDetails />
      }
      
    </aside>
  );
}
