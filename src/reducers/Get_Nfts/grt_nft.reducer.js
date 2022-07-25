import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadWeb3 } from "../../components/Api/api";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";

export const getallNFTs = createAsyncThunk(
  "getallNFTs",

  async (id, thunkAPI) => {
    const Web3Api = useMoralisWeb3Api();

    console.log("check_here");

    try {
      // let acc = await loadWeb3();

      const options = {
        chain: "Bsc Testnet",
        address: "0x1BC322e7412b625cafC95f2a29f37a076e1C8a92",
      };
      const polygonNFTs = await Web3Api.account.getNFTs(options);
      console.log("ree", polygonNFTs);
      let res = polygonNFTs;

      return res;
    } catch (error) {
      console.log("Error while addOrder ", error);
    }
  }
);

export const getnftSlice = createSlice({
  name: "getnft",
  initialState: {
    order_deatails: [],
    check_order: "idle",
  },
  extraReducers: {
    [getallNFTs.pending]: (state, action) => {
      state.check_order = "pending";
      console.log("pending");
    },
    [getallNFTs.fulfilled]: (state, action) => {
      state.check_order = "loaded";
      state.order_deatails = action.payload;
      console.log("state.order_deatails", state.order_deatails);
    },
  },
});

export const { incrementByAmount } = getnftSlice.actions;
// export const selectUserAddress = (state) => state.user.useraddress;
export default getnftSlice.reducer;
