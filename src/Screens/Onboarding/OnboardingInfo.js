import {
    StyleSheet,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    TouchableOpacity,
    Modal,
    Button,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { Text, Stack, Box, HStack } from '@react-native-material/core'
import { StatusBar } from 'expo-status-bar'
import DateTimePicker from '@react-native-community/datetimepicker'

const OnboardingInfo = () => {
    const [date, setDate] = React.useState(new Date())
    const [mode, setMode] = React.useState('date')
    const [activateDate, setActivateDate] = React.useState(false)
    const [showDates, setShowDates] = React.useState('')

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        // setShowDates(Platform.OS === 'ios')
        setDate(currentDate)

        let tempDate = new Date(currentDate)
        let fDate =
            tempDate.getDate() +
            '/' +
            (tempDate.getMonth() + 1) +
            '/' +
            tempDate.getFullYear()

        console.log('fDate', fDate)
        if (Platform.OS === 'ios') {
            setShowDates(() => fDate)
        } else {
            setShowDates(() => fDate)
            setActivateDate(() => false)
        }
    }

    const showMode = (currentMode) => {
        setMode(currentMode)
        setActivateDate(() => true)
    }

    const iosAcceptBtn = () => {
        let tempDate = new Date(date)
        let fDate =
            tempDate.getDate() +
            '/' +
            (tempDate.getMonth() + 1) +
            '/' +
            tempDate.getFullYear()
        setShowDates(() => fDate)
        setActivateDate(() => false)
    }

    const iosCancelBtn = () => {
        setActivateDate(() => false)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Stack style={styles.container} spacing={36}>
                    {/** header */}
                    <Text variant='h1' style={styles.textHeader}>
                        Help us know you better...
                    </Text>
                    {/** Inputs */}
                    <Stack
                        w='80%'
                        h='80%'
                        style={{ justifyContent: 'space-between' }}>
                        <Stack spacing={8}>
                            <Text style={styles.inputLabel}>
                                What is your Patient ID?
                            </Text>
                            <TextInput
                                style={styles.inputTexts}
                                placeholder='Enter your ID number here...'
                            />
                        </Stack>
                        <Stack spacing={8}>
                            <Text style={styles.inputLabel}>
                                What is your Full name?
                            </Text>
                            <TextInput
                                style={styles.inputTexts}
                                placeholder='Enter your name here'
                            />
                        </Stack>
                        <Stack spacing={8}>
                            <Text style={styles.inputLabel}>Birthday</Text>

                            <TouchableWithoutFeedback
                                onPress={() => showMode('date')}>
                                <View style={styles.inputPickerContainer}>
                                    {showDates === '' ? (
                                        <Text
                                            style={styles.inputPickerText}
                                            placeholder='Please select date'
                                            inputMode='date'>
                                            Please select date
                                        </Text>
                                    ) : (
                                        <Text
                                            style={styles.inputPickerText}
                                            placeholder='Please select date'
                                            inputMode='date'>
                                            {showDates}
                                        </Text>
                                    )}
                                </View>
                            </TouchableWithoutFeedback>

                            <Modal
                                style={{
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                    marginTop: 0,
                                }}
                                animationType='slide'
                                transparent={true}
                                visible={activateDate}>
                                <View
                                    style={{
                                        backgroundColor: 'rgba(0,0,0,0.5)',

                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex: 1,
                                    }}>
                                    <Stack spacing={30}>
                                        <View style={styles.dateContainer}>
                                            <DateTimePicker
                                                textColor='#000'
                                                testID='dateTimePicker'
                                                value={date}
                                                mode={mode}
                                                display={
                                                    Platform.OS === 'ios'
                                                        ? 'spinner'
                                                        : 'default'
                                                }
                                                onChange={onChange}
                                                positiveButtonLabel='OK'
                                            />
                                        </View>

                                        {Platform.OS === 'ios' && (
                                            <TouchableOpacity
                                                onPress={iosAcceptBtn}
                                                style={styles.dateBtn}>
                                                <Text
                                                    style={styles.dateBtnText}>
                                                    Continue
                                                </Text>
                                            </TouchableOpacity>
                                        )}

                                        {Platform.OS === 'ios' && (
                                            <TouchableOpacity
                                                onPress={iosCancelBtn}
                                                style={styles.dateBtn}>
                                                <Text
                                                    style={styles.dateBtnText}>
                                                    Cancel
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    </Stack>
                                </View>
                            </Modal>
                        </Stack>
                        <Stack spacing={8}>
                            <Text style={styles.inputLabel}>Weight</Text>
                            <TextInput
                                style={styles.inputTexts}
                                placeholder='Please select your weight'
                            />
                        </Stack>
                        <Stack spacing={8}>
                            <Text style={styles.inputLabel}>Height</Text>
                            <TextInput
                                style={styles.inputTexts}
                                placeholder='Please select your height'
                            />
                        </Stack>

                        {/** button */}

                        <Stack spacing={10}>
                            <TouchableOpacity style={styles.nextBtn}>
                                <Text style={styles.nextBtnText}>Continue</Text>
                            </TouchableOpacity>

                            <Text style={styles.termsText}>
                                by clicking start, you agree to our{' '}
                                <Text style={styles.termsTextLink}>
                                    Privacy Policy{' '}
                                </Text>{' '}
                                our{' '}
                                <Text style={styles.termsTextLink}>
                                    Terms and Conditions
                                </Text>
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default OnboardingInfo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

        backgroundColor: '#E5E5E5',
    },
    textHeader: {
        fontFamily: 'Roboto_Medium',
        fontSize: 25,
        color: '#000',
        marginTop: 28,
    },
    inputLabel: {
        fontFamily: 'Roboto_Medium',
        fontSize: 15,
        lineHeight: 16,
    },
    inputTexts: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        height: 44,
        padding: 8,
    },
    inputPickerText: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(22, 25, 28, 0.3)',
        fontFamily: 'Roboto_Regular',
        fontSize: 15,
    },
    inputPickerContainer: {
        width: '100%',

        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        height: 44,

        paddingLeft: 8,
        paddingRight: 8,

        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(22, 25, 28, 1)',
        fontFamily: 'Roboto_Regular',
        fontSize: 15,
    },

    dateContainer: {
        width: '90%',
        color: '#000',
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    dateBtn: {
        height: 44,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateBtnText: {},

    nextBtn: {
        height: 44,
        backgroundColor: '#3E66FB',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    nextBtnText: {
        color: '#fff',
        fontFamily: 'Roboto_Regular',
        fontSize: 17,
    },
    termsText: {
        color: 'rgba(22, 25, 28, 1)',
        fontFamily: 'Roboto_Regular',
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 25,
    },
    termsTextLink: {
        color: '#3E66FB',
        fontFamily: 'Roboto_Medium',
        fontSize: 13,
        textDecorationLine: 'underline',
        lineHeight: 25,
    },
})
