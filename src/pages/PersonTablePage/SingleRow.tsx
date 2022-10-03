import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { PersonTableProps, TypePerson } from "@types";
import { useAppDispatch } from "store";
import { PersonSlice } from "store/Person";

interface Props extends PersonTableProps {
  row: TypePerson;
}

export default function SingleRow({
  row,
  selected,
  setSelected,
  handleClickUpdatePerson,
}: Props) {
  const isSelected = (id: string) => selected.indexOf(id) !== -1;
  const isItemSelected = isSelected(row.id);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const index = selected.indexOf(id);
    let newListSelected: readonly string[] = [];
    if (index === -1) {
      newListSelected = newListSelected.concat(selected, id);
    } else if (index === 0) {
      newListSelected = newListSelected.concat(selected.slice(1));
    } else if (index === selected.length - 1) {
      newListSelected = newListSelected.concat(selected.slice(0, -1));
    } else if (index > 0) {
      newListSelected = newListSelected.concat(
        selected.slice(0, index),
        selected.slice(index + 1)
      );
    }
    setSelected(newListSelected);
  };

  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.fullName}
      selected={isItemSelected}
    >
      <TableCell>
        <Checkbox
          color="primary"
          checked={isItemSelected}
          onClick={(event) => handleClick(event, row.id)}
        />
      </TableCell>
      <TableCell align="left">{row.fullName}</TableCell>
      <TableCell align="left">{row.email}</TableCell>
      <TableCell align="left">{row.phoneNumber}</TableCell>
      <TableCell padding="checkbox">
        <Stack direction="row">
          <DriveFileRenameOutlineIcon
            sx={{ marginRight: 2, cursor: "pointer" }}
            onClick={() => {
              handleClickUpdatePerson(row);
            }}
          />

          <DeleteOutlineIcon
            sx={{ marginRight: 2, cursor: "pointer" }}
            onClick={() => {
              dispatch(PersonSlice.actions.deletePerson(row));
            }}
          />
        </Stack>
      </TableCell>
    </TableRow>
  );
}
