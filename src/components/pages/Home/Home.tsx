import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const languages = {
  en: { nativeName: 'English' },
  ru: { nativeName: 'Russian' },
};

function Home() {
  const { t, i18n } = useTranslation();

  return (
    <Container>
      <ButtonGroup variant='contained'>
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
      <Typography variant='body1' gutterBottom>
        {t('learn')}
      </Typography>
    </Container>
  );
}

export default Home;
