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

import { List, Switch, Divider } from 'react-native-paper'

const AccountScreen = () => {
    const [isSwitchOn, setIsSwitchOn] = React.useState(false)

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)
    return (
        <Stack style={styles.container}>
            <StatusBar />
            {/** Title */}
            <HStack
                h={Platform.OS === 'ios' ? '10%' : '15%'}
                style={styles.titleContainer}>
                <Text style={styles.textTitle}>Maritza Mertz</Text>
                <TouchableOpacity style={styles.titleBtn}>
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
                                                PC456788
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
                                                11 May 1987
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
                                            5'6", 36kg
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

                                <Stack>
                                    <List.Item
                                        title='Forgot your Password?'
                                        description='Lost or stolen? Reset it here'
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
                                        descriptionStyle={{ color: '#6C6C70' }}
                                    />
                                    <Box alignItems='center'>
                                        <Divider style={{ width: '85%' }} />
                                    </Box>
                                </Stack>

                                <List.Item
                                    title='Support'
                                    description='Contact us about your account'
                                    left={(props) => (
                                        <View
                                            style={[
                                                styles.listIcon,
                                                { backgroundColor: '#34c759' },
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
                            </Stack>
                        </Stack>

                        {/** Logout Button */}

                        <Stack alignItems='center'>
                            <TouchableOpacity style={styles.logoutBtn}>
                                <Text style={styles.logoutBtnText}>Logout</Text>
                            </TouchableOpacity>
                        </Stack>
                    </Stack>
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
        borderRadius: '50%',

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
