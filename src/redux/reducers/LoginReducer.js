import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postHelper } from "../../helpers/client";
import toast, { Toaster } from 'react-hot-toast';

export const loginAction = createAsyncThunk("fetchLogin", async (payload) => {
  try {
    const res = await postHelper("user/login", payload);
    toast.success("Login successful!")
    const setToken = localStorage.setItem("token", res.data.payload.token)
    return res;
  } catch (err) {
    toast.error(err.response.data.errorMessage)
    console.log(err, "postactionlayer")
    return err;
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.data = action.payload;
    });
  },
});

export default loginSlice.reducer;
