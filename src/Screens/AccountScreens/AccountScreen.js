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

import { List, Switch, Divider } from 'react-native-paper'

import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-root-toast'
import {
    GetAllDetails,
    UpdatePasskey,
    Logout,
    reset,
} from '../../Store/features/auth/authSlice'
import moment from 'moment-timezone'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Ionicons } from '@expo/vector-icons'
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { NativeModules } from 'react-native'
import { useEffect } from 'react'
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
})
const AccountScreen = ({ navigation }) => {
    const [notification, setNotification] = React.useState(false)
    const notificationListener = React.useRef()

    const responseListener = React.useRef()

    React.useEffect(() => {
        notificationListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (notification) => {
                    setNotification(notification)
                }
            )
        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {}
            )

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            )

            Notifications.removeNotificationSubscription(
                responseListener.current
            )
        }
    }, [])

    let dispatch = useDispatch()
    const [isSwitchOn, setIsSwitchOn] = React.useState(false)
    const [birthday, setBirthday] = React.useState('')

    const onToggleSwitch = async () => {
        setIsSwitchOn(!isSwitchOn)

        if (!isSwitchOn === true) {
            const getPermission = async () => {
                if (Constants.isDevice) {
                    const { status: existingStatus } =
                        await Notifications.getPermissionsAsync()
                    let finalStatus = existingStatus
                    if (existingStatus !== 'granted') {
                        const { status } =
                            await Notifications.requestPermissionsAsync()
                        finalStatus = status
                    }

                    if (finalStatus !== 'granted') {
                        alert('Enable push notifications to use the app!')
                        await AsyncStorage.setItem('expopushtoken', '')
                        return
                    }

                    const token = (await Notifications.getExpoPushTokenAsync())
                        .data
                    await AsyncStorage.setItem('expopushtoken', token)
                }

                if (Platform.OS === 'android') {
                    Notifications.setNotificationChannelAsync('default', {
                        name: 'default',
                        importance: Notifications.AndroidImportance.MAX,
                        vibrationPattern: [0, 250, 250, 250],
                        lightColor: '#FF231F7C',
                    })
                }
            }
            getPermission()

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Check Vitals',
                    body: 'Have you taken your morning vital check?',
                    data: { url: '/MainLogTime' },
                },
                trigger: { hour: 9, minute: 32, repeats: true },
            })

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Check Lunch Vitals',
                    body: 'Have you taken your lunch vital check?',
                    data: { url: '/MainLogTime' },
                },
                trigger: { hour: 16, minute: 24, repeats: true },
            })

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Check Dinner Vitals',
                    body: 'Have you taken your dinner vital check?',
                    data: { url: '/MainLogTime' },
                },
                trigger: { hour: 19, minute: 0, repeats: true },
            })

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Check Bedtime Vitals',
                    body: 'Have you taken your before bedtime vital check?',
                    data: { url: '/MainLogTime' },
                },
                trigger: { hour: 21, minute: 0, repeats: true },
            })
        } else {
            Notifications.cancelAllScheduledNotificationsAsync()
        }
    }
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [initialPassValues, setInitialPassValues] = React.useState({
        oldPassword: '',
        newPassword: '',
    })
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [ChangePassword, setChangePassword] = React.useState(false)
    const [textSecure, setTextSecure] = React.useState(true)
    const [textSecure2, setTextSecure2] = React.useState(true)
    const [fullnames, setFullnames] = React.useState({
        fullname: '',
    })

    const { isError, isSuccess, message, userdetails } = useSelector(
        (state) => state.auth
    )

    //validation schema for password
    const passwordValidationSchema = yup.object().shape({
        oldPassword: yup.string().required(' required'),
        newPassword: yup.string().required('required'),
    })

    React.useEffect(() => {
        dispatch(GetAllDetails())
    }, [dispatch])

    React.useEffect(() => {
        if (userdetails.birthday) {
            const birthdayFormat = moment(
                userdetails.birthday,
                'D/M/YYYY'
            ).format('D MMM YYYY')

            setBirthday(() => birthdayFormat)
        }
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

            if (message === 'logout success') {
                // navigation.navigate('Login')
                //  NativeModules.DevSettings.reload()
            } else {
            }

            setIsSubmittingp(false)
            cancelChangeKeyUpload()
            dispatch(reset())
        }
    }, [isError, isSuccess, message, dispatch])

    /** for editing password */
    const activateChangeKey = (data) => {
        setChangePassword(() => true)
    }
    const cancelChangeKeyUpload = () => {
        setChangePassword(() => false)
    }

    const onChangeSecure = () => {
        setTextSecure(!textSecure)
    }

    const onChangeSecure2 = () => {
        setTextSecure2(!textSecure2)
    }

    React.useEffect(() => {
        //fullname
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('@user')
                if (value !== null) {
                    // value previously stored
                    setFullnames(() => JSON.parse(value))
                }
            } catch (e) {
                // error reading value
            }
        }

        getData()
    }, [userdetails])

    return (
        <Stack style={styles.container}>
            <StatusBar />
            {/** Title */}
            <HStack
                h={Platform.OS === 'ios' ? '10%' : '15%'}
                style={styles.titleContainer}>
                <Text style={styles.textTitle}>{fullnames.fullname}</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditAccount')}
                    style={styles.titleBtn}>
                    <Text style={styles.titleBtnText}>Edit Details</Text>
                </TouchableOpacity>
            </HStack>

            {/** rest of the content */}
            <Stack
                h={Platform.OS === 'ios' ? '90%' : '100%'}
                style={{
                    paddingBottom: Platform.OS === 'ios' ? '0%' : '40%',
                }}>
                <ScrollView
                    contentContainerStyle={{
                        justifyContent: 'center',
                        width: '100%',
                        marginTop: 0,
                    }}>
                    <Stack
                        h='100%'
                        style={styles.contentContainer}
                        spacing={'15%'}>
                        {/** Account */}
                        <Stack>
                            <Text style={styles.listHead}>Account</Text>

                            <Stack>
                                <Stack>
                                    <List.Item
                                        title='Username'
                                        left={(props) => (
                                            <View
                                                style={[
                                                    styles.listIcon,
                                                    {
                                                        backgroundColor:
                                                            '#3E66FB',
                                                    },
                                                ]}>
                                                <MaterialCommunityIcons
                                                    name='account'
                                                    size={24}
                                                    color='#fff'
                                                />
                                            </View>
                                        )}
                                        right={(props) => (
                                            <Text style={styles.listText}>
                                                {userdetails.patId}
                                            </Text>
                                        )}
                                        titleStyle={styles.listTitle}
                                    />
                                    <Box alignItems='center'>
                                        <Divider style={{ width: '85%' }} />
                                    </Box>
                                </Stack>

                                <Stack>
                                    <List.Item
                                        title='Phone'
                                        left={(props) => (
                                            <View
                                                style={[
                                                    styles.listIcon,
                                                    {
                                                        backgroundColor:
                                                            '#3E66FB',
                                                    },
                                                ]}>
                                                <MaterialCommunityIcons
                                                    name='phone'
                                                    size={19}
                                                    color='#fff'
                                                />
                                            </View>
                                        )}
                                        right={(props) => (
                                            <Text style={styles.listText}>
                                                {userdetails.phoneNumber}
                                            </Text>
                                        )}
                                        titleStyle={styles.listTitle}
                                    />
                                    <Box alignItems='center'>
                                        <Divider style={{ width: '85%' }} />
                                    </Box>
                                </Stack>

                                <Stack>
                                    <List.Item
                                        title='Birthday'
                                        left={(props) => (
                                            <View
                                                style={[
                                                    styles.listIcon,
                                                    {
                                                        backgroundColor:
                                                            '#3E66FB',
                                                    },
                                                ]}>
                                                <MaterialCommunityIcons
                                                    name='calendar-month'
                                                    size={19}
                                                    color='#fff'
                                                />
                                            </View>
                                        )}
                                        right={(props) => (
                                            <Text style={styles.listText}>
                                                {birthday}
                                            </Text>
                                        )}
                                        titleStyle={styles.listTitle}
                                    />
                                    <Box alignItems='center'>
                                        <Divider style={{ width: '85%' }} />
                                    </Box>
                                </Stack>

                                <List.Item
                                    title='Height & Weight'
                                    left={(props) => (
                                        <View
                                            style={[
                                                styles.listIcon,
                                                {
                                                    backgroundColor: '#3E66FB',
                                                },
                                            ]}>
                                            <Octicons
                                                name='north-star'
                                                size={19}
                                                color='#fff'
                                            />
                                        </View>
                                    )}
                                    right={(props) => (
                                        <Text style={styles.listText}>
                                            {userdetails.height},
                                            {userdetails.weight}
                                        </Text>
                                    )}
                                    titleStyle={styles.listTitle}
                                />
                            </Stack>
                        </Stack>

                        {/** System */}
                        <Stack>
                            <Text style={styles.listHead}>System</Text>

                            <Stack>
                                <Stack>
                                    <List.Item
                                        title='Notifications'
                                        description='Enable to recieve in-app notifications'
                                        left={(props) => (
                                            <View
                                                style={[
                                                    styles.listIcon,
                                                    {
                                                        backgroundColor:
                                                            '#f3bb1c',
                                                    },
                                                ]}>
                                                <MaterialIcons
                                                    name='notifications'
                                                    size={19}
                                                    color='#fff'
                                                />
                                            </View>
                                        )}
                                        right={(props) => (
                                            <Switch
                                                color={'#3cc13b'}
                                                value={isSwitchOn}
                                                onValueChange={onToggleSwitch}
                                            />
                                        )}
                                        titleStyle={styles.listTitle}
                                        descriptionStyle={{ color: '#6C6C70' }}
                                    />
                                    <Box alignItems='center'>
                                        <Divider style={{ width: '85%' }} />
                                    </Box>
                                </Stack>

                                {/** change password */}

                                <TouchableOpacity
                                    onPress={() =>
                                        setChangePassword(() => true)
                                    }>
                                    <Stack>
                                        <List.Item
                                            title='Change your Password?'
                                            description='Reset it here'
                                            left={(props) => (
                                                <View
                                                    style={[
                                                        styles.listIcon,
                                                        {
                                                            backgroundColor:
                                                                '#5856d6',
                                                        },
                                                    ]}>
                                                    <FontAwesome
                                                        name='unlock'
                                                        size={19}
                                                        color='#fff'
                                                    />
                                                </View>
                                            )}
                                            titleStyle={styles.listTitle}
                                            descriptionStyle={{
                                                color: '#6C6C70',
                                            }}
                                        />
                                        <Box alignItems='center'>
                                            <Divider style={{ width: '85%' }} />
                                        </Box>
                                    </Stack>
                                </TouchableOpacity>

                                {/** contact us */}
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('ContactDetails')
                                    }>
                                    <List.Item
                                        title='Support'
                                        description='Contact us about your account'
                                        left={(props) => (
                                            <View
                                                style={[
                                                    styles.listIcon,
                                                    {
                                                        backgroundColor:
                                                            '#34c759',
                                                    },
                                                ]}>
                                                <FontAwesome
                                                    name='comment'
                                                    size={19}
                                                    color='#fff'
                                                />
                                            </View>
                                        )}
                                        titleStyle={styles.listTitle}
                                        descriptionStyle={{ color: '#6C6C70' }}
                                    />
                                </TouchableOpacity>
                            </Stack>
                        </Stack>

                        {/** Logout Button */}

                        <Stack alignItems='center'>
                            <TouchableOpacity
                                onPress={() => dispatch(Logout())}
                                style={styles.logoutBtn}>
                                <Text style={styles.logoutBtnText}>Logout</Text>
                            </TouchableOpacity>
                        </Stack>
                    </Stack>

                    {/** change password modal */}
                    <Modal
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            marginTop: 0,
                        }}
                        animationType='slide'
                        transparent={true}
                        visible={ChangePassword}>
                        <View
                            style={{
                                backgroundColor: 'rgba(0,0,0,0.5)',

                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                            }}>
                            <Formik
                                initialValues={initialPassValues}
                                validationSchema={passwordValidationSchema}
                                onSubmit={(values, helpers) => {
                                    setHelperFunctions(helpers)
                                    dispatch(UpdatePasskey(values))
                                    setIsSubmittingp(() => true)
                                }}>
                                {({
                                    values,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                }) => (
                                    <Stack
                                        w='100%'
                                        spacing={31}
                                        bg='#fff'
                                        style={styles.passwordModal}>
                                        <Stack
                                            w='100%'
                                            items='center'
                                            spacing={20}>
                                            <Text style={styles.passwordHead}>
                                                Change Password
                                            </Text>
                                            <HStack
                                                style={
                                                    styles.passwordContainer
                                                }>
                                                <TextInput
                                                    style={styles.passwordInput}
                                                    secureTextEntry={textSecure}
                                                    placeholderTextColor='rgba(22, 25, 28, 0.2)'
                                                    placeholder='old password'
                                                    value={values.oldPassword}
                                                    onChangeText={handleChange(
                                                        'oldPassword'
                                                    )}
                                                    onBlur={handleBlur(
                                                        'oldPassword'
                                                    )}
                                                />
                                                {textSecure ? (
                                                    <Pressable
                                                        onPress={onChangeSecure}
                                                        style={
                                                            styles.passwordIcon
                                                        }>
                                                        <Ionicons
                                                            name='ios-eye-off-outline'
                                                            size={25}
                                                            color='black'
                                                        />
                                                    </Pressable>
                                                ) : (
                                                    <Pressable
                                                        onPress={onChangeSecure}
                                                        style={
                                                            styles.passwordIcon
                                                        }>
                                                        <Ionicons
                                                            name='eye-outline'
                                                            size={25}
                                                            color='black'
                                                        />
                                                    </Pressable>
                                                )}
                                            </HStack>

                                            <HStack
                                                style={
                                                    styles.passwordContainer
                                                }>
                                                <TextInput
                                                    style={styles.passwordInput}
                                                    secureTextEntry={
                                                        textSecure2
                                                    }
                                                    placeholderTextColor='rgba(22, 25, 28, 0.2)'
                                                    placeholder='new password'
                                                    value={values.newPassword}
                                                    onChangeText={handleChange(
                                                        'newPassword'
                                                    )}
                                                    onBlur={handleBlur(
                                                        'newPassword'
                                                    )}
                                                />
                                                {textSecure ? (
                                                    <Pressable
                                                        onPress={
                                                            onChangeSecure2
                                                        }
                                                        style={
                                                            styles.passwordIcon
                                                        }>
                                                        <Ionicons
                                                            name='ios-eye-off-outline'
                                                            size={25}
                                                            color='black'
                                                        />
                                                    </Pressable>
                                                ) : (
                                                    <Pressable
                                                        onPress={
                                                            onChangeSecure2
                                                        }
                                                        style={
                                                            styles.passwordIcon
                                                        }>
                                                        <Ionicons
                                                            name='eye-outline'
                                                            size={25}
                                                            color='black'
                                                        />
                                                    </Pressable>
                                                )}
                                            </HStack>

                                            {isSubmittingp ? (
                                                <View
                                                    style={styles.buttonStyles}>
                                                    <ActivityIndicator
                                                        size='small'
                                                        color='white'
                                                    />
                                                </View>
                                            ) : (
                                                <TouchableOpacity
                                                    onPress={handleSubmit}
                                                    style={styles.buttonStyles}>
                                                    <Text
                                                        style={
                                                            styles.buttonText
                                                        }>
                                                        Update
                                                    </Text>
                                                </TouchableOpacity>
                                            )}

                                            <TouchableOpacity
                                                onPress={cancelChangeKeyUpload}
                                                style={
                                                    styles.cancelStyleButton
                                                }>
                                                <Text style={styles.buttonText}>
                                                    Cancel
                                                </Text>
                                            </TouchableOpacity>
                                        </Stack>
                                    </Stack>
                                )}
                            </Formik>
                        </View>
                    </Modal>
                </ScrollView>
            </Stack>
        </Stack>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fcfcfd',
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
        fontFamily: 'Roboto_Medium',
        color: '#000',
        fontSize: 21,
        lineHeight: 24,
        letterSpacing: 0.37,
    },
    titleBtn: {
        backgroundColor: '#3e66fb',
        borderRadius: 8,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
        paddingBottom: 10,
    },
    titleBtnText: {
        fontFamily: 'Roboto_Medium',
        color: '#fff',
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.37,
    },
    contentContainer: {
        backgroundColor: '#fcfcfd',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        marginTop: 20,
        paddingBottom: '20%',
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
    listHead: {
        fontFamily: 'Roboto_Regular',
        fontSize: 12,
        lineHeight: 24,
        color: '#c7c9cd',
        textTransform: 'uppercase',
    },
    listTitle: {
        fontFamily: 'Roboto_Medium',
        fontSize: 17,
        lineHeight: 20,
        color: '#16191C',
    },
    listText: {
        fontFamily: 'Roboto_Regular',
        fontSize: 16,
        lineHeight: 24,
        color: '#16191C',
    },
    listIcon: {
        height: 32,
        width: 32,
        borderRadius: 20,

        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutBtn: {
        width: '80%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3e66fb',
        borderRadius: 8,
    },
    logoutBtnText: {
        color: '#fff',
        fontFamily: 'Roboto_Regular',
        fontSize: 17,
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

    passwordHead: {
        fontFamily: 'Roboto_Medium',
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000',
    },
    passwordModal: {
        paddingBottom: 20,
        paddingTop: 30,
        width: '90%',
        borderRadius: 10,
    },

    cancelStyleButton: {
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
})
