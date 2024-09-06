import { createSlice } from '@reduxjs/toolkit'

// Initial state
const initialState = {
  latestCheckIn:0,
  latestCheckout:0,
  showCheckinTime:"",
  working:""
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
    setWorking: (state,action) => {
    
      state.working =action.payload
    },
    
    
  },
})

// Export actions
export const {addLatestCheckOut,addLatestcheckIn,setShowCheckinTime,setWorking} = punchSlice.actions

// Export reducer
export default punchSlice.reducer
