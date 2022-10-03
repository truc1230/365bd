import DashboardBuilder from "components/DashboardBuilder";
import Layout from "components/Layout";
import styled from "styled-components";
import * as React from 'react';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin']
export const Dashboard: React.FC<{}> = () => {
  // const { data } = useDemoData({
  //   dataSet: 'Employee',
  //   visibleFields: VISIBLE_FIELDS,
  //   rowLength: 100,
  // });
  return (
    <Layout>
      <div className="text-bold text-3xl">h1</div>
      {/* <DashboardBuilder/> */}
      {/* <DataGrid {...data} components={{ Toolbar: GridToolbar }} /> */}
    </Layout>
  );
};
