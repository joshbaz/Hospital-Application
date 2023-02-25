import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import vitalReducer from './features/vitals/vitalSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        vitals: vitalReducer,
    },
})
