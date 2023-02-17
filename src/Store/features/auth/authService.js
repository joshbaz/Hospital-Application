import axios from 'axios'
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

//login attempt
const Login = async (userData) => {
    try {
        const response = await axios.post(
            `${BASE_API_}/appPatient/v1/register`,
            userData
        )

        console.log('running find')
        //let dataCollected = { ...response.data, type: 'success' }

        let dataCollected = { message: response.data, type: 'success' }

        // Cookies.set('_tk', dataCollected.token)
        //user
        // Cookies.set('user', JSON.stringify({ ...dataCollected, type: null }))

        return dataCollected
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

const authService = {
    Login,
}

export default authService
