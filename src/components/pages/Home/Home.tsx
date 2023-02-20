import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Stack,
  Typography,
  Paper,
  Button,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'mui-image';
import { Element as ScrollElement, Link as ScrollLink } from 'react-scroll';
import Carousel from 'react-material-ui-carousel';
import { useAppSelector } from '../../hooks/hooks';

import aboutImg from '../../../assets/images/landing-about.jpg';
import warningImg from '../../../assets/images/landing-warning.jpg';
import coopImg from '../../../assets/images/landing-coop.jpg';
import integrationImg from '../../../assets/images/landing-integration.jpg';
import searchImg from '../../../assets/images/landing-search.jpg';

function Home() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [, setSearchParams] = useSearchParams();
  const authToken = useAppSelector((store) => store.auth.token);
  const auth = !!authToken;
  const screenUpMedium = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Container component='main' maxWidth='xl' sx={{ mt: 10, mb: 10 }}>
      <Grid
        container
        alignItems='center'
        justifyContent='center'
        rowSpacing={{ xs: 4, sm: 8, md: 12 }}
        columnSpacing={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={12} md={5}>
          <Stack alignItems='center' spacing={4}>
            <Typography
              variant='h2'
              component='h1'
              sx={{ textAlign: { xs: 'center', md: 'left' }, fontWeight: 400 }}
            >
              {t('landing.about-heading')}
            </Typography>
            <Typography
              variant='h5'
              component='h2'
              color='text.secondary'
              sx={{ textAlign: { xs: 'center', md: 'left' } }}
            >
              {t('landing.about-body')}
            </Typography>
            <Button
              component={RouterLink}
              to='/drive'
              variant='contained'
              size='large'
              fullWidth={screenUpMedium}
              sx={{ minWidth: 300 }}
            >
              {t('landing.open-drive')}
            </Button>
            {!auth && (
              <Button
                onClick={() => setSearchParams({ auth: 'signup' })}
                variant='outlined'
                size='large'
                fullWidth={screenUpMedium}
                sx={{ minWidth: 300 }}
                style={{ marginTop: theme.spacing(2) }}
              >
                {t('landing.register')}
              </Button>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 4 }}>
            <Image src={aboutImg} style={{ borderRadius: 8 }} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Stack alignItems='stretch' spacing={4}>
            <Divider />
            <ScrollLink
              to='warning-anchor'
              smooth
              delay={500}
              offset={screenUpMedium ? 100 : 30}
              style={{
                alignSelf: 'center',
                textAlign: 'center',
                display: 'inline-grid',
                color: `${theme.palette.text.secondary}`,
                cursor: 'pointer',
              }}
            >
              {t('landing.useful-functions')}
              <ExpandMoreIcon fontSize='large' sx={{ mx: 'auto' }} />
            </ScrollLink>
          </Stack>
        </Grid>

        <ScrollElement name='warning-anchor' />
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

        <Grid item xs={12} order={11}>
          <Stack
            bgcolor={
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]
            }
            spacing={10}
            sx={{ py: 10, borderRadius: 4 }}
            alignItems='center'
          >
            <Container maxWidth='md'>
              <Typography variant='h3' component='h2' align='center'>
                {t('landing.teams')}
              </Typography>
            </Container>
            <Container maxWidth='md'>
              <Paper elevation={8} sx={{ borderRadius: 4 }}>
                <Carousel
                  animation='slide'
                  duration={500}
                  autoPlay={false}
                  navButtonsAlwaysVisible={useMediaQuery(theme.breakpoints.up('sm'))}
                  navButtonsProps={{ style: { padding: 20, margin: '0 20px' } }}
                  height={500}
                >
                  <Container maxWidth='sm'>
                    <Stack spacing={4} sx={{ py: 10 }}>
                      <Typography variant='h4' component='h3' align='center'>
                        SalesForce
                      </Typography>
                      <Typography variant='h5' component='h4' align='center'>
                        {`"${t('landing.teams-salesforce')}"`}
                      </Typography>
                    </Stack>
                  </Container>

                  <Container maxWidth='sm'>
                    <Stack spacing={4} sx={{ py: 10 }}>
                      <Typography variant='h4' component='h3' align='center'>
                        Cardinal Group
                      </Typography>
                      <Typography variant='h5' component='h4' align='center'>
                        {`"${t('landing.teams-cardinal')}"`}
                      </Typography>
                    </Stack>
                  </Container>

                  <Container maxWidth='sm'>
                    <Stack spacing={4} sx={{ py: 10 }}>
                      <Typography variant='h4' component='h3' align='center'>
                        Ibotta
                      </Typography>
                      <Typography variant='h5' component='h4' align='center'>
                        {`"${t('landing.teams-ibotta')}"`}
                      </Typography>
                    </Stack>
                  </Container>

                  <Container maxWidth='sm'>
                    <Stack spacing={4} sx={{ py: 10 }}>
                      <Typography variant='h4' component='h3' align='center'>
                        ATB Financial
                      </Typography>
                      <Typography variant='h5' component='h4' align='center'>
                        {`"${t('landing.teams-atb')}"`}
                      </Typography>
                    </Stack>
                  </Container>
                </Carousel>
              </Paper>
            </Container>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
