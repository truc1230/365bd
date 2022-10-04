import { Box, Button, Grid, TextField } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useAppDispatch } from "stores";
import * as Yup from "yup";
type Props = {};

export default function FilterControls({}: Props) {
  const dispatch = useAppDispatch();
  return (
    <Box className="h-full w-full" color="primary">
      <Grid container>
        <Formik
          initialValues={{ }}
          validationSchema={Yup.object().shape({})}
          onSubmit={(values, { setStatus: onSetStatus }) => {}}
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
                label="name"
                className="p-0"
                onChange={handleChange}
              />
              <TextField
                onChange={handleChange}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Grid>
    </Box>
  );
}
