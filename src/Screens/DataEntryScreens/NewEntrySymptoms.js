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
import { Ionicons } from '@expo/vector-icons'

import { List, Switch, Divider } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'

const listActivity = [
    {
        title: 'Any Bleeding?',
    },
    {
        title: 'Chills?',
    },
    {
        title: 'Chest pain with exertion?',
    },
    {
        title: 'Shortness of breath?',
    },
    {
        title: 'Cough?',
    },
    {
        title: 'Palpitations?',
    },
    {
        title: 'Fever?',
    },
    {
        title: 'Legs swelling?',
    },
    {
        title: 'Headache?',
    },
]

const NewEntrySymptoms = () => {
    const [emFeelingActivity, setEmFeelingActivity] = React.useState('')
    const [chosenActivity, setChosenActivity] = React.useState([])

    const onChangeEmFeeling = (emValue) => {
        setEmFeelingActivity(() => emValue)
    }
    const onChangeActivity = (activityValue) => {
        let newChosen = [...chosenActivity]

        if (newChosen.length > 0) {
            let findSelected = newChosen.some(
                (element) => element.title === activityValue
            )

            if (findSelected) {
                let filteredData = newChosen.filter((data) => {
                    if (data.title === activityValue) {
                        return null
                    } else {
                        return data
                    }
                })

                setChosenActivity(() => filteredData)
            } else {
                newChosen.push({ title: activityValue })
                setChosenActivity(() => newChosen)
            }
        } else {
            newChosen.push({ title: activityValue })
            setChosenActivity(() => newChosen)
        }
        //setSelectActivity(() => activityValue)
    }

    return (
        <Stack style={styles.container}>
            <StatusBar />

            {/** Title */}
            <HStack
                h={Platform.OS === 'ios' ? 48 : 48}
                style={styles.titleContainer}>
                <Text style={styles.textTitle}>Other symptoms</Text>
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
                    <Stack spacing={30}>
                        {/** feeling status */}
                        <Stack spacing={15}>
                            <Text style={styles.emCardTitle}>
                                How are you feeling today ?
                            </Text>

                            <HStack justifyContent='space-between'>
                                <TouchableOpacity
                                    onPress={() => onChangeEmFeeling('OK')}
                                    style={[
                                        styles.emCardContainer,
                                        {
                                            backgroundColor:
                                                emFeelingActivity === 'OK'
                                                    ? '#3754bf'
                                                    : '#fff',
                                        },
                                    ]}>
                                    <Stack
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <View style={styles.emCardIcon}>
                                            <MaterialCommunityIcons
                                                name='emoticon-happy'
                                                size={40}
                                                color={
                                                    emFeelingActivity === 'OK'
                                                        ? '#fff'
                                                        : '#3754bf'
                                                }
                                            />
                                        </View>
                                        <Text
                                            style={[
                                                styles.emCardText,
                                                {
                                                    color:
                                                        emFeelingActivity ===
                                                        'OK'
                                                            ? '#fff'
                                                            : '#3754bf',
                                                },
                                            ]}>
                                            OK
                                        </Text>
                                    </Stack>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => onChangeEmFeeling('Bad')}
                                    style={[
                                        styles.emCardContainer,
                                        {
                                            backgroundColor:
                                                emFeelingActivity === 'Bad'
                                                    ? '#3754bf'
                                                    : '#fff',
                                        },
                                    ]}>
                                    <Stack
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <View style={styles.emCardIcon}>
                                            <MaterialCommunityIcons
                                                name='emoticon-neutral'
                                                size={40}
                                                color={
                                                    emFeelingActivity === 'Bad'
                                                        ? '#fff'
                                                        : '#3754bf'
                                                }
                                            />
                                        </View>
                                        <Text
                                            style={[
                                                styles.emCardText,
                                                {
                                                    color:
                                                        emFeelingActivity ===
                                                        'Bad'
                                                            ? '#fff'
                                                            : '#3754bf',
                                                },
                                            ]}>
                                            Bad
                                        </Text>
                                    </Stack>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => onChangeEmFeeling('Sick')}
                                    style={[
                                        styles.emCardContainer,
                                        {
                                            backgroundColor:
                                                emFeelingActivity === 'Sick'
                                                    ? '#3754bf'
                                                    : '#fff',
                                        },
                                    ]}>
                                    <Stack
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <View style={styles.emCardIcon}>
                                            <MaterialCommunityIcons
                                                name='emoticon-sad'
                                                size={40}
                                                color={
                                                    emFeelingActivity === 'Sick'
                                                        ? '#fff'
                                                        : '#3754bf'
                                                }
                                            />
                                        </View>
                                        <Text
                                            style={[
                                                styles.emCardText,
                                                {
                                                    color:
                                                        emFeelingActivity ===
                                                        'Sick'
                                                            ? '#fff'
                                                            : '#3754bf',
                                                },
                                            ]}>
                                            Sick
                                        </Text>
                                    </Stack>
                                </TouchableOpacity>
                            </HStack>
                        </Stack>

                        {/** symptoms */}

                        <Stack spacing={15}>
                            <Text style={styles.emCardTitle}>
                                Do you have other symptoms?
                            </Text>

                            {/** lists */}

                            <Stack
                                spacing={10}
                                style={{
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                }}>
                                {listActivity.map((data, index) => {
                                    let findSelected = chosenActivity.some(
                                        (element) =>
                                            element.title === data.title
                                    )
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() =>
                                                onChangeActivity(data.title)
                                            }>
                                            <HStack
                                                style={[
                                                    styles.activityListContainer,
                                                    {
                                                        backgroundColor:
                                                            findSelected
                                                                ? '#ecf0ff'
                                                                : 'rgba(0,0,0,0)',
                                                    },
                                                ]}
                                                justifyContent='space-between'
                                                alignItems='center'>
                                                <HStack spacing={16}>
                                                    <Text
                                                        style={
                                                            styles.activityListText
                                                        }>
                                                        {data.title}
                                                    </Text>
                                                </HStack>
                                                <Stack>
                                                    {findSelected ? (
                                                        <Ionicons
                                                            name='md-checkmark-sharp'
                                                            size={24}
                                                            color='#7c97fb'
                                                        />
                                                    ) : (
                                                        <Box
                                                            style={
                                                                styles.activityUnselected
                                                            }
                                                        />
                                                    )}
                                                </Stack>
                                            </HStack>
                                        </TouchableOpacity>
                                    )
                                })}
                            </Stack>
                        </Stack>
                    </Stack>

                    <TouchableOpacity style={styles.nextBtn}>
                        <Text style={styles.nextBtnText}>Continue</Text>
                    </TouchableOpacity>
                </Stack>
            </ScrollView>
        </Stack>
    )
}

export default NewEntrySymptoms

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
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
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
    emCardTitle: {
        color: '#000000',
        fontFamily: 'Roboto_Medium',
        fontSize: 20,
    },
    emCardContainer: {
        width: '31%',
        height: 120,
        borderRadius: 14,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emCardIcon: {
        width: 48,
        height: 48,

        alignItems: 'center',
        justifyContent: 'center',
    },
    emCardText: {
        color: '#3754bf',
        fontFamily: 'Roboto_Medium',
        fontSize: 18,
    },
})
