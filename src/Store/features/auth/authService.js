import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_API_ } from '../../../Middleware/base_url.config'
import { useNavigation } from '@react-navigation/native'
import { NativeModules } from 'react-native'
let errorFunction = (error) => {
    let errorArray = []
    errorArray.push(error)

    let responsedd = {
        message: '',
        type: 'error',
    }
    if (errorArray.length !== 0 && errorArray[0].response) {
        responsedd.message = errorArray[0].response.data
    } else if (errorArray.length !== 0 && !errorArray[0].response) {
        responsedd.message = errorArray[0].message
    }

    return responsedd
}

//login attempt
const Login = async (userData) => {
    try {
        const response = await axios.post(
            `${BASE_API_}/appPatient/v1/login`,
            userData
        )

        let dataCollected = {
            ...response.data,
            type: 'success',
            message: 'logged In',
        }
        await AsyncStorage.setItem('@storage_Key', dataCollected.token)
        await AsyncStorage.setItem('@storage_pat', dataCollected.patId)
        let userInfo = JSON.stringify({
            fullname: dataCollected.fullname,
            phoneNumber: dataCollected.phoneNumber,
        })

        await AsyncStorage.setItem('@user', userInfo)
        // await AsyncStorage.setItem('@storage_patN', dataCollected.patId)
        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

const logout = async () => {
    await AsyncStorage.removeItem('@storage_vitalId')
    await AsyncStorage.removeItem('@storage_Key')
    await AsyncStorage.removeItem('@verify_number')

    let dataCollected = {
        type: 'success',
        message: 'logged Out',
    }

    NativeModules.DevSettings.reload()
    return dataCollected
}

//patient resets password
const ForgotPasskey = async (userData) => {
    try {
        const response = await axios.post(
            `${BASE_API_}/appPatient/v1/forgotpassword`,
            userData
        )

        let dataCollected = { ...response.data, type: 'success' }
        await AsyncStorage.setItem('@reset_number', dataCollected.phoneNumber)

        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

//registrationVerify
const ResetVerify = async (userData) => {
    try {
        const response = await axios.post(
            `${BASE_API_}/appPatient/v1/reset/verify`,
            userData
        )

        let dataCollected = {
            ...response.data,
            type: 'success',
            message: 'verification successful',
        }
        await AsyncStorage.setItem('@reset_number', dataCollected.phoneNumber)
        await AsyncStorage.setItem('@storage_pat', dataCollected.patId)

        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

//reset passkey
const ResetPasskey = async (userData) => {
    try {
        const response = await axios.post(
            `${BASE_API_}/appPatient/v1/reset/passkey`,
            userData
        )

        let dataCollected = {
            type: 'success',
            message: response.data,
        }
        await AsyncStorage.removeItem('@reset_number')
        await AsyncStorage.removeItem('@storage_pat')

        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

//patient registration
const PatientRegistration = async (userData) => {
    try {
        const response = await axios.post(
            `${BASE_API_}/appPatient/v1/register`,
            userData
        )

        let dataCollected = { ...response.data, type: 'success' }
        await AsyncStorage.setItem('@verify_number', dataCollected.phoneNumber)

        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}


//patient resend OTP
const PatientResendOTP = async (userData) => {
    try {
        const response = await axios.post(
            `${BASE_API_}/appPatient/v1/resendOTP`,
            userData
        )

        let dataCollected = { ...response.data, type: 'success' }
        await AsyncStorage.setItem('@verify_number', dataCollected.phoneNumber)

        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

//registrationVerify
const RegistrationVerify = async (userData) => {
    try {
        const response = await axios.post(
            `${BASE_API_}/appPatient/v1/register/verify`,
            userData
        )

        let dataCollected = {
            ...response.data,
            type: 'success',
            message: 'verification successful',
        }
        await AsyncStorage.setItem('@storage_Key', dataCollected.token)
        await AsyncStorage.setItem('@storage_pat', dataCollected.patId)

        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

//registrationVerify
const RegisterOnboardInfo = async (userData) => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key')
        const response = await axios.post(
            `${BASE_API_}/appPatient/v1/register/onboardInfo`,
            userData,
            {
                headers: {
                    Authorization: 'Brearer ' + value,
                },
            }
        )

        let dataCollected = {
            ...response.data,
            type: 'success',
            message: 'Info updated successful',
        }

        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

//registrationVerify
const GetAllDetails = async (userData) => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key')
        const response = await axios.get(
            `${BASE_API_}/appPatient/v1/details`,

            {
                headers: {
                    Authorization: 'Brearer ' + value,
                },
            }
        )

        let dataCollected = {
            ...response.data,
            type: 'success',
            message: 'Info updated successful',
        }

        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

//update account
const UpdateAccount = async (userData) => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key')
        const response = await axios.post(
            `${BASE_API_}/appPatient/v1/edit/details`,
            userData,
            {
                headers: {
                    Authorization: 'Brearer ' + value,
                },
            }
        )

        let dataCollected = {
            ...response.data,
            type: 'success',
            message: 'Info updated successful',
        }
        //console.log('details', dataCollected)
        let userInfo = JSON.stringify({
            fullname: dataCollected.fullname,
            phoneNumber: dataCollected.phoneNumber,
        })

        await AsyncStorage.setItem('@user', userInfo)

        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

//update passkey
const updatePasskey = async (userDetails) => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key')

        const response = await axios.put(
            `${BASE_API_}/appPatient/v1/update/passkey`,
            userDetails,
            {
                headers: {
                    Authorization: 'Brearer ' + value,
                },
            }
        )

        return {
            message: response.data,
            type: 'success',
        }
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

const authService = {
    Login,
    PatientRegistration,
    PatientResendOTP,
    RegistrationVerify,
    RegisterOnboardInfo,
    GetAllDetails,
    UpdateAccount,
    logout,
    updatePasskey,
    ForgotPasskey,
    ResetVerify,
    ResetPasskey,
}

export default authService
