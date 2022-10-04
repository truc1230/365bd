import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Grid,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { useAppDispatch } from "stores";
import * as Yup from "yup";
import { useState } from "react";
type Props = {};

export default function FilterControls({}: Props) {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-07"));
  return (
    <Box className="h-full w-full" color="primary">
      <Grid container>
        <Formik
          initialValues={{}}
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
              <Stack gap={2}>
                <Grid container gap={2}>
                  <Grid>
                    <TextField
                      label="name"
                      // className="w-[48%]"
                      onChange={handleChange}
                      variant="filled"
                    />
                    <Select />
                  </Grid>
                  <Autocomplete
                    id="combo-box-demo"
                    getOptionLabel={(option) => option.name}
                    options={[{ name: "abc" }]}
                    renderInput={(params: any) => (
                      <TextField
                        variant="outlined"
                        {...params}
                        placeholder="Select the project"
                        size="small"
                      />
                    )}
                  />
                  <Select />
                </Grid>
                <Grid container gap={2}>
                  <Checkbox
                    defaultChecked
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                  <TextField label="name" onChange={handleChange} />
                  <TextField onChange={handleChange} />
                </Grid>
                <Grid container gap={2}>
                  <Select />
                  <DatePicker
                    disableFuture
                    label="Responsive"
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <TextField onChange={handleChange} />
                </Grid>
                <Grid container gap={2}>
                  <TextField label="name" onChange={handleChange} variant="filled"/>
                  <TextField onChange={handleChange} variant="filled"/>
                  <TextField onChange={handleChange} variant="filled"/>
                </Grid>
                <Grid>
                  <Button
                    type="submit"
                    // color="primary"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                  <Button variant="outlined">Clear filters</Button>
                </Grid>
              </Stack>
            </form>
          )}
        </Formik>
      </Grid>
    </Box>
  );
}

   