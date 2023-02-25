import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import vitalService from './vitalService'

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    mainrecents: {
        BPressureVital: '0/0',
        BGlucoseVital: '0',
    },
}

export const createVitalBGlucose = createAsyncThunk(
    'vital/create/glucose',
    async (userDetails, thunkAPI) => {
        const CreateAttempt = await vitalService.CreateVitalBGlucose(
            userDetails
        )

        if (CreateAttempt.type === 'success') {
            return CreateAttempt.message
        } else {
            return thunkAPI.rejectWithValue(CreateAttempt.message)
        }
    }
)

export const createVitalBPressure = createAsyncThunk(
    'vital/create/pressure',
    async (userDetails, thunkAPI) => {
        const CreateAttempt = await vitalService.CreateVitalBPressure(
            userDetails
        )

        if (CreateAttempt.type === 'success') {
            return CreateAttempt.message
        } else {
            return thunkAPI.rejectWithValue(CreateAttempt.message)
        }
    }
)

export const createVitalFitness = createAsyncThunk(
    'vital/create/fitness',
    async (userDetails, thunkAPI) => {
        const CreateAttempt = await vitalService.CreateVitalFitness(userDetails)

        if (CreateAttempt.type === 'success') {
            return CreateAttempt.message
        } else {
            return thunkAPI.rejectWithValue(CreateAttempt.message)
        }
    }
)

export const updateVitalSymptoms = createAsyncThunk(
    'vital/update/symptoms',
    async (userDetails, thunkAPI) => {
        const CreateAttempt = await vitalService.UpdateVitalSymptoms(
            userDetails
        )

        if (CreateAttempt.type === 'success') {
            return CreateAttempt.message
        } else {
            return thunkAPI.rejectWithValue(CreateAttempt.message)
        }
    }
)

export const MainRecentVitalReading = createAsyncThunk(
    'vital/find/mainrecentvitals',
    async (userDetails, thunkAPI) => {
        const CreateAttempt = await vitalService.MainRecentVitalReading(
            userDetails
        )

        if (CreateAttempt.type === 'success') {
            return CreateAttempt
        } else {
            return thunkAPI.rejectWithValue(CreateAttempt.message)
        }
    }
)

export const vitalSlice = createSlice({
    name: 'vitals',
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
            .addCase(createVitalBGlucose.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createVitalBGlucose.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(createVitalBGlucose.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** create vital bpressure */
            .addCase(createVitalBPressure.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createVitalBPressure.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(createVitalBPressure.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** vital fitness */
            .addCase(createVitalFitness.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createVitalFitness.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(createVitalFitness.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /**  update vital symptoms */
            .addCase(updateVitalSymptoms.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateVitalSymptoms.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(updateVitalSymptoms.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /**  find main recent vitals */
            .addCase(MainRecentVitalReading.pending, (state) => {
                state.isLoading = true
            })
            .addCase(MainRecentVitalReading.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.mainrecents = action.payload
            })
            .addCase(MainRecentVitalReading.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = vitalSlice.actions
export default vitalSlice.reducer
