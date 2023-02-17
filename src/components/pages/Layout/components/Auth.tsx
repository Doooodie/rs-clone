import { useSearchParams } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Dialog,
  DialogContent,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface IFormInputs {
  name?: string;
  email: string;
  password: string;
}

function Auth() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const authQuery = searchParams.get('auth') || '';
  const isSignIn = authQuery === 'signin';
  const isSignUp = authQuery === 'signup';

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({ mode: 'onBlur' });

  const closeAuth = () => {
    setSearchParams({});
    reset();
  };

  const submitAuth: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    console.log(data);
    reset();
  };

  const toggleSignUp = () => {
    reset();
    setSearchParams({ auth: 'signup' });
  };

  const toggleSignIn = () => {
    reset();
    setSearchParams({ auth: 'signin' });
  };

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Dialog open={!!authQuery} onClose={closeAuth}>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h2' variant='h5'>
            {isSignIn ? t('auth.sign-in') : t('auth.sign-up')}
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit(submitAuth)}
            noValidate={isSignUp}
            sx={{ mt: 3 }}
          >
            {isSignUp && (
              <Controller
                name='name'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                  pattern: {
                    value: /[A-Za-z]/,
                    message: t('auth.name-pattern-error'),
                  },
                  minLength: {
                    value: 3,
                    message: t('auth.name-min-length-error'),
                  },
                  maxLength: {
                    value: 10,
                    message: t('auth.name-max-length-error'),
                  },
                }}
                render={({ field }) => (
                  <TextField
                    margin='normal'
                    fullWidth
                    required
                    label={t('auth.name-label')}
                    autoComplete='name'
                    {...field}
                    error={!!errors.name}
                    helperText={errors.name ? errors.name?.message : ''}
                  />
                )}
              />
            )}

            <Controller
              name='email'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: t('auth.email-pattern-error'),
                },
              }}
              render={({ field }) => (
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  type='email'
                  label={t('auth.email-label')}
                  autoComplete='email'
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email?.message : ''}
                />
              )}
            />

            <Controller
              name='password'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message: t('auth.password-pattern-error'),
                },
                minLength: {
                  value: 8,
                  message: t('auth.password-min-length-error'),
                },
              }}
              render={({ field }) => (
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  label={t('auth.password-label')}
                  type='password'
                  autoComplete='current-password'
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password?.message : ''}
                />
              )}
            />

            <Button
              type='submit'
              fullWidth
              disabled={!isValid}
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignIn ? t('auth.sign-in') : t('auth.sign-up')}
            </Button>

            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Typography
                  component={Link}
                  variant='body2'
                  sx={{ cursor: 'pointer' }}
                  onClick={isSignIn ? toggleSignUp : toggleSignIn}
                >
                  {isSignIn ? t('auth.sign-up-link') : t('auth.sign-in-link')}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default Auth;
