import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    useraddress: null,
    value: [],
    bidAmount:true

  },
  reducers: {
    setUser: (state, action) => {
      state.useraddress = action.payload;
    },
    
    incrementByAmount: (state, action) => {
      state.value = action.payload
    },
    biding: (state, action) => {
      console.log("Biding_here",action.payload);
      state.bidAmount = action.payload

    },
  },
});



export const { setUser } = userSlice.actions;
export const selectUserAddress = (state) => state.user.useraddress;
export const {incrementByAmount,biding } = userSlice.actions


export default userSlice.reducer;
