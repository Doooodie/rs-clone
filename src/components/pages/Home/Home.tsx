import { useTranslation } from 'react-i18next';
import { Container, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import aboutImg from '../../../assets/images/landing-about.jpg';
import warningImg from '../../../assets/images/landing-warning.jpg';
import coopImg from '../../../assets/images/landing-coop.jpg';
import integrationImg from '../../../assets/images/landing-integration.jpg';
import searchImg from '../../../assets/images/landing-search.jpg';

function Home() {
  const { t } = useTranslation();

  return (
    <Container component='main' maxWidth='xl' sx={{ mt: 10, mb: 10 }}>
      <Grid
        container
        alignItems='center'
        rowSpacing={{ xs: 4, sm: 8, md: 12 }}
        columnSpacing={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={12} md={6}>
          <Typography variant='h2' component='h1'>
            {t('landing.about-heading')}
          </Typography>
          <Typography variant='h5' component='h2'>
            {t('landing.about-body')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Image src={aboutImg} style={{ borderRadius: 16 }} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Image src={warningImg} style={{ borderRadius: 16 }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h5' component='h2'>
            {t('landing.warning-heading')}
          </Typography>
          <Typography variant='h6' component='h3'>
            {t('landing.warning-body')}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant='h2' component='h1'>
            {t('landing.coop-heading')}
          </Typography>
          <Typography variant='h5' component='h2'>
            {t('landing.coop-body')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Image src={coopImg} style={{ borderRadius: 16 }} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Image src={integrationImg} style={{ borderRadius: 16 }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h5' component='h2'>
            {t('landing.integration-heading')}
          </Typography>
          <Typography variant='h6' component='h3'>
            {t('landing.integration-body')}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant='h2' component='h1'>
            {t('landing.search-heading')}
          </Typography>
          <Typography variant='h5' component='h2'>
            {t('landing.search-body')}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Image src={searchImg} style={{ borderRadius: 16 }} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
