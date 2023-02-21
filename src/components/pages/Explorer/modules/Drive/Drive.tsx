import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../hooks/hooks';
import { MyFile, MyFolder, AllDrive } from '../../types/types';
import { ModalListClass } from '../../types/enums';
import DriveHeader from './components/DriveHeader/DriveHeader';
import Details from './components/Details/Details';
import sortFiles from '../../helpers/sortFiles';
import DriveList from './components/DriveList/DriveList';
import './Drive.css';

export default function Drive() {
  const { t } = useTranslation();
  const [drop, setDrop] = useState(false);
  const currentDrive = useAppSelector((store) => store.files.currentDrive) as keyof AllDrive;
  const { files, name } = useAppSelector((store) => store.files.allDrive[currentDrive]);
  const { folders } = useAppSelector((store) => store.files.allDrive[currentDrive]);
  const { query, sort, isReverse } = useAppSelector((store) => store.filter);

  function filteredByQuery(value: string, array: MyFile[] | MyFolder[]) {
    if (value.length > 0) {
      return [
        ...array.filter((item) => item.name.toLocaleUpperCase().includes(value.toUpperCase())),
      ];
    }
    return [...array];
  }

  const filteredFiles = useMemo(() => filteredByQuery(query, files), [files, query]);
  const filteredFolders = useMemo(() => filteredByQuery(query, folders), [folders, query]);

  const filteredAndSortFiles = useMemo(
    () => sortFiles(sort, filteredFiles, isReverse),
    [sort, filteredFiles, isReverse],
  );
  const filteredAndSortFolders = useMemo(
    () => sortFiles(sort, filteredFolders, isReverse),
    [sort, filteredFolders, isReverse],
  );

  return (
    <section className='drive'>
      <div className='drive-items'>
        <DriveHeader name={name} />
        <div className='drive-list-wraper'>
          <DriveList
            folders={filteredAndSortFolders}
            files={filteredAndSortFiles}
            drop={drop}
            setDrop={(value) => setDrop(value)}
          />
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
      </div>
    </section>
  );
}
