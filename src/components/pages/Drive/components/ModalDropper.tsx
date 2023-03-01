import { Backdrop, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

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

  return (
    <Backdrop open={open}>
      <Stack justifyContent='center' alignItems='center'>
        <CloudUploadOutlinedIcon sx={iconStyle} />
        <Typography variant='h6' color='white'>
          {t(`explorer.dropfile`)}
        </Typography>
        <Typography variant='h5' color='white'>
          {t(`explorer.drive`)}
        </Typography>
      </Stack>
    </Backdrop>
  );
}

export default ModalDropper;
