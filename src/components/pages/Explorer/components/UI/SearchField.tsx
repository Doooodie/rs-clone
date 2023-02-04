import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function SearchField() {
  const { t } = useTranslation();
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
          fullWidth
          sx={{ color: 'black' }}
          placeholder={t('explorer.search') || 'Search in drive'}
          inputProps={{ 'aria-label': 'search google maps' }}
        />
      </div>

      <IconButton type='button' aria-label='search' size='small'>
        <TuneIcon />
      </IconButton>
    </Box>
  );
}
