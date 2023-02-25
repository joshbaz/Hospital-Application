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
    ScrollView,
    ActivityIndicator,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { Text, Stack, Box, HStack } from '@react-native-material/core'
import { StatusBar } from 'expo-status-bar'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-root-toast'
import {
    UpdateAccount,
    GetAllDetails,
    reset,
} from '../../Store/features/auth/authSlice'
import moment from 'moment-timezone'
import { Picker } from '@react-native-picker/picker'
import AsyncStorage from '@react-native-async-storage/async-storage'

const EditAccount = ({ navigation }) => {
    let dispatch = useDispatch()
    const [date, setDate] = React.useState(new Date())
    const [mode, setMode] = React.useState('date')
    const [activateDate, setActivateDate] = React.useState(false)
    const [showDates, setShowDates] = React.useState('')
    const [showWeight, setShowWeight] = React.useState('')
    const [mainWeight, setMainWeight] = React.useState('80')
    const [decimalWeight, setDecimalWeight] = React.useState('6')
    const [activateWeight, setActivateWeight] = React.useState(false)

    /** height */
    const [showHeight, setShowHeight] = React.useState('')
    const [mainHeight, setMainHeight] = React.useState("5'")
    const [decimalHeight, setDecimalHeight] = React.useState("6''")
    const [activateHeight, setActivateHeight] = React.useState(false)

    /** patient Name */
    const [fullname, setFullName] = React.useState('')
    const [patientsId, setPatientsId] = React.useState('')

    const [isSubmittingp, setIsSubmittingp] = React.useState(false)

    const { user, isError, isSuccess, message, userdetails } = useSelector(
        (state) => state.auth
    )

    React.useEffect(() => {
        dispatch(GetAllDetails())
    }, [dispatch])

    React.useEffect(() => {
        setFullName(() => userdetails.fullname)
        setShowDates(() => userdetails.birthday)
        setShowWeight(() => userdetails.weight)
        setShowHeight(() => userdetails.height)
    }, [userdetails])

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

    const onChangeMainWeight = (item) => {
        setMainWeight(() => item)
    }

    const onChangeDecimalWeight = (item) => {
        setDecimalWeight(() => item)
    }

    const AcceptWeightBtn = () => {
        let weightString = `${mainWeight + '.' + decimalWeight}`
        setShowWeight(() => weightString)
        setActivateWeight(() => false)
    }

    const CancelWeightBtn = () => {
        setActivateWeight(() => false)
    }

    /** height */
    const onChangeMainHeight = (item) => {
        setMainHeight(() => item)
    }

    const onChangeDecimalHeight = (item) => {
        setDecimalHeight(() => item)
    }

    const AcceptHeightBtn = () => {
        let heightString = `${mainHeight + ' ' + decimalHeight}`
        setShowHeight(() => heightString)
        setActivateHeight(() => false)
    }

    const CancelHeightBtn = () => {
        setActivateHeight(() => false)
    }

    React.useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('@storage_pat')
                if (value !== null) {
                    // value previously stored
                    setPatientsId(() => value)
                }
            } catch (e) {
                // error reading value
            }
        }

        getData()
    }, [])

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

            navigation.navigate('MyAccount')

            dispatch(reset())
        }
    }, [isError, isSuccess, message, dispatch])

    const handleSubmit = () => {
        if (
            fullname === '' ||
            patientsId === '' ||
            showHeight === '' ||
            showWeight === '' ||
            showDates === ''
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
            let alldetails = {
                fullname,
                patientId: patientsId,
                height: showHeight,
                weight: showWeight,
                birthday: showDates,
            }

            dispatch(UpdateAccount(alldetails))
            setIsSubmittingp(() => true)
        }
    }

    return (
        <Stack style={styles.container}>
            <StatusBar />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Stack style={styles.container} spacing={36}>
                    {/** header */}

                    <HStack
                        h={Platform.OS === 'ios' ? '10%' : 48}
                        style={styles.titleContainer}>
                        <Text style={styles.textTitle}> Edit Details</Text>
                    </HStack>

                    <Stack style={{ height: '100%' }}>
                        <ScrollView contentContainerStyle={{ flex: 1 }}>
                            {/** Inputs */}
                            <Stack
                                w='100%'
                                h='100%'
                                alignItems='center'
                                style={{
                                    backgroundColor: '#fcfcfd',
                                    paddingBottom: 100,
                                }}>
                                <Stack w='80%' h='100%' spacing={'10%'}>
                                    <Stack spacing={8}>
                                        <Text style={styles.inputLabel}>
                                            What is your Patient ID?
                                        </Text>
                                        <TextInput
                                            style={styles.inputTexts}
                                            value={patientsId}
                                            placeholder='Enter your ID number here...'
                                        />
                                    </Stack>
                                    <Stack spacing={8}>
                                        <Text style={styles.inputLabel}>
                                            What is your Full name?
                                        </Text>
                                        <TextInput
                                            style={styles.inputTexts}
                                            value={fullname}
                                            placeholder='Enter your name here'
                                            onChangeText={(value) => {
                                                setFullName(value)
                                            }}
                                        />
                                    </Stack>
                                    <Stack spacing={8}>
                                        <Text style={styles.inputLabel}>
                                            Birthday
                                        </Text>

                                        <TouchableWithoutFeedback
                                            onPress={() => showMode('date')}>
                                            <View
                                                style={
                                                    styles.inputPickerContainer
                                                }>
                                                {showDates === '' ? (
                                                    <Text
                                                        style={
                                                            styles.inputPickerText
                                                        }
                                                        placeholder='Please select date'
                                                        inputMode='date'>
                                                        Please select date
                                                    </Text>
                                                ) : (
                                                    <Text
                                                        style={
                                                            styles.inputPickerText
                                                        }
                                                        placeholder='Please select date'
                                                        inputMode='date'>
                                                        {showDates}
                                                    </Text>
                                                )}
                                            </View>
                                        </TouchableWithoutFeedback>

                                        <Modal
                                            style={{
                                                backgroundColor:
                                                    'rgba(0,0,0,0.1)',
                                                marginTop: 0,
                                            }}
                                            animationType='slide'
                                            transparent={true}
                                            visible={activateDate}>
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        'rgba(0,0,0,0.5)',

                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flex: 1,
                                                }}>
                                                <Stack spacing={30}>
                                                    <View
                                                        style={
                                                            styles.dateContainer
                                                        }>
                                                        <DateTimePicker
                                                            textColor='#000'
                                                            testID='dateTimePicker'
                                                            value={date}
                                                            mode={mode}
                                                            display={
                                                                Platform.OS ===
                                                                'ios'
                                                                    ? 'spinner'
                                                                    : 'default'
                                                            }
                                                            onChange={onChange}
                                                            positiveButtonLabel='OK'
                                                        />
                                                    </View>

                                                    {Platform.OS === 'ios' && (
                                                        <TouchableOpacity
                                                            onPress={
                                                                iosAcceptBtn
                                                            }
                                                            style={
                                                                styles.dateBtn
                                                            }>
                                                            <Text
                                                                style={
                                                                    styles.dateBtnText
                                                                }>
                                                                Continue
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )}

                                                    {Platform.OS === 'ios' && (
                                                        <TouchableOpacity
                                                            onPress={
                                                                iosCancelBtn
                                                            }
                                                            style={
                                                                styles.dateBtn
                                                            }>
                                                            <Text
                                                                style={
                                                                    styles.dateBtnText
                                                                }>
                                                                Cancel
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )}
                                                </Stack>
                                            </View>
                                        </Modal>
                                    </Stack>
                                    {/** weight */}
                                    <Stack spacing={8}>
                                        <Text style={styles.inputLabel}>
                                            Weight
                                        </Text>

                                        <TouchableWithoutFeedback
                                            onPress={() =>
                                                setActivateWeight(() => true)
                                            }>
                                            <View
                                                style={
                                                    styles.inputPickerContainer
                                                }>
                                                {showWeight === '' ? (
                                                    <Text
                                                        style={
                                                            styles.inputPickerText
                                                        }
                                                        placeholder='Please select your weight'
                                                        inputMode='date'>
                                                        Please select your
                                                        weight
                                                    </Text>
                                                ) : (
                                                    <Text
                                                        style={
                                                            styles.inputPickerText
                                                        }
                                                        placeholder='Please select your weight'
                                                        inputMode='date'>
                                                        {showWeight}
                                                    </Text>
                                                )}
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <Modal
                                            style={{
                                                backgroundColor:
                                                    'rgba(0,0,0,0.1)',
                                                marginTop: 0,
                                            }}
                                            animationType='slide'
                                            transparent={true}
                                            visible={activateWeight}>
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        'rgba(0,0,0,0.5)',

                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flex: 1,
                                                }}>
                                                <Stack spacing={30}>
                                                    <Stack
                                                        w='40%'
                                                        direction='row'
                                                        style={
                                                            styles.weightContainer
                                                        }>
                                                        <Picker
                                                            selectedValue={
                                                                mainWeight
                                                            }
                                                            onValueChange={(
                                                                item
                                                            ) =>
                                                                onChangeMainWeight(
                                                                    item
                                                                )
                                                            }
                                                            style={{
                                                                width: '25%',
                                                                backgroundColor:
                                                                    'rgba(0,0,0,0.0)',
                                                            }}>
                                                            {[
                                                                ...Array(150),
                                                            ].map(
                                                                (
                                                                    data,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <Picker.Item
                                                                            key={
                                                                                index
                                                                            }
                                                                            label={`${
                                                                                index +
                                                                                1
                                                                            }`}
                                                                            value={`${
                                                                                index +
                                                                                1
                                                                            }`}
                                                                        />
                                                                    )
                                                                }
                                                            )}
                                                        </Picker>

                                                        <Stack
                                                            style={{
                                                                width: '10%',
                                                                alignItems:
                                                                    'center',
                                                                justifyContent:
                                                                    'center',
                                                                paddingBottom: 16,
                                                            }}>
                                                            <Text
                                                                style={{
                                                                    fontSize: 50,
                                                                }}>
                                                                .
                                                            </Text>
                                                        </Stack>

                                                        <Picker
                                                            selectedValue={
                                                                decimalWeight
                                                            }
                                                            onValueChange={(
                                                                item
                                                            ) =>
                                                                onChangeDecimalWeight(
                                                                    item
                                                                )
                                                            }
                                                            value='9'
                                                            style={{
                                                                height: 50,
                                                                width: '25%',
                                                            }}>
                                                            {[...Array(10)].map(
                                                                (
                                                                    data,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <Picker.Item
                                                                            key={
                                                                                index
                                                                            }
                                                                            label={`${index}`}
                                                                            value={`${index}`}
                                                                        />
                                                                    )
                                                                }
                                                            )}
                                                        </Picker>

                                                        <Picker
                                                            style={{
                                                                height: 50,
                                                                width: '25%',
                                                                padding: 0,
                                                            }}>
                                                            <Picker.Item
                                                                color='black'
                                                                label={'kg'}
                                                                value={'kg'}
                                                            />
                                                        </Picker>
                                                    </Stack>

                                                    <TouchableOpacity
                                                        onPress={
                                                            AcceptWeightBtn
                                                        }
                                                        style={styles.dateBtn}>
                                                        <Text
                                                            style={
                                                                styles.dateBtnText
                                                            }>
                                                            Continue
                                                        </Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        onPress={
                                                            CancelWeightBtn
                                                        }
                                                        style={styles.dateBtn}>
                                                        <Text
                                                            style={
                                                                styles.dateBtnText
                                                            }>
                                                            Cancel
                                                        </Text>
                                                    </TouchableOpacity>
                                                </Stack>
                                            </View>
                                        </Modal>
                                    </Stack>

                                    {/** height */}
                                    <Stack spacing={8}>
                                        <Text style={styles.inputLabel}>
                                            Height
                                        </Text>

                                        <TouchableWithoutFeedback
                                            onPress={() =>
                                                setActivateHeight(() => true)
                                            }>
                                            <View
                                                style={
                                                    styles.inputPickerContainer
                                                }>
                                                {showHeight === '' ? (
                                                    <Text
                                                        style={
                                                            styles.inputPickerText
                                                        }
                                                        placeholder='Please select your height'
                                                        inputMode='date'>
                                                        Please select your
                                                        height
                                                    </Text>
                                                ) : (
                                                    <Text
                                                        style={
                                                            styles.inputPickerText
                                                        }
                                                        placeholder='Please select your height'
                                                        inputMode='date'>
                                                        {showHeight}
                                                    </Text>
                                                )}
                                            </View>
                                        </TouchableWithoutFeedback>

                                        <Modal
                                            style={{
                                                backgroundColor:
                                                    'rgba(0,0,0,0.1)',
                                                marginTop: 0,
                                            }}
                                            animationType='slide'
                                            transparent={true}
                                            visible={activateHeight}>
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        'rgba(0,0,0,0.5)',

                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flex: 1,
                                                }}>
                                                <Stack spacing={30}>
                                                    <Stack
                                                        w='40%'
                                                        direction='row'
                                                        style={
                                                            styles.weightContainer
                                                        }>
                                                        <Picker
                                                            selectedValue={
                                                                mainHeight
                                                            }
                                                            onValueChange={(
                                                                item
                                                            ) =>
                                                                onChangeMainHeight(
                                                                    item
                                                                )
                                                            }
                                                            style={{
                                                                width: '33%',
                                                                backgroundColor:
                                                                    'rgba(0,0,0,0.0)',
                                                            }}>
                                                            {[...Array(7)].map(
                                                                (
                                                                    data,
                                                                    index
                                                                ) => {
                                                                    if (
                                                                        index +
                                                                            1 ===
                                                                            1 ||
                                                                        index +
                                                                            1 ===
                                                                            2 ||
                                                                        index +
                                                                            1 ===
                                                                            3
                                                                    ) {
                                                                        return null
                                                                    } else {
                                                                        return (
                                                                            <Picker.Item
                                                                                key={
                                                                                    index
                                                                                }
                                                                                label={`${
                                                                                    index +
                                                                                    1
                                                                                }'`}
                                                                                value={`${
                                                                                    index +
                                                                                    1
                                                                                }'`}
                                                                            />
                                                                        )
                                                                    }
                                                                }
                                                            )}
                                                        </Picker>

                                                        <Stack
                                                            style={{
                                                                width: '10%',
                                                                alignItems:
                                                                    'center',
                                                                justifyContent:
                                                                    'center',
                                                                paddingBottom: 16,
                                                            }}>
                                                            <Text
                                                                style={{
                                                                    fontSize: 50,
                                                                }}></Text>
                                                        </Stack>

                                                        <Picker
                                                            selectedValue={
                                                                decimalHeight
                                                            }
                                                            onValueChange={(
                                                                item
                                                            ) =>
                                                                onChangeDecimalHeight(
                                                                    item
                                                                )
                                                            }
                                                            value='9'
                                                            style={{
                                                                height: 50,
                                                                width: '33%',
                                                            }}>
                                                            {[...Array(8)].map(
                                                                (
                                                                    data,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <Picker.Item
                                                                            key={
                                                                                index
                                                                            }
                                                                            label={`${index}''`}
                                                                            value={`${index}''`}
                                                                        />
                                                                    )
                                                                }
                                                            )}
                                                        </Picker>
                                                    </Stack>

                                                    <TouchableOpacity
                                                        onPress={
                                                            AcceptHeightBtn
                                                        }
                                                        style={styles.dateBtn}>
                                                        <Text
                                                            style={
                                                                styles.dateBtnText
                                                            }>
                                                            Continue
                                                        </Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        onPress={
                                                            CancelHeightBtn
                                                        }
                                                        style={styles.dateBtn}>
                                                        <Text
                                                            style={
                                                                styles.dateBtnText
                                                            }>
                                                            Cancel
                                                        </Text>
                                                    </TouchableOpacity>
                                                </Stack>
                                            </View>
                                        </Modal>
                                    </Stack>

                                    {/** button */}

                                    <Stack spacing={10}>
                                        {isSubmittingp ? (
                                            <View style={styles.nextBtn}>
                                                <ActivityIndicator
                                                    size='small'
                                                    color='white'
                                                />
                                            </View>
                                        ) : (
                                            <TouchableOpacity
                                                onPress={handleSubmit}
                                                style={styles.nextBtn}>
                                                <Text
                                                    style={styles.nextBtnText}>
                                                    Save
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    </Stack>
                                </Stack>
                            </Stack>
                        </ScrollView>
                    </Stack>
                </Stack>
            </TouchableWithoutFeedback>
        </Stack>
    )
}

export default EditAccount

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#fcfcfd',
    },
    titleContainer: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 0,
        paddingBottom: 13,
        backgroundColor: '#ffffff',
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
    weightContainer: {
        width: '90%',
        color: '#000',
        backgroundColor: '#fff',
        borderRadius: 20,
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
