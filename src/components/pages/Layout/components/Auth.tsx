import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Dialog,
  DialogContent,
  Snackbar,
  Alert,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSignUpMutation, useSignInMutation } from '../../../store/api/authApi';
import { useAppDispatch } from '../../../hooks/hooks';
import { setCredentials } from '../../../store/slices/authSlice';

interface IFormInputs {
  name: string;
  email: string;
  password: string;
}

function Auth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const authQuery = searchParams.get('auth') || '';
  const isSignIn = authQuery === 'signin';
  const isSignUp = authQuery === 'signup';
  const [signIn, { isLoading: isSignInLoading }] = useSignInMutation();
  const [signUp, { isLoading: isSignUpLoading }] = useSignUpMutation();
  const [isErrorOpen, setErrorOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({ mode: 'onBlur' });

  const closeError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setErrorOpen(false);
  };

  const closeSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setSuccessOpen(false);
  };

  const closeAuth = () => {
    setSearchParams({});
    reset();
  };

  const submitAuth: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {
    try {
      if (isSignIn) {
        const token = await signIn(data).unwrap();
        dispatch(setCredentials({ name: data.name, token }));
        const navTimeout = setTimeout(() => {
          navigate('/drive');
          clearTimeout(navTimeout);
        }, 3000);
      } else {
        const token = await signUp(data).unwrap();
        dispatch(setCredentials({ name: data.name, token }));
        navigate('/');
        const navTimeout = setTimeout(() => {
          navigate('/drive');
          clearTimeout(navTimeout);
        }, 3000);
      }

      setSuccessOpen(true);
    } catch (err) {
      setErrorOpen(true);
    } finally {
      reset();
    }
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

            <LoadingButton
              type='submit'
              fullWidth
              loading={isSignInLoading || isSignUpLoading}
              disabled={!isValid}
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              <span>{isSignIn ? t('auth.sign-in') : t('auth.sign-up')}</span>
            </LoadingButton>

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

      <Snackbar open={isErrorOpen} autoHideDuration={5000} onClose={closeError}>
        <Alert onClose={closeError} elevation={6} variant='filled' severity='error'>
          {t('auth.async-error')}
        </Alert>
      </Snackbar>

      <Snackbar open={isSuccessOpen} autoHideDuration={3000} onClose={closeSuccess}>
        <Alert onClose={closeSuccess} elevation={6} variant='filled' severity='success'>
          {t('auth.async-success')}
        </Alert>
      </Snackbar>
    </Dialog>
  );
  /* eslint-enable react/jsx-props-no-spreading */
}

export default Auth;
