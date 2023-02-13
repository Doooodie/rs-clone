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

  const handleLightMode = () => {
    dispatch(setTheme('light'));
    toggleColorMode();
  };

  const handleDarkMode = () => {
    dispatch(setTheme('dark'));
    toggleColorMode();
  };

  return (
    <ButtonGroup variant='outlined' fullWidth>
      <Button
        startIcon={<WbSunny />}
        onClick={handleLightMode}
        disabled={theme.palette.mode === 'light'}
      >
        {t('layout.theme-light')}
      </Button>
      <Button
        startIcon={<DarkModeOutlined />}
        onClick={handleDarkMode}
        disabled={theme.palette.mode === 'dark'}
      >
        {t('layout.theme-dark')}
      </Button>
    </ButtonGroup>
  );
}

export default ThemeButtons;
