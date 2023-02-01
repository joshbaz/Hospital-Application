import {
    StyleSheet,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'
import React from 'react'
import { Text, Stack, Box, HStack } from '@react-native-material/core'
import { Ionicons } from '@expo/vector-icons'

const ResetScreen = () => {
    const [valueText, setValueText] = React.useState('')
    const [textSecure, setTextSecure] = React.useState(true)

    const onChangeSecure = () => {
        setTextSecure(!textSecure)
    }
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

                    <Stack w='100%' spacing={31}>
                        {/** inputs */}
                        <Stack w='100%' items='center' spacing={20}>
                            <HStack style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    secureTextEntry={textSecure}
                                    placeholderTextColor='rgba(22, 25, 28, 0.2)'
                                    placeholder='type a new password...'
                                    value={valueText}
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

                            <HStack style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    secureTextEntry={textSecure}
                                    placeholderTextColor='rgba(22, 25, 28, 0.2)'
                                    placeholder='confirm new password...'
                                    value={valueText}
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
                            <Pressable style={styles.buttonStyles}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </Pressable>
                        </Stack>
                    </Stack>
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
