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

const ContactDetails = () => {
    return (
        <Stack style={styles.container}>
            <StatusBar />

            {/** Title */}
            <HStack
                h={Platform.OS === 'ios' ? '10%' : '15%'}
                style={styles.titleContainer}>
                <Text style={styles.textTitle}>Contact Us</Text>
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
                            <Stack>
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
                                                +25411463598
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
                                        title='Email'
                                        left={(props) => (
                                            <View
                                                style={[
                                                    styles.listIcon,
                                                    {
                                                        backgroundColor:
                                                            '#3E66FB',
                                                    },
                                                ]}>
                                                <Zocial
                                                    name='email'
                                                    size={19}
                                                    color='#fff'
                                                />
                                            </View>
                                        )}
                                        right={(props) => (
                                            <Text style={styles.listText}>
                                                info@hosi.co.ke
                                            </Text>
                                        )}
                                        titleStyle={styles.listTitle}
                                    />
                                    <Box alignItems='center'>
                                        <Divider style={{ width: '85%' }} />
                                    </Box>
                                </Stack>

                                <List.Item
                                    title='Location'
                                    left={(props) => (
                                        <View
                                            style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <View
                                                style={[
                                                    styles.listIcon,
                                                    {
                                                        backgroundColor:
                                                            '#3E66FB',
                                                    },
                                                ]}>
                                                <FontAwesome
                                                    name='location-arrow'
                                                    size={19}
                                                    color='#fff'
                                                />
                                            </View>
                                        </View>
                                    )}
                                    right={(props) => (
                                        <Text style={styles.listText}>
                                            Shimo La Tewa, Kilifi South, Kilifi
                                            South, Kilifi
                                        </Text>
                                    )}
                                    titleStyle={styles.listTitle}
                                    titleNumberOfLines={10}
                                    titleEllipsizeMode={'tail'}
                                />
                            </Stack>
                        </Stack>

                        {/** System */}

                        {/** Logout Button */}

                        <Stack alignItems='center'>
                            <TouchableOpacity style={styles.logoutBtn}>
                                <Text style={styles.logoutBtnText}>
                                    Make Call
                                </Text>
                            </TouchableOpacity>
                        </Stack>
                    </Stack>
                </ScrollView>
            </Stack>
        </Stack>
    )
}

export default ContactDetails

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
        fontFamily: 'Roboto_Bold',
        color: '#16191C',
        fontSize: 25,
        lineHeight: 41,
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

        paddingBottom: '20%',
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
        maxWidth: '50%',
    },
    listIcon: {
        height: 32,
        width: 32,
        borderRadius: 20,
        margin: 'auto',
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
})
