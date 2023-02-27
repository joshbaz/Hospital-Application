import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import authService from './authService'

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    isLoggedIn: false,
    user: {
        id: '',
        phoneNumber: '',
        fullname: '',
        onBoardInfo: false,
    },

    userdetails: {
        id: '',
        phoneNumber: '',
        fullname: '',
        patId: '',
        birthday: '',
        weight: '',
        height: '',
    },
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

export const Logout = createAsyncThunk('auth/logout', async () => {
    const LogoutAttempt = await authService.logout()

     if (LogoutAttempt.type === 'success') {
         return LogoutAttempt
     } else {
         return thunkAPI.rejectWithValue(LogoutAttempt.message)
     }
})

export const RegisterAppPatient = createAsyncThunk(
    'auth/register',
    async (userDetails, thunkAPI) => {
        const registerAttempt = await authService.PatientRegistration(
            userDetails
        )

        if (registerAttempt.type === 'success') {
            return registerAttempt.message
        } else {
            return thunkAPI.rejectWithValue(registerAttempt.message)
        }
    }
)

//registrationVerify
export const RegistrationVerify = createAsyncThunk(
    'auth/register/verify',
    async (userDetails, thunkAPI) => {
        const registerAttempt = await authService.RegistrationVerify(
            userDetails
        )

        if (registerAttempt.type === 'success') {
            return registerAttempt.message
        } else {
            return thunkAPI.rejectWithValue(registerAttempt.message)
        }
    }
)

//RegisterOnboardInfo
export const RegisterOnboardInfo = createAsyncThunk(
    'auth/register/onboardInfo',
    async (userDetails, thunkAPI) => {
        const registerAttempt = await authService.RegisterOnboardInfo(
            userDetails
        )

        if (registerAttempt.type === 'success') {
            return registerAttempt.message
        } else {
            return thunkAPI.rejectWithValue(registerAttempt.message)
        }
    }
)

//all details
export const GetAllDetails = createAsyncThunk(
    'auth/getdetails',
    async (userDetails, thunkAPI) => {
        const registerAttempt = await authService.GetAllDetails(userDetails)

        if (registerAttempt.type === 'success') {
            return registerAttempt
        } else {
            return thunkAPI.rejectWithValue(registerAttempt.message)
        }
    }
)

//update account
export const UpdateAccount = createAsyncThunk(
    'auth/editAccount',
    async (userDetails, thunkAPI) => {
        const registerAttempt = await authService.UpdateAccount(userDetails)

        if (registerAttempt.type === 'success') {
            return registerAttempt.message
        } else {
            return thunkAPI.rejectWithValue(registerAttempt.message)
        }
    }
)

//update passkey
export const UpdatePasskey = createAsyncThunk(
    'auth/update/passkey',
    async (userDetails, thunkAPI) => {
        const getAttempt = await authService.updatePasskey(userDetails)

        if (getAttempt.type === 'success') {
            return getAttempt.message
        } else {
            return thunkAPI.rejectWithValue(getAttempt.message)
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
                state.user = action.payload
                state.isLoggedIn = true
            })
            .addCase(Login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.isLoggedIn = false
            })
            .addCase(Logout.fulfilled, (state) => {
                state.user = null
                state.isSuccess = true
                state.message = 'logout success'
                state.isLoggedIn = false
            })

            /** register patient */
            .addCase(RegisterAppPatient.pending, (state) => {
                state.isLoading = true
            })
            .addCase(RegisterAppPatient.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(RegisterAppPatient.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** verify registration */
            .addCase(RegistrationVerify.pending, (state) => {
                state.isLoading = true
            })
            .addCase(RegistrationVerify.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(RegistrationVerify.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /**  register onboarding */
            .addCase(RegisterOnboardInfo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(RegisterOnboardInfo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
                 state.isLoggedIn = true
            })
            .addCase(RegisterOnboardInfo.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** get all details   */
            .addCase(GetAllDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(GetAllDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userdetails = action.payload
            })
            .addCase(GetAllDetails.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /**  register onboarding */
            .addCase(UpdateAccount.pending, (state) => {
                state.isLoading = true
            })
            .addCase(UpdateAccount.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(UpdateAccount.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** update passkey */
            .addCase(UpdatePasskey.pending, (state) => {
                state.isLoading = true
            })
            .addCase(UpdatePasskey.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(UpdatePasskey.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
