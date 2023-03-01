import { useTranslation } from 'react-i18next';
import { Container, Grid, Stack, Paper, Typography, useTheme, useMediaQuery } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

function HomeCarousel() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Grid item xs={12} order={11}>
      <Stack
        bgcolor={theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]}
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
  );
}

export default HomeCarousel;
