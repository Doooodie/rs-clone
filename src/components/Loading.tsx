import { Backdrop, CircularProgress } from '@mui/material';

function Loading() {
  return (
    <Backdrop open>
      <CircularProgress sx={{ color: 'white' }} />
    </Backdrop>
  );
}

export default Loading;
