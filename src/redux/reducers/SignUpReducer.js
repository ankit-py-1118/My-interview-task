import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postHelper } from "../../helpers/client";
import toast, { Toaster } from 'react-hot-toast';


export const signUpAction = createAsyncThunk("fetchSignUp", async (payload) => {
  try {
    const res = await postHelper("user/register", payload);
    toast.success("Your account has been registered")
    return res;
  } catch (err) {
    toast.error(err.response.data.errorMessage)
    console.log(err, "signpuaction")
    return err;
  }
});

const signUpSlice = createSlice({
  name: "signup",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(signUpAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signUpAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(signUpAction.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.data = action.payload;
    });
  },
});

export default signUpSlice.reducer;
