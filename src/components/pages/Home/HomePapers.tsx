import { useTranslation } from 'react-i18next';
import { Grid, Paper, Typography } from '@mui/material';
import Image from 'mui-image';

import warningImg from '../../../assets/images/landing-warning.jpg';
import coopImg from '../../../assets/images/landing-coop.jpg';
import integrationImg from '../../../assets/images/landing-integration.jpg';
import searchImg from '../../../assets/images/landing-search.jpg';

function HomePapers() {
  const { t } = useTranslation();

  return (
    <>
      <Grid item xs={12} md={5} order={{ sx: 3, md: 4 }}>
        <Typography variant='h4' component='h3' mb={4}>
          {t('landing.warning-heading')}
        </Typography>
        <Typography variant='subtitle1' component='h4' color='text.secondary'>
          {t('landing.warning-body')}
        </Typography>
      </Grid>
      <Grid item xs={12} md={7} order={{ sx: 4, md: 3 }}>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 4 }}>
          <Image src={warningImg} style={{ borderRadius: 8 }} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={5} order={{ sx: 6, md: 5 }}>
        <Typography variant='h4' component='h3' mb={4}>
          {t('landing.coop-heading')}
        </Typography>
        <Typography variant='subtitle1' component='h4' color='text.secondary'>
          {t('landing.coop-body')}
        </Typography>
      </Grid>
      <Grid item xs={12} md={7} order={{ sx: 5, md: 6 }}>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 4 }}>
          <Image src={coopImg} style={{ borderRadius: 8 }} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={5} order={{ sx: 7, md: 8 }}>
        <Typography variant='h4' component='h3' mb={4}>
          {t('landing.integration-heading')}
        </Typography>
        <Typography variant='subtitle1' component='h4' color='text.secondary'>
          {t('landing.integration-body')}
        </Typography>
      </Grid>
      <Grid item xs={12} md={7} order={{ sx: 8, md: 7 }}>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 4 }}>
          <Image src={integrationImg} style={{ borderRadius: 8 }} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={5} order={{ sx: 10, md: 9 }}>
        <Typography variant='h4' component='h3' mb={4}>
          {t('landing.search-heading')}
        </Typography>
        <Typography variant='subtitle1' component='h4' color='text.secondary'>
          {t('landing.search-body')}
        </Typography>
      </Grid>
      <Grid item xs={12} md={7} order={{ sx: 9, md: 10 }}>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 4 }}>
          <Image src={searchImg} style={{ borderRadius: 8 }} />
        </Paper>
      </Grid>
    </>
  );
}

export default HomePapers;
