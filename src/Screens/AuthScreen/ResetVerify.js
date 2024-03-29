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
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import React from 'react'
import { Text, Stack, Box, HStack } from '@react-native-material/core'
import { useDispatch, useSelector } from 'react-redux'
import {
    ResetVerifys,
    ReSendOTPApp,
    reset,
} from '../../Store/features/auth/authSlice'
import Toast from 'react-native-root-toast'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS } from '../../Colorvariables/colors'

const ResetVerify = ({ navigation }) => {
    let dispatch = useDispatch()
    const otp0 = React.useRef(null)
    const otp1 = React.useRef(null)
    const otp2 = React.useRef(null)
    const otp3 = React.useRef(null)
    const [otpnum, setOtpNum] = React.useState(['', '', '', ''])
    const [phoneToVerify, setPhoneToVerify] = React.useState('')
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)

    const [isSubmittingResend, setIsSubmittingResend] = React.useState(false)
    const { isError, isSuccess, isResendSuccess, message } = useSelector(
        (state) => state.auth
    )
    React.useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('@reset_number')
                if (value !== null) {
                    // value previously stored
                    setPhoneToVerify(() => value)
                }
            } catch (e) {
                // error reading value
            }
        }

        getData()
    }, [])

    React.useEffect(() => {
        otp0.current.focus()
    }, [])

    const handleInputOtp = (position, value) => {
        let otpArray = [...otpnum]
        otpArray[position] = value

        setOtpNum(() => otpArray)

        if (position === 0 && otpArray[position] !== '' && value !== '') {
            otp1.current.focus()
        } else if (position === 0 && value == '') {
            otp0.current.focus()
        }
        if (position === 1 && otpArray[position] !== '' && value !== '') {
            otp2.current.focus()
        } else if (position === 1 && value == '') {
            otp0.current.focus()
        }
        if (position === 2 && otpArray[position] !== '' && value !== '') {
            otp3.current.focus()
        } else if (position === 2 && value == '') {
            otp1.current.focus()
        }
        if (position === 3 && value == '') {
            otp2.current.focus()
        }
    }

    const handleSubmitOtp = () => {
        if (
            otpnum[0] === '' ||
            otpnum[1] === '' ||
            otpnum[2] === '' ||
            otpnum[3] === ''
        ) {
            let toast = Toast.show('Missing opt field', {
                duration: Toast.durations.LONG,
                position: 80,
                backgroundColor: 'red',
            })

            setTimeout(function hideToast() {
                Toast.hide(toast)
            }, 8000)
        } else {
            let OtpString =
                `${otpnum[0]}` +
                `${otpnum[1]}` +
                `${otpnum[2]}` +
                `${otpnum[3]}`
            let OSplatform = Platform.OS === 'ios' ? 'IOS' : 'Android'
            dispatch(
                ResetVerifys({
                    platform: OSplatform,
                    otpString: OtpString,
                    phoneNumber: phoneToVerify,
                })
            )
            setIsSubmittingp(() => true)
        }
    }

    /** handle resend otp code */
    const handleReSendOTP = () => {
        if (phoneToVerify !== '') {
            setOtpNum(() => ['', '', '', ''])
            otp0.current.focus()
            dispatch(
                ReSendOTPApp({
                    phoneNumber: phoneToVerify,
                })
            )
            setIsSubmittingResend(() => true)
        }
    }

    React.useEffect(() => {
        if (isError) {
            let toast = Toast.show(message, {
                duration: Toast.durations.LONG,
                position: 80,
                backgroundColor: 'red',
            })

            setTimeout(function hideToast() {
                Toast.hide(toast)
            }, 8000)

            if (message === 'Account already verified') {
                setIsSubmittingp(false)
                dispatch(reset())
                navigation.navigate('Login')
            }
            setIsSubmittingp(false)
            setIsSubmittingResend(false)
            dispatch(reset())
        }

        if (isSuccess && message) {
            let toast = Toast.show(message, {
                duration: Toast.durations.LONG,
                position: 80,
                backgroundColor: 'green',
            })

            setTimeout(function hideToast() {
                Toast.hide(toast)
            }, 8000)

            setIsSubmittingp(false)

            navigation.navigate('ResetScreen')

            dispatch(reset())
        }

        if (isResendSuccess && message) {
            let toast = Toast.show(message, {
                duration: Toast.durations.LONG,
                position: 80,
                backgroundColor: 'green',
            })

            setTimeout(function hideToast() {
                Toast.hide(toast)
            }, 8000)

            setIsSubmittingResend(false)

            dispatch(reset())
        }
    }, [isError, isSuccess, message, isResendSuccess, dispatch])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Stack style={styles.container} spacing={65}>
                        <Stack spacing={15} justify='center' items={'center'}>
                            <Text variant='h1' style={styles.textHeader}>
                                Verify Reset!
                            </Text>
                            <Box
                                w='80%'
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text variant='h5' style={styles.subHeader}>
                                    Enter 4-digit Code we have sent to at{' '}
                                    <Text style={styles.subHeaderContact}>
                                        {phoneToVerify}
                                    </Text>
                                </Text>
                            </Box>
                        </Stack>

                        <Stack w='100%' items='center' spacing={100}>
                            {/** inputs */}
                            <Stack w='100%' items='center' spacing={40}>
                                <Stack
                                    w='80%'
                                    spacing={0}
                                    style={styles.otpContainer}>
                                    {[...Array(4)].map((data, index) => {
                                        let otpRef
                                        if (index === 0) {
                                            otpRef = otp0
                                        }
                                        if (index === 1) {
                                            otpRef = otp1
                                        }
                                        if (index === 2) {
                                            otpRef = otp2
                                        }
                                        if (index === 3) {
                                            otpRef = otp3
                                        }
                                        return (
                                            <TextInput
                                                key={index}
                                                ref={otpRef}
                                                autoFocus={
                                                    index === 0 ? true : false
                                                }
                                                keyboardType={'number-pad'}
                                                maxLength={1}
                                                style={styles.otpInputsText}
                                                value={otpnum[index]}
                                                onChangeText={(value) =>
                                                    handleInputOtp(index, value)
                                                }
                                            />
                                        )
                                    })}
                                </Stack>

                                {/** resend code */}
                                <Stack items='center' spacing={10}>
                                    <Text style={styles.noCodeText}>
                                        Didn't not received the code?
                                    </Text>
                                    {isSubmittingResend ? (
                                        <View>
                                            <ActivityIndicator
                                                size='small'
                                                color='black'
                                            />
                                        </View>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={handleReSendOTP}>
                                            <Text style={styles.resendText}>
                                                Resend Code
                                            </Text>
                                        </TouchableOpacity>
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
                                        onPress={handleSubmitOtp}
                                        style={styles.buttonStyles}>
                                        <Text style={styles.buttonText}>
                                            Next
                                        </Text>
                                    </Pressable>
                                )}
                            </Stack>
                        </Stack>
                    </Stack>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ResetVerify

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
        color: COLORS.primarycolor,
    },
    subHeader: {
        fontFamily: 'Roboto_Bold',
        fontWeight: '700',
        fontSize: 16,
        color: '#C2C9D1',
        lineHeight: 21,
        textAlign: 'center',
    },
    subHeaderContact: {
        fontFamily: 'Roboto_Bold',
        fontWeight: '700',
        fontSize: 16,
        color: COLORS.primarycolor,
        textDecorationLine: 'underline',
        lineHeight: 21,
        textAlign: 'center',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0,
        height: 48,
    },
    otpInputsText: {
        padding: 0,
        margin: 0,
        fontSize: 20,
        backgroundColor: 'transparent',
        height: '100%',
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        padding: 0,
        margin: 0,
        borderColor: 'rgba(22, 25, 28, 0.2)',
        textAlign: 'center',
    },

    buttonStyles: {
        height: 44,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: COLORS.primarycolor,
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
    noCodeText: {
        fontFamily: 'Roboto_Regular',
        fontSize: 15,
        fontWeight: '400',
        color: 'rgba(28, 25, 57, 0.8)',
        lineHeight: 18,
    },
    resendText: {
        fontFamily: 'Roboto_Bold',
        textDecorationLine: 'underline',
        fontSize: 16,
        lineHeight: 19,
        color: COLORS.primarycolor,
    },
})
