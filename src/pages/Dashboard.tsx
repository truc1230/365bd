// import DashboardBuilder from "components/DashboardBuilder";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { Box, Button, Grid, Stack, Tab, Typography } from "@mui/material";
import BreadcrumbsLCM from "components/BreadcrumbsLCM";
import GeneralTab from "components/GeneralTab";
import Layout from "components/Layout";
import { Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";

export const Dashboard: React.FC<{}> = () => {
  const [value, setValue] = React.useState("1");

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const onSaveClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };
  return (
    <Layout>
      <BreadcrumbsLCM />
      <Formik
        initialValues={{}}
        validationSchema={Yup.object().shape({})}
        onSubmit={(values, { setStatus: onSetStatus }) => {
          console.log(values)
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
            <Stack>
              <Grid container className="justify-between">
                <Typography>LEAD DETAILS</Typography>
                <Grid>
                  <Button variant="outlined">SAVE & ADD NEW</Button>
                  <Button variant="contained" type="submit">
                    SAVE
                  </Button>
                </Grid>
              </Grid>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChangeTab}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="General" value="1" />
                      <Tab label="Contact Info" value="2" />
                      <Tab label="Activities" value="3" />
                      <Tab label="Proposals" value="4" />
                      <Tab label="Photos" value="5" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <GeneralTab handleChange={handleChange}/>
                  </TabPanel>
                  <TabPanel value="2">Item Two</TabPanel>
                  <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
              </Box>
            </Stack>
          </form>
        )}
      </Formik>
    </Layout>
  );
};
