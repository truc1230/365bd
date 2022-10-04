import { useState } from "react";
import { Button } from "@mui/material";
import PersonTable from "pages/PersonTablePage/PersonTable";
import styled from "styled-components";
import PersonDialog from "./PersonDialog";
import { TypePerson } from "@types";
import Layout from "components/Layout";
import { PersonSlice, useAppDispatch, useAppSelector } from "stores";
import { usePersonModal } from "./usePersonDialog";

function PersonTablePage() {
  const [selected, setSelected] = useState([]);
  const listPerson = useAppSelector((state) => state.person.listPerson);
  function handleClickAddPerson() {
    setModalPerson("add", {} as TypePerson);
  }
  function handleClickUpdatePerson(Person: TypePerson) {
    setModalPerson("update", Person);
  }
  const dispatch = useAppDispatch();

  const {
    isShowModalPerson,
    typePerson,
    valuesPerson,
    setModalPerson,
    setIsShowModalPerson,
  } = usePersonModal();

  function handleSubmitForm(values: string) {
    switch (typePerson) {
      case "add":
        dispatch(PersonSlice.actions.addPerson(values));
        break;
      case "update":
        dispatch(PersonSlice.actions.updatePerson(values));
        break;
      default:
        throw new Error("None of case");
    }
  }

  return (
    <Layout>
      <HeadControls>
        <Button
          variant="outlined"
          
          sx={{ mr: 5 }}
          onClick={() => {
            dispatch(PersonSlice.actions.deleteMultiPerson(selected));
          }}
        >
          Delete Persons
        </Button>
        <Button variant="contained" className="bg-red-500 text-blue-500 rounded-3xl" onClick={handleClickAddPerson}>
          Add Person
        </Button>
      </HeadControls>
      <PersonTable
        listPerson={listPerson}
        setSelected={setSelected}
        selected={selected}
        handleClickUpdatePerson={handleClickUpdatePerson}
      />
      <PersonDialog
        open={isShowModalPerson}
        type={typePerson}
        values={valuesPerson}
        handleClose={setIsShowModalPerson}
        onSubmit={handleSubmitForm}
      ></PersonDialog>
    </Layout>
  );
}
export const HeadControls = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: ${({ theme }) => theme.spacing[0]};
`;
export default PersonTablePage;
