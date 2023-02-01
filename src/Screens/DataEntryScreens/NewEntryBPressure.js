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
    Dimensions,
    processColor,
    ScrollView,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { Text, Stack, Box, HStack } from '@react-native-material/core'
import { StatusBar } from 'expo-status-bar'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { Zocial } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'

import { List, Switch, Divider } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'

const NewEntryBPressure = () => {
    const [date, setDate] = React.useState(new Date())
    const [mode, setMode] = React.useState('date')
    const [activateDate, setActivateDate] = React.useState(false)
    const [showDates, setShowDates] = React.useState('')
    const [showTime, setShowTime] = React.useState('')

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

        let fTime =
            `${tempDate.getHours()}` +
            '.' +
            `${tempDate.getMinutes()}` +
            ' ' +
            `${tempDate.getHours() >= 12 ? 'PM' : 'AM'}`

        console.log('fDate', fDate, 'ftime', fTime)
        if (Platform.OS === 'ios') {
            setShowDates(() => fDate)

            // if (mode === 'time') {
            //     setShowTime(() => fTime)
            // }
        } else {
            setShowDates(() => fDate)
            if (mode === 'time') {
                setShowTime(() => fTime)
            } else {
            }
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
        let fTime =
            `${tempDate.getHours()}` +
            '.' +
            `${tempDate.getMinutes()}` +
            ' ' +
            `${tempDate.getHours() >= 12 ? 'PM' : 'AM'}`
        setShowDates(() => fDate)
        if (mode === 'time') {
            setShowTime(() => fTime)
        } else {
        }
        setActivateDate(() => false)
    }

    const iosCancelBtn = () => {
        setActivateDate(() => false)
    }
    return (
        <Stack style={styles.container}>
            <StatusBar />

            {/** Title */}
            <HStack
                h={Platform.OS === 'ios' ? 48 : 48}
                style={styles.titleContainer}>
                <Text style={styles.textTitle}>Blood Pressure</Text>
            </HStack>

            {/** rest of the content */}
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    width: '100%',
                    marginTop: 0,
                }}>
                <Stack
                    spacing={'10%'}
                    h={Platform.OS === 'ios' ? '100%' : '100%'}
                    style={{
                        paddingBottom: Platform.OS === 'ios' ? 200 : 200,
                        backgroundColor: '#f9fafa',
                        paddingLeft: 15,
                        paddingRight: 15,
                        paddingTop: 20,
                    }}>
                    <Stack spacing={12}>
                        {/** sys value */}
                        <HStack style={styles.cardContainer}>
                            <Stack>
                                <Text style={styles.cardSubHead}>SYS</Text>

                                <HStack
                                    justifyContent='center'
                                    alignItems='center'
                                    spacing={12}>
                                    <Text style={styles.cardValue}>0</Text>
                                    <Text style={styles.cardValueType}>
                                        mmHg
                                    </Text>
                                </HStack>
                            </Stack>

                            <TouchableOpacity style={styles.cardBtn}>
                                <Text style={styles.cardBtnText}>Edit</Text>
                            </TouchableOpacity>
                        </HStack>

                        {/** DIA */}
                        <HStack style={styles.cardContainer}>
                            <Stack>
                                <Text style={styles.cardSubHead}>DIA</Text>

                                <HStack
                                    justifyContent='center'
                                    alignItems='center'
                                    spacing={12}>
                                    <Text style={styles.cardValue}>0</Text>
                                    <Text style={styles.cardValueType}>
                                        mmHg
                                    </Text>
                                </HStack>
                            </Stack>

                            <TouchableOpacity style={styles.cardBtn}>
                                <Text style={styles.cardBtnText}>Edit</Text>
                            </TouchableOpacity>
                        </HStack>

                        {/** pulse value */}
                        <HStack style={styles.cardContainer}>
                            <Stack>
                                <Text style={styles.cardSubHead}>PULSE</Text>

                                <HStack
                                    justifyContent='center'
                                    alignItems='center'
                                    spacing={12}>
                                    <Text style={styles.cardValue}>0</Text>
                                    <Text style={styles.cardValueType}>
                                        /min
                                    </Text>
                                </HStack>
                            </Stack>

                            <TouchableOpacity style={styles.cardBtn}>
                                <Text style={styles.cardBtnText}>Edit</Text>
                            </TouchableOpacity>
                        </HStack>

                        {/** date */}
                        <TouchableOpacity onPress={() => showMode('date')}>
                            <HStack style={styles.cardContainer}>
                                <HStack spacing={20} alignItems='center'>
                                    <View style={styles.cardIcon}>
                                        <MaterialCommunityIcons
                                            name='calendar-month'
                                            size={26}
                                            color='#3e66fb'
                                        />
                                    </View>
                                    <Stack>
                                        <Text style={styles.cardSubHead}>
                                            Date
                                        </Text>
                                        <Text style={styles.cardHead}>
                                            {showDates !== '' ? showDates : '-'}
                                        </Text>
                                    </Stack>
                                </HStack>

                                <Stack>
                                    <MaterialIcons
                                        name='keyboard-arrow-down'
                                        size={40}
                                        color='#9c9fa1'
                                    />
                                </Stack>
                            </HStack>
                        </TouchableOpacity>

                        {/** time */}
                        <TouchableOpacity onPress={() => showMode('time')}>
                            <HStack style={styles.cardContainer}>
                                <HStack spacing={20} alignItems='center'>
                                    <View style={styles.cardIcon}>
                                        <MaterialCommunityIcons
                                            name='clock-time-nine-outline'
                                            size={26}
                                            color='#3e66fb'
                                        />
                                    </View>
                                    <Stack>
                                        <Text style={styles.cardSubHead}>
                                            Time
                                        </Text>
                                        <Text style={styles.cardHead}>
                                            {' '}
                                            {showTime !== '' ? showTime : '-'}
                                        </Text>
                                    </Stack>
                                </HStack>

                                <Stack>
                                    <MaterialIcons
                                        name='keyboard-arrow-down'
                                        size={40}
                                        color='#9c9fa1'
                                    />
                                </Stack>
                            </HStack>
                        </TouchableOpacity>
                    </Stack>

                    <TouchableOpacity style={styles.nextBtn}>
                        <Text style={styles.nextBtnText}>Continue</Text>
                    </TouchableOpacity>
                </Stack>
            </ScrollView>

            {/** modal for time and date */}
            {activateDate && (
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
                                    <Text style={styles.dateBtnText}>
                                        Continue
                                    </Text>
                                </TouchableOpacity>
                            )}

                            {Platform.OS === 'ios' && (
                                <TouchableOpacity
                                    onPress={iosCancelBtn}
                                    style={styles.dateBtn}>
                                    <Text style={styles.dateBtnText}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </Stack>
                    </View>
                </Modal>
            )}
        </Stack>
    )
}

