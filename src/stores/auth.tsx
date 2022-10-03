import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TypeLoginPayload, TypeResLoginPayload } from "@types";
import { LOGIN_URL } from "api";
import axiosClient from "api/axiosClient";


interface InitialState {
  loading: boolean;
  user: any;
  token: string;
}
const initialState: InitialState = {
  loading: false,
  user: {},
  token: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      const resLoginPayload: TypeResLoginPayload = action.payload.data;
      state.loading = false;
      state.token = resLoginPayload.token;
      state.user = resLoginPayload.user;
    });
    builder.addCase(loginAction.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const loginAction = createAsyncThunk(
  "auth/login",
  async (payload: TypeLoginPayload) => {
    console.log(payload);
    // process here
    const rs = await axiosClient.post(LOGIN_URL, payload);
    return rs;
  },
);
