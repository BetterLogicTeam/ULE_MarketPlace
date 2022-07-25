// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { loadWeb3 } from "../../components/Api/api";
// import { useMoralisWeb3Api, useMoralis } from "react-moralis";

// // export const getallNFTs = createAsyncThunk();
// function reducer(state = initialState, action) {
//   switch (action.type) {
//     case :
//       return {
//         ...state,
//         order_deatails: action.order_deatails,
//       };
//     default:
//       return state;
//   }
// }
// export const getnftSlice = createSlice({
//   name: "getnft",
//   initialState: {
//     order_deatails: [],
//     check_order: "idle",
//   },
//   extraReducers: {
//     [getallNFTs.pending]: (state, action) => {
//       state.check_order = "pending";
//       console.log("pending");
//     },
//     [getallNFTs.fulfilled]: (state, action) => {
//       state.check_order = "loaded";
//       state.order_deatails = action.payload;
//       console.log("state.order_deatails", state.order_deatails);
//     },
//   },
// });

// export const { incrementByAmount } = getnftSlice.actions;
// // export const selectUserAddress = (state) => state.user.useraddress;
// export default getnftSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getnftSlice = createSlice({
  name: "getnft",
  initialState: {
    order_deatails: [],
    check_order: "idle",
  },
  reducers: {
    getAllNFT(state, action) {
      state.order_deatails = action.payload;
    },
  },
});

export const { getAllNFT } = getnftSlice.actions;
export default getnftSlice.reducer;
