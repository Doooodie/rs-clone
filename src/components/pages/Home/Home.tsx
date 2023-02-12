import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Home() {
  const { t } = useTranslation();

  return (
    <Container component='main' maxWidth='xl'>
      <Typography variant='body1' gutterBottom>
        {t('layout.product-name')}
      </Typography>
    </Container>
  );
}

export default Home;
