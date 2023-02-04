import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { Box } from '@mui/material';

export default function SearchField() {
  return (
    <Box
      component='form'
      sx={{
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        width: '80%',
        height: '48px',
        backgroundColor: 'rgb(241,243,244)',
        padding: '0 10px',
      }}
    >
      <IconButton aria-label='menu' size='small'>
        <SearchIcon />
      </IconButton>
      <div style={{ width: '100%' }}>
        <InputBase
          sx={{ color: 'black', width: '100%' }}
          placeholder='Поиск на Диске'
          inputProps={{ 'aria-label': 'search google maps' }}
        />
      </div>

      <IconButton type='button' aria-label='search' size='small'>
        <TuneIcon />
      </IconButton>
    </Box>
  );
}
