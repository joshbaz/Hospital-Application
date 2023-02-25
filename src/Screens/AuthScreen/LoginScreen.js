import {
    StyleSheet,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
    View,
} from 'react-native'
import React from 'react'
import { Text, Stack, Box, HStack } from '@react-native-material/core'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Login, reset } from '../../Store/features/auth/authSlice'
import Toast from 'react-native-root-toast'
import { Formik } from 'formik'
import * as yup from 'yup'
const LoginScreen = ({ navigation }) => {
    let dispatch = useDispatch()
    const [valueText, setValueText] = React.useState('passkey')
    const [textSecure, setTextSecure] = React.useState(true)
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)

    const onChangeSecure = () => {
        setTextSecure(!textSecure)
    }

    //validation schema
    const validationSchema = yup.object().shape({
        phoneNumber: yup.string().required('required'),
        password: yup.string().required('password is required'),
    })

    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    React.useEffect(() => {
        if (isError) {
            if (helperFunctions !== null) {
                helperFunctions.setSubmitting(false)

                setIsSubmittingp(false)
            }
            let toast = Toast.show(message, {
                duration: Toast.durations.LONG,
                position: 80,
                backgroundColor: 'red',
            })

            setTimeout(function hideToast() {
                Toast.hide(toast)
            }, 8000)

            dispatch(reset())
        }

        if (isSuccess && isSubmittingp) {
            if (helperFunctions !== null) {
                let toast = Toast.show('successfully loggedIn', {
                    duration: Toast.durations.LONG,
                    position: 80,
                })

                setTimeout(function hideToast() {
                    Toast.hide(toast)
                }, 8000)
                helperFunctions.resetForm()
                helperFunctions.setSubmitting(false)
                setIsSubmittingp(false)
                setHelperFunctions(null)
                if (user.onBoardInfo) {
                    console.log('test')
                    navigation.navigate('Home')
                } else {
                    navigation.navigate('OnboardingScreen')
                }
            }
            dispatch(reset())
        }
    }, [isError, isSuccess, message, dispatch])
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Stack style={styles.container} spacing={65}>
                    <Stack spacing={15} justify='center' items={'center'}>
                        <Text variant='h1' style={styles.textHeader}>
                            Welcome Back !
                        </Text>
                        <Text variant='h5' style={styles.subHeader}>
                            Sign in to continue.
                        </Text>
                    </Stack>

                    <Formik
                        initialValues={{
                            phoneNumber: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, helpers) => {
                            setHelperFunctions(helpers)
                            dispatch(Login(values))
                            setIsSubmittingp(() => true)
                        }}>
                        {({
                            values,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                            <Stack w='100%' spacing={31}>
                                {/** inputs */}
                                <Stack w='100%' items='center' spacing={20}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholderTextColor='rgba(22, 25, 28, 0.2)'
                                        placeholder='Mobile number'
                                        value={values.mobileNumber}
                                        onChangeText={handleChange(
                                            'phoneNumber'
                                        )}
                                        onBlur={handleBlur('phoneNumber')}
                                    />

                                    <HStack style={styles.passwordContainer}>
                                        <TextInput
                                            style={styles.passwordInput}
                                            secureTextEntry={textSecure}
                                            placeholderTextColor='rgba(22, 25, 28, 0.2)'
                                            placeholder='Password'
                                            value={values.password}
                                            onChangeText={handleChange(
                                                'password'
                                            )}
                                            onBlur={handleBlur('password')}
                                        />
                                        {textSecure ? (
                                            <Pressable
                                                onPress={onChangeSecure}
                                                style={styles.passwordIcon}>
                                                <Ionicons
                                                    name='ios-eye-off-outline'
                                                    size={25}
                                                    color='black'
                                                />
                                            </Pressable>
                                        ) : (
                                            <Pressable
                                                onPress={onChangeSecure}
                                                style={styles.passwordIcon}>
                                                <Ionicons
                                                    name='eye-outline'
                                                    size={25}
                                                    color='black'
                                                />
                                            </Pressable>
                                        )}
                                    </HStack>
                                </Stack>

                                {/** button & signup */}
                                <Stack w='100%' items='center' spacing={20}>
                                    {isSubmittingp ? (
                                        <View style={styles.buttonStyles}>
                                            <ActivityIndicator
                                                size='small'
                                                color='white'
                                            />
                                        </View>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={handleSubmit}
                                            style={styles.buttonStyles}>
                                            <Text style={styles.buttonText}>
                                                Sign in my Account
                                            </Text>
                                        </TouchableOpacity>
                                    )}

                                    <Text style={styles.accText}>
                                        Don't have an account? -{' '}
                                        <Text
                                            onPress={() =>
                                                navigation.navigate('Register')
                                            }
                                            style={styles.signUpText}>
                                            Sign Up
                                        </Text>
                                    </Text>
                                </Stack>
                            </Stack>
                        )}
                    </Formik>
                </Stack>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5E5E5',
    },
    textHeader: {
        fontFamily: 'Roboto_Medium',
        fontSize: 32,
        color: '#3E66FB',
    },
    subHeader: {
        fontFamily: 'Roboto_Regular',
        fontWeight: '400',
        fontSize: 16,
        color: '#C2C9D1',
    },
    inputs: {
        width: '80%',
        height: 44,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: 'rgba(22, 25, 28, 0.2)',
    },

    passwordContainer: {
        width: '80%',
        height: 44,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: 'rgba(22, 25, 28, 0.2)',
    },
    passwordInput: {
        width: '89%',
    },
    passwordIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'transparent',
        width: '11%',
    },
    buttonStyles: {
        height: 44,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#3E66FB',
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        padding: 0,
        margin: 0,
    },
    buttonText: {
        fontFamily: 'Roboto_Medium',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
    },
    accText: {
        fontFamily: 'Roboto_Regular',
        fontSize: 15,
        fontWeight: '400',
    },
    signUpText: {
        fontFamily: 'Roboto_Bold',
    },
})
