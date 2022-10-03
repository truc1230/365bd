import { createSlice } from "@reduxjs/toolkit";
import { TypePerson } from "@types";

interface TypePersonState {
  listPerson: TypePerson[];
  loading: boolean;
}

const createData = (
  id: string,
  fullName: string,
  email: string,
  phoneNumber: string
): TypePerson => ({
  id,
  fullName,
  email,
  phoneNumber,
});

const listPerson = [
  createData("1", "Cupcake", "Cupcake1@gmail.com", "0963823673"),
  createData("2", "Cupcake", "Cupcake2@gmail.com", "0963823674"),
  createData("3", "Cupcake", "Cupcake3@gmail.com", "0963823675"),
  createData("4", "Cupcake", "Cupcake4@gmail.com", "0963823677"),
  createData("5", "Cupcake", "Cupcake5@gmail.com", "0963823672"),
  createData("6", "Cupcake", "Cupcake6@gmail.com", "0963823671"),
];
const initialState: TypePersonState = {
  listPerson: listPerson,
  loading: false,
};
export const PersonSlice = createSlice({
  name: "Person",
  initialState: initialState,
  reducers: {
    addPerson: (state, action) => {
      const newPerson = action.payload;
      state.listPerson = [newPerson, ...state.listPerson];
    },
    updatePerson: (state, action) => {
      const newPerson = action.payload;

      state.listPerson = state.listPerson.map((Person) => {
        // return Person;
        if (Person.id === newPerson.id) return newPerson;
        return Person;
      });
    },
    deletePerson: (state, action) => {
      state.listPerson = state.listPerson.filter(
        (Person) => Person.id !== action.payload.id
      );
    },
    deleteMultiPerson: (state, action) => {
      const listPersonDelete = action.payload;
      state.listPerson = state.listPerson.filter(
        (Person) => listPersonDelete.indexOf(Person.id) === -1
      );
    },
  },
  extraReducers: (builder) => {},
});
