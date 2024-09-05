import { createSlice } from '@reduxjs/toolkit'

// Initial state
const initialState = {
  latestCheckIn:0,
  latestCheckout:0,
  showCheckinTime:""
}

export const punchSlice = createSlice({
  name: 'punch',
  initialState,
  reducers: {
    addLatestcheckIn: (state, action) => {
      state.latestCheckIn =action.payload 
    },
    addLatestCheckOut: (state,action) => {
    
      state.latestCheckout =action.payload
    },
    setShowCheckinTime: (state,action) => {
    
      state.showCheckinTime =action.payload
    },
    
  },
})

// Export actions
export const {addLatestCheckOut,addLatestcheckIn,setShowCheckinTime} = punchSlice.actions

// Export reducer
export default punchSlice.reducer
