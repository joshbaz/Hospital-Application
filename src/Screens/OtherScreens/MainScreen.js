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
import { MaterialIcons } from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Moments from 'moment-timezone'

import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-root-toast'
import {
    reset,
    MainRecentVitalReading,
} from '../../Store/features/vitals/vitalSlice'

const MainScreen = ({ navigation }) => {
    let dispatch = useDispatch()
    const [BPressureVital, setBPressureVital] = React.useState('0/0')
    const [BGlucoseVital, setBGlucoseVital] = React.useState('0')
    const [pName, setPName] = React.useState('')
    const day = Moments().tz('Africa/Nairobi').format('Do')
    const Month = Moments().tz('Africa/Nairobi').format('MMMM')
    const { isError, isSuccess, message, mainrecents } = useSelector(
        (state) => state.vitals
    )
    React.useEffect(() => {
        dispatch(MainRecentVitalReading())
    }, [dispatch])

    const { user, isLoggedIn, userdetails } = useSelector((state) => state.auth)

    React.useEffect(() => {
        setBGlucoseVital(() => mainrecents.BGlucoseVital)
        setBPressureVital(() => mainrecents.BPressureVital)
    }, [message, mainrecents])
    React.useEffect(() => {
        if (isLoggedIn) {
            if (user.onBoardInfo) {
                // navigation.navigate('Home')
            } else {
                navigation.navigate('OnboardingScreen')
            }
        }
    }, [user, isLoggedIn])

    React.useEffect(() => {
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@user')
                if (jsonValue !== null) {
                    let values = JSON.parse(jsonValue)
                    let getFirstName = values.fullname.split(' ')[0]
                    //console.log('vv', values, getFirstName)

                    setPName(() => getFirstName)
                }
                return
            } catch (e) {
                // error reading value
            }
        }

        getData()
    }, [userdetails])

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

            dispatch(reset())
        }
    }, [isError, isSuccess, message, dispatch])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar />
            <Stack style={styles.container}>
                {/** Date & Welcome */}
                <Stack h='15%' style={styles.welcomeContainer}>
                    <Stack
                        direction='row'
                        alignItems='center'
                        justifyContent='space-between'>
                        <Text style={styles.textDate}>
                            {day} {Month}
                        </Text>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('MyAccount')}>
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing={5}>
                                <MaterialIcons
                                    name='settings'
                                    size={20}
                                    color='#8E8E93'
                                />
                                <Text style={styles.textDate}>Settings</Text>
                            </Stack>
                        </TouchableOpacity>
                    </Stack>

                    <Text style={styles.textWelcome}>Hi, {pName}</Text>
                </Stack>
                {/** rest of the content */}
                <Stack h='90%' style={styles.contentContainer} spacing={'15%'}>
                    {/** health stats */}
                    <Stack spacing={15}>
                        <HStack justify='space-between' items='center'>
                            <Text style={styles.linkHead}>Today</Text>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('HealthVitals')
                                }>
                                <HStack items='center'>
                                    <Text style={styles.linkText}>See All</Text>
                                    <MaterialIcons
                                        name='keyboard-arrow-right'
                                        size={20}
                                        color='#3E66FB'
                                    />
                                </HStack>
                            </TouchableOpacity>
                        </HStack>

                        <HStack spacing={10} justifyContent='space-between'>
                            <Stack style={styles.statsContainer}>
                                <Box
                                    style={[
                                        styles.statsIcon,
                                        { backgroundColor: '#FED8D9' },
                                    ]}>
                                    <Fontisto
                                        name='blood-drop'
                                        size={24}
                                        color='#EE6B63'
                                    />
                                </Box>

                                <Stack alignItems='flex-start' spacing={2}>
                                    <Text style={styles.statsNum}>
                                        {BGlucoseVital}
                                    </Text>{' '}
                                    <Text style={styles.statsDesc}>mg/dl</Text>
                                </Stack>
                                <Text style={styles.statsCardTitle}>
                                    Blood glucose
                                </Text>
                            </Stack>
                            <Stack style={styles.statsContainer}>
                                <Box
                                    style={[
                                        styles.statsIcon,
                                        { backgroundColor: '#E0E8FC' },
                                    ]}>
                                    <MaterialCommunityIcons
                                        name='heart-pulse'
                                        size={24}
                                        color='#3E66FB'
                                    />
                                </Box>

                                <Stack alignItems='flex-start' spacing={2}>
                                    <Text style={styles.statsNum}>
                                        {BPressureVital}
                                    </Text>{' '}
                                    <Text style={styles.statsDesc}>mm/gh</Text>
                                </Stack>
                                <Text style={styles.statsCardTitle}>
                                    Blood pressure
                                </Text>
                            </Stack>
                        </HStack>
                    </Stack>

                    {/** Measure signs */}
                    <Stack spacing={15}>
                        <HStack justify='space-between' items='center'>
                            <Text style={styles.linkHead}>
                                Measure vital signs
                            </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('MainLogTime')
                                }>
                                <HStack items='center'>
                                    <Text style={styles.linkText}>See All</Text>
                                    <MaterialIcons
                                        name='keyboard-arrow-right'
                                        size={20}
                                        color='#3E66FB'
                                    />
                                </HStack>
                            </TouchableOpacity>
                        </HStack>

                        {/** measurment links */}
                        <Stack spacing={12}>
                            <HStack style={styles.measureContainer}>
                                <Box
                                    style={[
                                        styles.statsIcon,
                                        { backgroundColor: '#FED8D9' },
                                    ]}>
                                    <Fontisto
                                        name='blood-drop'
                                        size={24}
                                        color='#EE6B63'
                                    />
                                </Box>

                                <Text style={styles.measureText}>
                                    Blood Glucose
                                </Text>

                                <TouchableOpacity
                                    style={styles.measureBtn}
                                    onPress={() =>
                                        navigation.navigate('LogTime', {
                                            vital: 'Blood Glucose',
                                        })
                                    }>
                                    <Text style={styles.measureBtnText}>
                                        Measure
                                    </Text>
                                </TouchableOpacity>
                            </HStack>
                            <HStack style={styles.measureContainer}>
                                <Box
                                    style={[
                                        styles.statsIcon,
                                        { backgroundColor: '#FED8D9' },
                                    ]}>
                                    <FontAwesome5
                                        name='dumbbell'
                                        size={24}
                                        color='#ff9a00'
                                    />
                                </Box>

                                <Text style={styles.measureText}>
                                    Fitness Activites
                                </Text>

                                <TouchableOpacity
                                    style={styles.measureBtn}
                                    onPress={() =>
                                        navigation.navigate('LogTime', {
                                            vital: 'Fitness Activities',
                                        })
                                    }>
                                    <Text style={styles.measureBtnText}>
                                        Measure
                                    </Text>
                                </TouchableOpacity>
                            </HStack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </SafeAreaView>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    welcomeContainer: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        justifyContent: 'center',
    },
    textDate: {
        fontFamily: 'Roboto_Regular',
        color: '#8E8E93',
        fontSize: 14,
        lineHeight: 24,
    },
    textWelcome: {
        fontFamily: 'Roboto_Bold',
        color: '#16191C',
        fontSize: 25,
        lineHeight: 41,
        letterSpacing: 0.37,
    },
    contentContainer: {
        backgroundColor: '#f5f5f5',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
    },
    linkHead: {
        fontFamily: 'Roboto_Medium',
        fontSize: 20,
        color: '#000',
        lineHeight: 28,
    },
    linkText: {
        fontFamily: 'Roboto_Regular',
        fontSize: 16,
        color: '#3E66FB',
        lineHeight: 28,
    },
    statsContainer: {
        height: 210,
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 14,

        justifyContent: 'space-between',
        paddingTop: '9%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '7%',
    },
    statsIcon: {
        height: 47,
        width: 47,

        borderRadius: 27,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statsNum: {
        color: '#16191C',
        fontFamily: 'Roboto_Medium',
        fontSize: 38,
    },
    statsDesc: { color: '#8E8E93', fontFamily: 'Roboto_Medium', fontSize: 17 },
    statsCardTitle: {
        color: '#3E66FB',
        fontFamily: 'Roboto_Medium',
        fontSize: 17,
    },
    measureContainer: {
        height: 90,
        backgroundColor: '#fff',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 18,
        paddingRight: 18,
    },
    measureText: {
        fontFamily: 'Roboto_Medium',
        fontSize: 17,
        color: '#16191C',
    },
    measureBtn: {
        backgroundColor: '#3E66FB',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 24,
    },
    measureBtnText: {
        fontFamily: 'Roboto_Medium',
        fontSize: 13,
        color: '#fff',
    },
})
