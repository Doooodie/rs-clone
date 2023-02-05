import { IconButton } from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import './Files.css';
import File from '../File/File';
import DriveHeader from '../DriveHeader/DriveHeader';
import { useAppSelector } from '../../../../hooks';

export default function Drive() {
  const currentDrive = useAppSelector((store) => store.files.currentDrive);
  const { files, name } = useAppSelector((store) => store.files.allDrive[currentDrive]);
  return (
    <section className='drive'>
      <DriveHeader name={name} />

      <div className='files-list'>
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

        <div className='file-list-wrapper'>
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
    </section>
  );
}
