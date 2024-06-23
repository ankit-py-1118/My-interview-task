import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postHelper } from "../../helpers/client";

export const loginAction = createAsyncThunk("fetchLogin", async (payload) => {
  try {
    const res = await postHelper("customer/login", payload);

    return res;
  } catch (err) {
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
