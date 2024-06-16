import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {},
  };

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setDataUser: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setDataUser } =
  userSlice.actions;

export default userSlice.reducer;