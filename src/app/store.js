import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import counterReducer from "../themes/counterSlice";
import pendingoder from "../themes/pendingOrder";
import nftreducer from "../reducers/nft.reducer/nft.reducer";
// import getnftreducer from '../reducers/Get_Nfts/grt_nft.reducer'
import getnft from "../reducers/Get_Nfts/getNFT.reducer";

const reducers = combineReducers({
  counter: counterReducer,
  // nft:nftreducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["counter"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",

  reducer: {
    user: userReducer,
    nft: nftreducer,
    getnft: getnft,
  },
});
