import {
    StyleSheet,
    SafeAreaView,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'
import React from 'react'
import { Text, Stack, Box, HStack } from '@react-native-material/core'
import PhoneInput from 'react-native-phone-number-input'

const RegisterScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Stack style={styles.container} spacing={65}>
                        <Stack spacing={15} justify='center' items={'center'}>
                            <Text variant='h1' style={styles.textHeader}>
                                Mobile Number
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

                        <Stack w='100%' spacing={100}>
                            {/** inputs */}
                            <Stack w='100%' items='center' spacing={20}>
                                <PhoneInput
                                    containerStyle={styles.inputs}
                                    textContainerStyle={styles.inputsPhone}
                                    defaultValue={''}
                                    defaultCode='KE'
                                    layout='first'
                                    placeholder='Mobile number'
                                />
                            </Stack>

                            {/** button & signup */}
                            <Stack w='100%' items='center' spacing={20}>
                                <Pressable style={styles.buttonStyles}>
                                    <Text style={styles.buttonText}>
                                        Send Code
                                    </Text>
                                </Pressable>
                            </Stack>
                        </Stack>
                    </Stack>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

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
