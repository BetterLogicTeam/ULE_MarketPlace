
import { createSlice } from '@reduxjs/toolkit'
import { loadWeb3 } from '../components/Api/api';


export const pendingoder = createSlice({
  name: 'counter',
  initialState: {
    value: [],
  },
  reducers: {
    increment: (state) => {
      
     
    },
   
    incrementByAmount: (state, action) => {
      state.value = action.payload
    },


  },
})

// Action creators are generated for each case reducer function
export const {incrementByAmount } = pendingoder.actions
export const pending = (state) => state.counter.value;

export default pendingoder.reducer