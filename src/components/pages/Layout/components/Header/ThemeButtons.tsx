import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { ButtonGroup, Button } from '@mui/material';
import { WbSunny, DarkModeOutlined } from '@mui/icons-material';
import { useAppDispatch } from '../../../../hooks';
import { setTheme } from '../../../../store/appThemeSlice';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ThemeButtons() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { toggleColorMode } = colorMode;

  const handleClick = () => {
    toggleColorMode();
    dispatch(setTheme(theme.palette.mode));
  };

  return (
    <ButtonGroup variant='outlined' fullWidth>
      <Button
        startIcon={<WbSunny />}
        onClick={handleClick}
        disabled={theme.palette.mode === 'light'}
      >
        {t('layout.theme-light')}
      </Button>
      <Button
        startIcon={<DarkModeOutlined />}
        onClick={handleClick}
        disabled={theme.palette.mode === 'dark'}
      >
        {t('layout.theme-dark')}
      </Button>
    </ButtonGroup>
  );
}

export default ThemeButtons;
