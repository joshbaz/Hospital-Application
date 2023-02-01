import {
    StyleSheet,
    SafeAreaView,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ImageBackground,
} from 'react-native'
import React from 'react'
import { Text, Stack, Box, HStack } from '@react-native-material/core'

const RegisterSuccess = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Stack style={styles.container} spacing={70}>
                        <Stack spacing={20} justify='center' items={'center'}>
                            <Box h='60%' w='100%'>
                                <Image
                                    source={require('../../../assets/creationsuccess.png')}
                                    style={styles.imageStyle}
                                />
                            </Box>

                            <Stack
                                spacing={15}
                                justify='center'
                                items={'center'}>
                                <Text variant='h1' style={styles.textHeader}>
                                    Account Created
                                </Text>
                                <Box
                                    w='80%'
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text variant='h5' style={styles.subHeader}>
                                        Dear user your account has been created
                                        successfully. Continue to start using
                                        app
                                    </Text>
                                </Box>
                            </Stack>
                        </Stack>

                        <Stack w='100%' items='center' spacing={50}>
                            {/** button & signup */}
                            <Stack w='100%' items='center' spacing={20}>
                                <Pressable style={styles.buttonStyles}>
                                    <Text style={styles.buttonText}>
                                        Continue
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

export default RegisterSuccess

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5E5E5',
    },
    imageStyle: {
        resizeMode: 'cover',
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
