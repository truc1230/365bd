import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { HeadCell, PersonTableProps } from "@types";
import SingleRow from "./SingleRow";

const headCells: HeadCell[] = [
  {
    id: "name",
    disablePadding: true,
    aligh: "left",
    label: "full name",
  },
  {
    id: "calories",
    aligh: "left",
    disablePadding: false,
    label: "email",
  },
  {
    id: "fat",
    aligh: "left",
    disablePadding: false,
    label: "phoneNumber",
  },
];

export default function PersonTable(props: PersonTableProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.aligh}
                    padding={headCell.disablePadding ? "none" : "normal"}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
                <TableCell padding="checkbox"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.listPerson.map((Person, index) => {
                return <SingleRow row={Person} key={index} {...props} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
