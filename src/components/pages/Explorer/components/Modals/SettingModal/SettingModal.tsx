import { Button, ButtonGroup, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './SettingModal.css';

interface IModal {
  visible: boolean;
}

const languages = {
  en: { nativeName: 'English' },
  ru: { nativeName: 'Russian' },
};

export default function SettingModal({ visible }: IModal) {
  const { i18n } = useTranslation();

  return (
    <div
      className='modal-list-setting'
      style={visible ? { opacity: 1, zIndex: 100 } : { opacity: 0, zIndex: -1 }}
    >
      <Paper sx={{ width: '100%' }}>
        <ButtonGroup variant='contained'>
          {Object.keys(languages).map((lang) => (
            <Button
              key={lang}
              onClick={() => i18n.changeLanguage(lang)}
              disabled={i18n.resolvedLanguage === lang}
              className='setting-button-lang'
            >
              {languages[lang as keyof typeof languages].nativeName}
            </Button>
          ))}
        </ButtonGroup>
      </Paper>
    </div>
  );
}
