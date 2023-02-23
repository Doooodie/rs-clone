import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Stack,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Element as ScrollElement, Link as ScrollLink } from 'react-scroll';
import { useAppSelector } from '../../hooks/hooks';
import HomeGlobe from './HomeGlobe';
import HomePapers from './HomePapers';
import HomeCarousel from './HomeCarousel';

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
          <HomeGlobe />
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
        <HomePapers />
        <HomeCarousel />
      </Grid>
    </Container>
  );
}

export default Home;
