// import DashboardBuilder from "components/DashboardBuilder";
import Layout from "components/Layout";
import styled from "styled-components";
import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { Box } from "@mui/material";
import FilterControls from "components/FilterControls";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];
export const Dashboard: React.FC<{}> = () => {
  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });
  return (
    <Layout>
      <Box className="min-h-screen flex flex-col">
        <Box className="w-full">
          <FilterControls/>
        </Box>
        <div className="h-[600px]">
          <DataGrid {...data} components={{ Toolbar: GridToolbar }} />
        </div>
      </Box>
    </Layout>
  );
};
