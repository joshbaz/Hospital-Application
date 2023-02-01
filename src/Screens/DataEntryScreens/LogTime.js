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

import { List, Switch, Divider } from 'react-native-paper'

const linkData = [
    {
        title: 'Breakfast',
        subHead: 'Before',
    },
    {
        title: 'Lunch',
        subHead: 'Before',
    },
    {
        title: 'Dinner',
        subHead: 'Before',
    },
    {
        title: 'Bedtime',
        subHead: 'Before',
    },
]

const LogTime = () => {
    return (
        <Stack style={styles.container}>
            <StatusBar />

            {/** Title */}
            <HStack
                h={Platform.OS === 'ios' ? '10%' : '15%'}
                style={styles.titleContainer}>
                <Text style={styles.textTitle}>Log Time</Text>
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
                {/** lists */}
                {linkData.map((data, index) => {
                    return (
                        <HStack style={styles.cardContainer} key={index}>
                            <Stack>
                                <Text style={styles.cardSubHead}>
                                    {data.subHead}
                                </Text>
                                <Text style={styles.cardHead}>
                                    {data.title}
                                </Text>
                            </Stack>

                            <Stack style={styles.arrowRight}>
                                <MaterialIcons
                                    name='keyboard-arrow-right'
                                    size={40}
                                    color='#3E66FB'
                                />
                            </Stack>
                        </HStack>
                    )
                })}
            </Stack>
        </Stack>
    )
}

export default LogTime

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
})
