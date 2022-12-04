import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  status: string;
  errorMessages: string;
}

const initialState: initialStateType = {
  status: "checking-credentials",
  errorMessages: "",
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.status = "is-authenticated";
    },
    logout: (state) => {
      state.status = "is-notAuthenticated";
    },
    setErrorMessages: (state, action) => {
      state.errorMessages = action.payload;
    },
    checkingCredentials: (state, action) => {
      state.status = "checking-credentials";
    },
  },
});

export const { login, logout, setErrorMessages, checkingCredentials } =
  authReducer.actions;
