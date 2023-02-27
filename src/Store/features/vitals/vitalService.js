import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { BASE_API_ } from '../../../Middleware/base_url.config'
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

//vital b glucose
const CreateVitalBGlucose = async (userData) => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key')
        const response = await axios.post(
            `${BASE_API_}/appVital/v1/register/bglucose`,
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
            message: response.data.message,
        }

        await AsyncStorage.setItem(
            '@storage_vitalId',
            dataCollected.savedVitals
        )

        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

//vital b pressure
const CreateVitalBPressure = async (userData) => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key')
        const response = await axios.post(
            `${BASE_API_}/appVital/v1/register/bpressure`,
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
            message: response.data.message,
        }

        await AsyncStorage.setItem(
            '@storage_vitalId',
            dataCollected.savedVitals
        )
        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

//vital b fitness
const CreateVitalFitness = async (userData) => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key')
        const response = await axios.post(
            `${BASE_API_}/appVital/v1/register/fitness`,
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
            message: response.data.message,
        }

        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

//update symptoms
const UpdateVitalSymptoms = async (userData) => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key')
        const vitalId = await AsyncStorage.getItem('@storage_vitalId')
        const response = await axios.post(
            `${BASE_API_}/appVital/v1/update/symptoms/${vitalId}`,
            userData,
            {
                headers: {
                    Authorization: 'Brearer ' + value,
                },
            }
        )

        let dataCollected = {
            type: 'success',
            message: response.data,
        }
        await AsyncStorage.removeItem('@storage_vitalId')
        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

//recent main vital readings
const MainRecentVitalReading = async (userData) => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key')

        const response = await axios.get(
            `${BASE_API_}/appVital/v1/vital/recents`,
            {
                headers: {
                    Authorization: 'Brearer ' + value,
                },
            }
        )

        let dataCollected = {
            type: 'success',
            ...response.data,
        }

        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}


//glucose statistical reading
const StatisticalVitalGlucoseReading = async (userData) => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key')

        const response = await axios.get(
            `${BASE_API_}/appVital/v1/vital/statistics/glucose`,
            {
                headers: {
                    Authorization: 'Brearer ' + value,
                },
            }
        )

        let dataCollected = {
            type: 'success',
            ...response.data,
        }

        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}


//pressure statistical reading
const StatisticalVitalPressureReading = async (userData) => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key')

        const response = await axios.get(
            `${BASE_API_}/appVital/v1/vital/statistics/pressure`,
            {
                headers: {
                    Authorization: 'Brearer ' + value,
                },
            }
        )

        let dataCollected = {
            type: 'success',
            ...response.data,
        }

        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

const vitalService = {
    UpdateVitalSymptoms,
    CreateVitalFitness,
    CreateVitalBPressure,
    CreateVitalBGlucose,
    MainRecentVitalReading,
    StatisticalVitalGlucoseReading,
    StatisticalVitalPressureReading,
}

export default vitalService
