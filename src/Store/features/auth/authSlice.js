import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import authService from './authService'

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const Login = createAsyncThunk(
    'auth/login',
    async (userDetails, thunkAPI) => {
        const LoginAttempt = await authService.Login(userDetails)

        if (LoginAttempt.type === 'success') {
            return LoginAttempt
        } else {
            return thunkAPI.rejectWithValue(LoginAttempt.message)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(Login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(Login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(Login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
