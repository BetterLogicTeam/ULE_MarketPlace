import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { loadWeb3 } from "../../components/Api/api";
import { nftMarketContractAddress, nftMarketContractAddress_Abi } from "../../components/Utils/Contract";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";



export const pendingOrder = createAsyncThunk(
	"pendingOrder",
	async (id, thunkAPI) => {
		// thunkAPI.dispatch(actionLoading());
        console.log("oy",id);
    let acc = await loadWeb3();
    if (acc == "No Wallet") {
      toast.error("No Wallet Connected")
    }
    else if (acc == "Wrong Network") {
      toast.error("Wrong Newtwork please connect to test net")
    } else {
		try {
            const web3 = window.web3;
            let nftContractOftoken = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);
            
          
           
    
            let datapendingorder = await nftContractOftoken.methods.pendingOrders(id).call();
            console.log("datapendingorder", datapendingorder)

            return datapendingorder;
          
            // setorderdata(datapendingorder);
    
          
			
		} catch (error) {
            console.log("Error while addOrder ", error)

		}
    }
}



	
)







	

export const nftSlice = createSlice({
  name: "nft",
  initialState: {
    nft_details: {},
    // order_deatails:{},
    order_status:"idle",
    // check_order:'idle'
  },extraReducers: {
		[pendingOrder.pending]: (state, action) => {
			state.order_status = "pending";
		},
		[pendingOrder.fulfilled]: (state, action) => {
			state.order_status = "loaded";
            state.nft_details=action.payload;
		},


    //     [fetchNFTs.pending]: (state, action) => {
		// 	state.check_order = "pending";
		// },
		// [fetchNFTs.fulfilled]: (state, action) => {
		// 	state.check_order = "loaded";
    //         state.order_deatails=action.payload;
		// }
  }

});

// export const selectUserAddress = (state) => state.user.useraddress;
export default nftSlice.reducer;
