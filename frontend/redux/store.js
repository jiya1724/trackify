import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice';
import punchReducer from './punch/punchSlice'

export const store = configureStore({
    reducer: {
        authentication: authReducer,
        punch:punchReducer,
    },
})

export default store;