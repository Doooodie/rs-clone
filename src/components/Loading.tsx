import { Box, CircularProgress } from '@mui/material';

function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CircularProgress sx={{ m: 'auto' }} />
    </Box>
  );
}

export default Loading;
