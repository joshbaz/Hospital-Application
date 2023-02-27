import {
    StyleSheet,
    SafeAreaView,
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
import PhoneInput from 'react-native-phone-number-input'
import { ForgotPasskey, reset } from '../../Store/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-root-toast'
import { Formik } from 'formik'
import * as yup from 'yup'

const ForgotScreen = ({ navigation }) => {
    let dispatch = useDispatch()
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)

    //validation schema
    const validationSchema = yup.object().shape({
        phoneNumber: yup.string().required('required'),
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

                navigation.navigate('ResetVerify')
            }
            dispatch(reset())
        }
    }, [isError, isSuccess, message, dispatch])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Stack style={styles.container} spacing={65}>
                        <Stack spacing={15} justify='center' items={'center'}>
                            <Text variant='h1' style={styles.textHeader}>
                                Forgot Password
                            </Text>
                            <Box
                                w='80%'
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text variant='h5' style={styles.subHeader}>
                                    Please enter your valid phone number. We
                                    will send you 4-digit code to verify
                                    account.
                                </Text>
                            </Box>
                        </Stack>

                        <Formik
                            initialValues={{
                                phoneNumber: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, helpers) => {
                                setHelperFunctions(helpers)

                                dispatch(ForgotPasskey(values))
                                setIsSubmittingp(() => true)
                            }}>
                            {({
                                values,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                            }) => (
                                <Stack w='100%' spacing={100}>
                                    {/** inputs */}
                                    <Stack w='100%' items='center' spacing={20}>
                                        <PhoneInput
                                            containerStyle={styles.inputs}
                                            textContainerStyle={
                                                styles.inputsPhone
                                            }
                                            defaultValue={values.phoneNumber}
                                            onChangeFormattedText={handleChange(
                                                'phoneNumber'
                                            )}
                                            defaultCode='KE'
                                            layout='first'
                                            placeholder='Mobile number'
                                        />
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
                                                    Send Code
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
        </SafeAreaView>
    )
}

export default ForgotScreen

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
        textAlign: 'center',
    },
    inputs: {
        width: '80%',
        backgroundColor: 'transparent',
        height: 60,
        borderWidth: 1,
        borderRadius: 10,
        padding: 0,
        borderColor: 'rgba(22, 25, 28, 0.2)',
    },
    inputsPhone: {
        width: '80%',
        backgroundColor: 'transparent',
        height: 60,

        borderRadius: 10,
        padding: 0,
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
