import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const action = createSlice({
  name: "stake",
  initialState: {
    address: "",
    hash: "",
    loader: false,
  },
  reducers: {
    ownerAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { ownerAddress } = action.actions;

export default action.reducer;
