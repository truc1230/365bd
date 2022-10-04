/** @format */

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Formik } from 'formik';
import { loginAction, useAppDispatch } from 'stores';
import * as Yup from 'yup';

function Copyright(props: any) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignInPage() {
  const dispatch = useAppDispatch()
  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} className="flex items-center" elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box>
            <Formik
              initialValues={{ email: 'bao@bao.com', password: 'bao' }}
              validationSchema={Yup.object().shape({})}
              onSubmit={(values, { setStatus: onSetStatus }) => {
                dispatch(loginAction(values))
                
              }}>
              {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    margin='normal'
                    value={values.email}
                    required
                    fullWidth
                    id='email'
                    onChange={handleChange}
                    label='email '
                    name='email'
                    autoComplete='email'
                    autoFocus
                  />
                  <TextField
                    margin='normal'
                    value={values.password}
                    onChange={handleChange}
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                  />
                  <Button type='submit' className='' color='primary' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Sign In
                  </Button>
                </form>
              )}
            </Formik>

            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='#' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