export default NewEntryBPressure

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    titleContainer: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 0,
        paddingBottom: 13,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f3f4',
    },
    textTitle: {
        fontFamily: 'Roboto_Bold',
        color: '#16191C',
        fontSize: 25,
        lineHeight: 41,
        letterSpacing: 0.37,
    },
    arrowRight: {
        height: 40,
        width: 40,
        borderWidth: 1.8,
        borderColor: '#3E66FB',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardContainer: {
        borderWidth: 1,
        borderColor: 'rgba(22, 25, 28, 0.1)',
        height: 110,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 14,
        paddingLeft: 19,
        paddingRight: 35,
    },
    cardIcon: {
        height: 47,
        backgroundColor: '#ecf0ff',
        width: 47,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    cardSubHead: {
        fontFamily: 'Roboto_Regular',
        color: '#cfd0d1',
        fontSize: 18,
        lineHeight: 24,
        letterSpacing: 0.37,
    },
    cardValue: {
        fontFamily: 'Roboto_Regular',
        color: '#16191C',
        fontSize: 40,

        letterSpacing: 0.37,
    },
    cardValueType: {
        fontFamily: 'Roboto_Medium',
        color: '#868a8d',
        fontSize: 15,

        letterSpacing: 0.37,
    },
    cardHead: {
        fontFamily: 'Roboto_Medium',
        color: '#16191C',
        fontSize: 25,
        lineHeight: 30,
        letterSpacing: 0.37,
    },
    cardBtn: {
        height: 30,
        backgroundColor: '#3E66FB',
        width: 54,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
    },
    cardBtnText: {
        fontFamily: 'Roboto_Medium',
        color: '#fff',
        fontSize: 13,
        lineHeight: 30,
        letterSpacing: 0.37,
    },
    dateContainer: {
        width: '90%',
        color: '#000',
        backgroundColor: '#fff',
        borderRadius: 30,
    },
    dateBtn: {
        height: 44,
        backgroundColor: '#fff',
        borderRadius: 30,
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
})
