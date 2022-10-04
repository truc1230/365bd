/** @format */

import { Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import { loginAction, useAppDispatch } from "stores";
import * as Yup from "yup";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInPage() {
  const dispatch = useAppDispatch();
  return (
    <Grid container className="items-center h-screen justify-center">
      <Box>
        <Box
          className="rounded-t-2xl flex justify-between px-8 py-5"
          bgcolor="primary.main"
        >
          <img src="/images/lcm-logo-login.png" />
          <Typography className="text-white">LOGIN</Typography>
        </Box>
        <Box className="p-5 border border-solid border-grey-500 border-t-0 rounded-b-2xl">
          <Formik
            initialValues={{ email: "bao@bao.com", password: "bao" }}
            validationSchema={Yup.object().shape({})}
            onSubmit={(values, { setStatus: onSetStatus }) => {
              dispatch(loginAction(values));
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  value={values.email}
                  required
                  fullWidth
                  id="email"
                  onChange={handleChange}
                  label="Your Email "
                  name="email"
                  autoComplete="email"
                  autoFocus
                  variant="filled"
                />
                <TextField
                  margin="normal"
                  value={values.password}
                  onChange={handleChange}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant="filled"
                />
                <Box className="flex items-center">
                  <Checkbox
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                  <Typography>Remember me</Typography>
                </Box>
                <Button
                  type="submit"
                  className=""
                  color="primary"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </form>
            )}
          </Formik>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </Grid>
  );
}
