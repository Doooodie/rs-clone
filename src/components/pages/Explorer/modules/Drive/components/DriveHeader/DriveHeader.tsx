import Box, { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import { useTranslation } from 'react-i18next';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { changeFileInfoModal } from '../../../../../../store/modalSlice';
import MenuArrowDownIcon from '../../../../../../../assets/SvgComponents/MenuArrowDown';
import ModalCreateFile from '../../../../components/Modals/CreateModal/ModalCreateFile';
import './DriveHeader.css';

interface IDriveHeader {
  name: string;
}

export default function DriveHeader({ name }: IDriveHeader) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const fileInfoVisible = useAppSelector((store) => store.modal.fileInfo);
  const [modalVisible, setModalVisible] = useState(false);
  const [isBig, setIsBig] = useState(false);

  useEffect(() => {
    const modalClose = () => setModalVisible(false);
    window.addEventListener('click', modalClose);
    return () => window.removeEventListener('click', modalClose);
  }, []);

  function handleModalOpen(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setModalVisible(true);
  }

  function handleInfoOpen(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    dispatch(changeFileInfoModal(!fileInfoVisible));
  }
  return (
    <div className='drive-header'>
      <div className={modalVisible ? `drive-header-menu visible` : 'drive-header-menu'}>
        <button
          type='button'
          className='drive-header-menu-button'
          onClick={(e) => handleModalOpen(e)}
        >
          <span>{t(`explorer.${name}`)}</span>
          <MenuArrowDownIcon />
        </button>
        <ModalCreateFile visible={modalVisible} />
      </div>
      <Box>
        <IconButton onClick={() => setIsBig(!isBig)}>
          {isBig ? <CalendarViewMonthIcon /> : <ViewListOutlinedIcon />}
        </IconButton>
        <IconButton onClick={(e) => handleInfoOpen(e)}>
          <InfoIcon color={fileInfoVisible ? 'primary' : 'inherit'} />
        </IconButton>
      </Box>
    </div>
  );
}
