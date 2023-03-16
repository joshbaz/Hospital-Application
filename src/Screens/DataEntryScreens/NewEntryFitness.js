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
    ActivityIndicator,
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
import { Ionicons } from '@expo/vector-icons'

import { List, Switch, Divider } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'

import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-root-toast'
import {
    createVitalFitness,
    reset,
} from '../../Store/features/vitals/vitalSlice'
import moment from 'moment-timezone'

const listActivity = [
    {
        title: 'Walking',
        icon: <FontAwesome5 name='walking' size={24} color='#616569' />,
    },
    {
        title: 'Running',
        icon: (
            <MaterialCommunityIcons name='run-fast' size={24} color='#616569' />
        ),
    },
    {
        title: 'Treadmill',
        icon: (
            <MaterialCommunityIcons
                name='water-circle'
                size={24}
                color='#616569'
            />
        ),
    },
    {
        title: 'Football',
        icon: <FontAwesome name='soccer-ball-o' size={24} color='#616569' />,
    },
    {
        title: 'Jogging',
        icon: <FontAwesome5 name='running' size={24} color='#616569' />,
    },
]

const NewEntryFitness = ({ route, navigation }) => {
    let dispatch = useDispatch()
    const [date, setDate] = React.useState(new Date())
    const [mode, setMode] = React.useState('date')
    const [activateDate, setActivateDate] = React.useState(false)
    const [showDates, setShowDates] = React.useState('')
    const [showTime, setShowTime] = React.useState('')

    const [activateActivity, setActivateActivity] = React.useState(false)
    const [selectActivity, setSelectActivity] = React.useState('')
    const [chosenActivity, setChosenActivity] = React.useState('')

    const [durationValue, setDurationValue] = React.useState(null)
    const [activateEditValue, setActivateEditValue] = React.useState(false)

    const [isSubmittingp, setIsSubmittingp] = React.useState(false)

    const { isError, isSuccess, message } = useSelector((state) => state.vitals)

    const { vital, vitalTimelineType } = route.params

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
            ':' +
            `${tempDate.getMinutes()}` +
            ' ' +
            `${tempDate.getHours() >= 12 ? 'PM' : 'AM'}`

        if (Platform.OS === 'ios') {
            setShowDates(() => fDate)

            // if (mode === 'time') {
            //     setShowTime(() => fTime)
            // }
        } else {
            if (mode === 'time') {
                setShowTime(() => fTime)
                setActivateDate(() => false)
            } else {
                setShowDates(() => fDate)
                setActivateDate(() => false)
            }
        }
    }

    const showMode = (currentMode) => {
        setMode(() => currentMode)
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
            ':' +
            `${tempDate.getMinutes()}` +
            ' ' +
            `${tempDate.getHours() >= 12 ? 'PM' : 'AM'}`

        if (mode === 'time') {
            setShowTime(() => fTime)
            setActivateDate(() => false)
        } else {
            setShowDates(() => fDate)
            setActivateDate(() => false)
        }
    }

    const iosCancelBtn = () => {
        setActivateDate(() => false)
    }

    const showActivity = () => {
        setActivateActivity(() => true)
    }
    const onChangeActivity = (activityValue) => {
        setSelectActivity(() => activityValue)
    }

    const activityAcceptBtn = () => {
        setChosenActivity(() => selectActivity)
        setActivateActivity(() => false)
    }

    const activityCancelBtn = () => {
        setSelectActivity(() => chosenActivity)
        setActivateActivity(() => false)
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

            setIsSubmittingp(false)
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

            navigation.navigate('Home')

            dispatch(reset())
        }
    }, [isError, isSuccess, message, dispatch])

    const handleSubmit = () => {
        if (
            durationValue === null ||
            durationValue === '' ||
            showTime === '' ||
            vital === '' ||
            vitalTimelineType === '' ||
            showDates === '' ||
            chosenActivity === ''
        ) {
            let toast = Toast.show('Missing  fields', {
                duration: Toast.durations.LONG,
                position: 80,
                backgroundColor: 'red',
            })

            setTimeout(function hideToast() {
                Toast.hide(toast)
            }, 8000)
        } else {
            let momentDate = moment(date)
            let alldetails = {
                vitalTimelineType,
                durationValue,
                chosenActivity,
                currentTime: showTime,
                currentDate: momentDate,
            }

            dispatch(createVitalFitness(alldetails))
            setIsSubmittingp(() => true)
        }
    }
    return (
        <Stack style={styles.container}>
            <StatusBar />

            {/** Title */}
            <HStack
                h={Platform.OS === 'ios' ? 48 : 48}
                style={styles.titleContainer}>
                <Text style={styles.textTitle}>Fitness Activities</Text>
                <Text>({vitalTimelineType})</Text>
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
                        {/** Type of Activity */}
                        <TouchableOpacity onPress={() => showActivity()}>
                            <HStack style={styles.cardContainer}>
                                <HStack spacing={20} alignItems='center'>
                                    <View style={styles.cardIcon}>
                                        <MaterialCommunityIcons
                                            name='heart-circle'
                                            size={26}
                                            color='#3e66fb'
                                        />
                                    </View>
                                    <Stack>
                                        <Text style={styles.cardSubHead}>
                                            Type of Activity
                                        </Text>
                                        <Text style={styles.cardHead}>
                                            {' '}
                                            {chosenActivity !== ''
                                                ? chosenActivity
                                                : '-'}
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

                        {/** duration value */}
                        <HStack style={styles.cardContainer}>
                            <Stack>
                                <Text style={styles.cardSubHead}>Duration</Text>

                                <HStack
                                    justifyContent='center'
                                    alignItems='center'
                                    spacing={12}>
                                    {activateEditValue ? (
                                        <TextInput
                                            inputMode='decimal'
                                            keyboardType='decimal-pad'
                                            style={styles.cardValue}
                                            placeholder='0'
                                            value={durationValue}
                                            onChangeText={(value) => {
                                                setDurationValue(value)
                                            }}
                                        />
                                    ) : (
                                        <Text style={styles.cardValue}>
                                            {durationValue}
                                        </Text>
                                    )}
                                    <Text style={styles.cardValueType}>
                                        /min
                                    </Text>
                                </HStack>
                            </Stack>

                            {activateEditValue ? (
                                <TouchableOpacity
                                    style={styles.cardBtn}
                                    onPress={() => setActivateEditValue(false)}>
                                    <Text style={styles.cardBtnText}>
                                        Close
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={styles.cardBtn}
                                    onPress={() => setActivateEditValue(true)}>
                                    <Text style={styles.cardBtnText}>Edit</Text>
                                </TouchableOpacity>
                            )}
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

                    {isSubmittingp ? (
                        <View style={styles.nextBtn}>
                            <ActivityIndicator size='small' color='white' />
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={handleSubmit}
                            style={styles.nextBtn}>
                            <Text style={styles.nextBtnText}>Continue</Text>
                        </TouchableOpacity>
                    )}
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

            {/** modal for activities */}
            {activateActivity && (
                <Modal
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        marginTop: 0,
                    }}
                    animationType='slide'
                    transparent={true}
                    visible={activateActivity}>
                    <View
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            paddingTop: '30%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}>
                        <Stack
                            spacing={'30%'}
                            w='100%'
                            style={{
                                backgroundColor: '#f9fafa',

                                flex: 1,
                                borderRadius: 10,
                            }}>
                            <Stack
                                style={styles.activityContainer}
                                spacing={24}>
                                {/** list head */}
                                <HStack
                                    style={styles.activityHeadContainer}
                                    alignItems='center'
                                    justifyContent='space-between'>
                                    <TouchableOpacity
                                        onPress={() => activityCancelBtn()}>
                                        <Text
                                            style={styles.activityCloseBtnText}>
                                            Close
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={styles.activityHeadText}>
                                        Type of Activity
                                    </Text>
                                    <Box />
                                </HStack>
                                {/** lists */}
                                <Stack
                                    style={{
                                        paddingLeft: 16,
                                        paddingRight: 16,
                                    }}>
                                    {listActivity.map((data, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() =>
                                                    onChangeActivity(data.title)
                                                }>
                                                <HStack
                                                    style={
                                                        styles.activityListContainer
                                                    }
                                                    justifyContent='space-between'
                                                    alignItems='center'>
                                                    <HStack spacing={16}>
                                                        <View
                                                            style={
                                                                styles.activityListIcon
                                                            }>
                                                            {data.icon}
                                                        </View>

                                                        <Text
                                                            style={
                                                                styles.activityListText
                                                            }>
                                                            {data.title}
                                                        </Text>
                                                    </HStack>
                                                    <Stack>
                                                        {selectActivity !==
                                                        data.title ? (
                                                            <Box
                                                                style={
                                                                    styles.activityUnselected
                                                                }
                                                            />
                                                        ) : (
                                                            <Ionicons
                                                                name='md-checkmark-sharp'
                                                                size={24}
                                                                color='#7c97fb'
                                                            />
                                                        )}
                                                    </Stack>
                                                </HStack>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </Stack>
                            </Stack>

                            {/** buttons */}
                            <HStack
                                justifyContent='space-between'
                                style={{
                                    paddingLeft: 16,
                                    paddingRight: 16,
                                }}>
                                <TouchableOpacity
                                    onPress={() => activityCancelBtn()}
                                    style={styles.activityCancelBtn}>
                                    <Text style={styles.activityCancelBtnText}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => activityAcceptBtn()}
                                    style={styles.activityAcceptBtn}>
                                    <Text style={styles.activityAcceptBtnText}>
                                        OK
                                    </Text>
                                </TouchableOpacity>
                            </HStack>
                        </Stack>
                    </View>
                </Modal>
            )}
        </Stack>
    )
}

export default NewEntryFitness

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
    activityCancelBtn: {
        width: 123,
        height: 44,
        backgroundColor: '#F2F2F7',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    activityCancelBtnText: {
        color: '#000000',
        fontFamily: 'Roboto_Regular',
        fontSize: 17,
    },
    activityAcceptBtn: {
        width: 123,
        height: 44,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    activityAcceptBtnText: {
        color: '#fff',
        fontFamily: 'Roboto_Regular',
        fontSize: 17,
    },
    activityHeadContainer: {
        height: 44,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#edeeee',
        paddingLeft: 16,
        paddingRight: 16,
    },
    activityCloseBtnText: {
        color: '#6ab1fc',
        fontFamily: 'Roboto_Regular',
        fontSize: 17,
    },
    activityHeadText: {
        color: '#000000',
        fontFamily: 'Roboto_Medium',
        fontSize: 17,
    },
    activityListContainer: {
        height: 44,
    },
    activityListIcon: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityListText: {
        color: '#16191C',
        fontFamily: 'Roboto_Regular',
        fontSize: 16,
    },
    activityUnselected: {
        width: 29,
        height: 29,
        borderRadius: 20,
        backgroundColor: '#F2F2F7',
    },
})
