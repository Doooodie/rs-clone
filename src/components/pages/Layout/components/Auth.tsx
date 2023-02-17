import { FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
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

function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const authQuery = searchParams.get('auth') || '';
  const isSignIn = authQuery === 'signin';
  const isSignUp = authQuery === 'signup';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Dialog
      open={!!authQuery}
      onClose={() => setSearchParams({})}
      aria-labelledby='responsive-dialog-title'
    >
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
          <Box component='form' onSubmit={handleSubmit} noValidate={isSignUp} sx={{ mt: 3 }}>
            {isSignUp && (
              <TextField
                margin='normal'
                required
                fullWidth
                id='name'
                label='Name'
                name='name'
                autoComplete='given-name'
                autoFocus={isSignUp}
              />
            )}
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus={isSignIn}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
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
