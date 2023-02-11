import { Box, Link, Container, Typography, Paper, Grid } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Image from 'mui-image';
import RSSchoolLogo from '../../../../../assets/rsschool-logo.svg';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.common.white,
  padding: theme.spacing(1),
}));

function Footer() {
  const { t } = useTranslation();
  const appTheme = useTheme();
  const isLightTheme = appTheme.palette.mode === 'light';
  const invertAmount = isLightTheme ? '0' : 100;

  return (
    <Box
      component='footer'
      sx={{
        py: 3,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth='xl'>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid item>
            <Item>
              <Link href='https://rs.school/js/' target='_blank' color='inherit' underline='none'>
                <Image
                  src={RSSchoolLogo}
                  alt='RS School Logo'
                  showLoading
                  height={50}
                  style={{ filter: `invert(${invertAmount})` }}
                  duration={0}
                />
              </Link>
            </Item>
          </Grid>
          <Grid item>
            <Item>
              <Typography component='span'>{t('with-love')}</Typography>{' '}
              <Link
                href='https://github.com/Doooodie'
                target='_blank'
                color='inherit'
                underline='hover'
              >
                Doodie
              </Link>
              <Typography component='span'> & </Typography>
              <Link
                href='https://github.com/LineCoran'
                target='_blank'
                color='inherit'
                underline='hover'
              >
                LineCoran
              </Link>
              <Typography component='span'>, 2023</Typography>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
