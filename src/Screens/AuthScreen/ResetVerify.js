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
} from 'react-native'
import React from 'react'
import { Text, Stack, Box, HStack } from '@react-native-material/core'

const ResetVerify = () => {
     const otp0 = React.useRef(null)
     const otp1 = React.useRef(null)
     const otp2 = React.useRef(null)
     const otp3 = React.useRef(null)
     const [otpnum, setOtpNum] = React.useState(['', '', '', ''])

     React.useEffect(() => {
         otp0.current.focus()
     }, [])

     const handleInputOtp = (position, value) => {
         let otpArray = [...otpnum]
         otpArray[position] = value
         console.log('value', value)
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
                                        +254114635982
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
                                    <TouchableOpacity>
                                        <Text style={styles.resendText}>
                                            Resend Code
                                        </Text>
                                    </TouchableOpacity>
                                </Stack>
                            </Stack>

                            {/** button & signup */}
                            <Stack w='100%' items='center' spacing={20}>
                                <Pressable style={styles.buttonStyles}>
                                    <Text style={styles.buttonText}>Next</Text>
                                </Pressable>
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
        color: '#3E66FB',
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
        color: '#3E66FB',
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
        color: '#3E66FB',
    },
})

