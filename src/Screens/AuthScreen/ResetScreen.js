import {
    StyleSheet,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    ActivityIndicator,
} from 'react-native'
import React from 'react'
import { Text, Stack, Box, HStack } from '@react-native-material/core'
import { Ionicons } from '@expo/vector-icons'
import { ResetPasskeys, reset } from '../../Store/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-root-toast'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Formik } from 'formik'
import * as yup from 'yup'

const ResetScreen = ({ navigation }) => {
    let dispatch = useDispatch()

    const [textSecure, setTextSecure] = React.useState(true)

    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [phoneToVerify, setPhoneToVerify] = React.useState('')
    const [patId, setPatId] = React.useState('')

    const onChangeSecure = () => {
        setTextSecure(!textSecure)
    }

    React.useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('@reset_number')
                const patvalue = await AsyncStorage.getItem('@storage_pat')
                if (value !== null) {
                    // value previously stored
                    setPhoneToVerify(() => value)
                }

                if (patvalue !== null) {
                    // value previously stored
                    setPatId(() => patvalue)
                }
            } catch (e) {
                // error reading value
            }
        }

        getData()
    }, [])

    //validation schema
    const validationSchema = yup.object().shape({
        password: yup.string().required('password is required'),
        passwordConfirmation: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
    })

    const { isError, isSuccess, message } = useSelector((state) => state.auth)

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

        if (isSuccess && message) {
            if (helperFunctions !== null) {
                let toast = Toast.show(message, {
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

                navigation.navigate('Login')
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
                            Reset Password
                        </Text>
                        <Text variant='h5' style={styles.subHeader}>
                            Please reset your password
                        </Text>
                    </Stack>

                    <Formik
                        initialValues={{
                            passwordConfirmation: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, helpers) => {
                            setHelperFunctions(helpers)
                            

                            let allValues = {
                                password: values.password,
                                phoneNumber: phoneToVerify,
                                patientId: patId,
                            }
                            dispatch(ResetPasskeys(allValues))
                            setIsSubmittingp(() => true)
                        }}>
                        {({
                            values,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            errors,
                        }) => (
                            <Stack w='100%' spacing={31}>
                                {/** inputs */}
                                <Stack w='100%' items='center' spacing={20}>
                                    <HStack style={styles.passwordContainer}>
                                        <TextInput
                                            style={styles.passwordInput}
                                            secureTextEntry={textSecure}
                                            placeholderTextColor='rgba(22, 25, 28, 0.2)'
                                            placeholder='type a new password...'
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

                                    <Stack>
                                        <HStack
                                            style={styles.passwordContainer}>
                                            <TextInput
                                                style={styles.passwordInput}
                                                secureTextEntry={textSecure}
                                                placeholderTextColor='rgba(22, 25, 28, 0.2)'
                                                placeholder='confirm new password...'
                                                value={
                                                    values.passwordConfirmation
                                                }
                                                onChangeText={handleChange(
                                                    'passwordConfirmation'
                                                )}
                                                onBlur={handleBlur(
                                                    'passwordConfirmation'
                                                )}
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

                                        {errors.passwordConfirmation && (
                                            <Text color='red'>
                                                {errors.passwordConfirmation}
                                            </Text>
                                        )}
                                    </Stack>
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
                                        <Pressable
                                            onPress={handleSubmit}
                                            style={styles.buttonStyles}>
                                            <Text style={styles.buttonText}>
                                                Continue
                                            </Text>
                                        </Pressable>
                                    )}
                                </Stack>
                            </Stack>
                        )}
                    </Formik>
                </Stack>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default ResetScreen

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
