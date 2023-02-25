import { Backdrop, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useAppSelector } from '../../../hooks/hooks';
import { AllDrive } from '../types/types';

const iconStyle = {
  '@keyframes slide-in': {
    from: {
      transform: 'translateY(-80%)',
    },
    to: {
      transform: 'translateY(-20%)',
    },
  },

  fontSize: 100,
  color: 'white',
  animation: 'slide-in 0.35s',
  animationIterationCount: 'infinite',
  animationDirection: 'alternate',
} as const;

interface IModalDropper {
  open: boolean;
}

function ModalDropper({ open }: IModalDropper) {
  const { t } = useTranslation();
  const currentDrive = useAppSelector((store) => store.files.currentDrive) as keyof AllDrive;
  const { name } = useAppSelector((store) => store.files.allDrive[currentDrive]);

  return (
    <Backdrop open={open}>
      <Stack justifyContent='center' alignItems='center'>
        <CloudUploadOutlinedIcon sx={iconStyle} />
        <Typography variant='h6' color='white'>
          {t(`explorer.dropfile`)}
        </Typography>
        <Typography variant='h5' color='white'>
          {t(`explorer.${name}`)}
        </Typography>
      </Stack>
    </Backdrop>
  );
}

export default ModalDropper;
