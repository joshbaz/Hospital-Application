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

const MainScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar />
            <Stack style={styles.container}>
                {/** Date & Welcome */}
                <Stack h='15%' style={styles.welcomeContainer}>
                    <Text style={styles.textDate}>22 January</Text>

                    <Text style={styles.textWelcome}>Hi, Jane</Text>
                </Stack>
                {/** rest of the content */}
                <Stack h='90%' style={styles.contentContainer} spacing={'15%'}>
                    {/** health stats */}
                    <Stack spacing={15}>
                        <HStack justify='space-between' items='center'>
                            <Text style={styles.linkHead}>Today</Text>
                            <TouchableOpacity>
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

                                <HStack alignItems='center' spacing={5}>
                                    <Text style={styles.statsNum}>120</Text>{' '}
                                    <Text style={styles.statsDesc}>mg/dl</Text>
                                </HStack>
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

                                <HStack alignItems='center' spacing={5}>
                                    <Text style={styles.statsNum}>141</Text>{' '}
                                    <Text style={styles.statsDesc}>mm/gh</Text>
                                </HStack>
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
                            <TouchableOpacity>
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

                                <TouchableOpacity style={styles.measureBtn}>
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

                                <TouchableOpacity style={styles.measureBtn}>
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
