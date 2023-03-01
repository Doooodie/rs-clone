import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function NoPage() {
  const { t } = useTranslation();

  return (
    <Container
      component='main'
      maxWidth='xl'
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 'auto' }}
    >
      <Typography component='h1' variant='h5' gutterBottom>
        {t('layout.no-page-error')} 😔
      </Typography>
    </Container>
  );
}

export default NoPage;
