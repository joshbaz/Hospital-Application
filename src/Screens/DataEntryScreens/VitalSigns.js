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
import { COLORS } from '../../Colorvariables/colors'

const VitalSigns = ({ route, navigation }) => {
    const { vitalTimelineType } = route.params
    return (
        <Stack style={styles.container}>
            <StatusBar />

            {/** Title */}
            <HStack
                h={Platform.OS === 'ios' ? '10%' : '10%'}
                style={styles.titleContainer}>
                <Text style={styles.textTitle}>Vital Signs</Text>
                <Text>({vitalTimelineType})</Text>
            </HStack>

            {/** rest of the content */}
            <Stack
                spacing={12}
                h={Platform.OS === 'ios' ? '90%' : '100%'}
                style={{
                    paddingBottom: Platform.OS === 'ios' ? '0%' : '40%',
                    backgroundColor: '#f9fafa',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 20,
                }}>
                <Text style={styles.listHead}>Please select one</Text>
                {/** lists */}
                {/** measurment links */}
                <Stack spacing={12}>
                    <HStack style={styles.measureContainer}>
                        <Box
                            style={[
                                styles.statsIcon,
                                { backgroundColor: '#fed8d9' },
                            ]}>
                            <Fontisto
                                name='blood-drop'
                                size={24}
                                color='#EE6B63'
                            />
                        </Box>

                        <Text style={styles.measureText}>Blood Glucose</Text>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('EntryBGlucose', {
                                    vital: 'Blood Glucose',
                                    vitalTimelineType,
                                })
                            }
                            style={styles.measureBtn}>
                            <Text style={styles.measureBtnText}>Measure</Text>
                        </TouchableOpacity>
                    </HStack>
                    <HStack style={styles.measureContainer}>
                        <Box
                            style={[
                                styles.statsIcon,
                                { backgroundColor: '#e0e8fc' },
                            ]}>
                            <MaterialCommunityIcons
                                name='heart-pulse'
                                size={24}
                                color={COLORS.primarycolor}
                            />
                        </Box>

                        <Text style={styles.measureText}>Blood Pressure</Text>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('EntryBPressure', {
                                    vital: 'Blood Pressure',
                                    vitalTimelineType,
                                })
                            }
                            style={styles.measureBtn}>
                            <Text style={styles.measureBtnText}>Measure</Text>
                        </TouchableOpacity>
                    </HStack>
                    <HStack style={styles.measureContainer}>
                        <Box
                            style={[
                                styles.statsIcon,
                                { backgroundColor: '#fff0d9' },
                            ]}>
                            <FontAwesome5
                                name='dumbbell'
                                size={24}
                                color='#ff9a00'
                            />
                        </Box>

                        <Text style={styles.measureText}>
                            Fitness Activities
                        </Text>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('EntryFitness', {
                                    vital: 'Fitness Activities',
                                    vitalTimelineType,
                                })
                            }
                            style={styles.measureBtn}>
                            <Text style={styles.measureBtnText}>Measure</Text>
                        </TouchableOpacity>
                    </HStack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default VitalSigns

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
    listHead: {
        fontFamily: 'Roboto_Medium',
        color: '#000000',
        fontSize: 20,
        lineHeight: 28,
        letterSpacing: 0.37,
    },
    arrowRight: {
        height: 40,
        width: 40,
        borderWidth: 1.8,
        borderColor: COLORS.primarycolor,
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
    cardSubHead: {
        fontFamily: 'Roboto_Regular',
        color: '#cfd0d1',
        fontSize: 18,
        lineHeight: 24,
        letterSpacing: 0.37,
    },
    cardHead: {
        fontFamily: 'Roboto_Medium',
        color: '#16191C',
        fontSize: 25,
        lineHeight: 30,
        letterSpacing: 0.37,
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
    statsIcon: {
        height: 47,
        width: 47,

        borderRadius: 27,
        alignItems: 'center',
        justifyContent: 'center',
    },
    measureText: {
        fontFamily: 'Roboto_Medium',
        fontSize: 17,
        color: '#16191C',
    },
    measureBtn: {
        backgroundColor: COLORS.primarycolor,
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
