import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SwipeableDrawer,
  Box,
  IconButton,
  List,
  ListItem,
  ButtonGroup,
  Button,
  Tooltip,
  Typography,
  ListItemText,
} from '@mui/material';
import { Settings, Close } from '@mui/icons-material';
import ThemeButtons from './ThemeButtons';

function TemporaryDrawer() {
  const { t, i18n } = useTranslation();
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const languages = {
    en: { nativeName: 'English' },
    ru: { nativeName: 'Русский' },
  };

  return (
    <>
      <Tooltip title={t('layout.app-settings')}>
        <IconButton color='inherit' size='large' onClick={() => setIsDrawerOpen(true)}>
          <Settings />
        </IconButton>
      </Tooltip>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor='right'
        open={isDrawerOpen}
        onOpen={() => setIsDrawerOpen(true)}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box width={300} role='presentation' textAlign='center' component='nav'>
          <List>
            <ListItem divider>
              <Box sx={{ flexGrow: 1 }}>
                <Typography>{t('layout.app-settings')}</Typography>
              </Box>
              <IconButton onClick={() => setIsDrawerOpen(false)}>
                <Close />
              </IconButton>
            </ListItem>
            <ListItem dense>
              <ListItemText>{t('layout.language')}</ListItemText>
            </ListItem>
            <ListItem dense>
              <ButtonGroup variant='outlined' fullWidth>
                {Object.keys(languages).map((lang) => (
                  <Button
                    key={lang}
                    onClick={() => i18n.changeLanguage(lang)}
                    disabled={i18n.resolvedLanguage === lang}
                  >
                    {languages[lang as keyof typeof languages].nativeName}
                  </Button>
                ))}
              </ButtonGroup>
            </ListItem>
            <ListItem dense>
              <ListItemText>{t('layout.theme')}</ListItemText>
            </ListItem>
            <ListItem dense>
              <ThemeButtons />
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

export default TemporaryDrawer;
