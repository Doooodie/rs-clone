import { useSearchParams } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const authQuery = searchParams.get('auth') || '';
  const isSignIn = authQuery === 'signin';
  const isSignUp = authQuery === 'signup';

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({ mode: 'onBlur' });

  const closeAuth = () => {
    setSearchParams({});
    reset();
  };

  const submitAuth: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    console.log(JSON.stringify(data));
    reset();
  };

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Dialog open={!!authQuery} onClose={closeAuth} aria-labelledby='responsive-dialog-title'>
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
            {isSignIn ? 'Sign in' : 'Sign up'}
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
                    message: 'Name can only contain latin letters',
                  },
                  minLength: {
                    value: 3,
                    message: 'Name cannot be under 3 symbols',
                  },
                  maxLength: {
                    value: 10,
                    message: 'Name can be up to 10 symbols',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    margin='normal'
                    fullWidth
                    required
                    label='Name'
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
                  message: 'Please provide a correct email adress',
                },
              }}
              render={({ field }) => (
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  type='email'
                  label='Email Address'
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
                  message:
                    'Password should contain at least one uppercase letter, one lowercase letter and one number',
                },
                minLength: {
                  value: 8,
                  message: 'Password cannot be under 8 symbols',
                },
              }}
              render={({ field }) => (
                <TextField
                  margin='normal'
                  fullWidth
                  required
                  label='Password'
                  type='password'
                  autoComplete='current-password'
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password?.message : ''}
                />
              )}
            />

            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              {isSignIn ? 'Sign in' : 'Sign up'}
            </Button>

            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Typography
                  component={Link}
                  variant='body2'
                  sx={{ cursor: 'pointer' }}
                  onClick={() =>
                    isSignIn
                      ? setSearchParams({ auth: 'signup' })
                      : setSearchParams({ auth: 'signin' })
                  }
                >
                  {isSignIn ? 'Dont have an account? Sign Up' : 'Already have an account? Sign in'}
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
