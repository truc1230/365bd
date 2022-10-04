// import DashboardBuilder from "components/DashboardBuilder";
import Layout from "components/Layout";
import styled from "styled-components";
import * as React from "react";
import { DataGrid, GridCallbackDetails, GridRowParams, GridToolbar, MuiEvent } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { Box, Grid } from "@mui/material";
import FilterControls from "components/FilterControls";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];
export const Dashboard: React.FC<{}> = () => {
  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });
  const handleClickRow = (
    params: GridRowParams,
    event: MuiEvent<React.MouseEvent>,
    details: GridCallbackDetails,
  ) => {
    console.log(params)
    console.log(event)
    console.log(details)
  }
  return (
    <Layout>
      <Box className="min-h-screen flex flex-col">
        <Grid container gap={4}>
          <Grid lg={6}>
            <FilterControls />
          </Grid>
          <Grid lg={6}></Grid>
        </Grid>
        <div className="h-[500px]">
          <DataGrid
            {...data}
            components={{ Toolbar: GridToolbar }}
            onRowClick={handleClickRow}
          />
        </div>
      </Box>
    </Layout>
  );
};
