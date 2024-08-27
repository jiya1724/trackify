import { createSlice } from '@reduxjs/toolkit'

// Initial state
const initialState = {
  userData: {},
  userId:''
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    addData: (state, action) => {
      // Update state.userData with the new data
      state.userData = {
        ...state.userData,
        ...action.payload
      }
    },
    RemoveData: (state) => {
      // Update state.userData with the new data
      state.userData = {}
    },
    setUserId: (state, action) => {
      // Update state.userData with the new data
      state.userId = action.payload;
    },
    
  },
})

// Export actions
export const { addData,setUserId,RemoveData} = authSlice.actions

// Export reducer
export default authSlice.reducer
