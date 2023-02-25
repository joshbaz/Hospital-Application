import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Platform,
    Linking,
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import MainNavigator from './src/Navigation/MainNavigator'
import { store } from './src/Store/store'
import { Provider } from 'react-redux'
import { RootSiblingParent } from 'react-native-root-siblings'
import {
    useFonts,
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto'
import { Provider as PaperProvider } from 'react-native-paper'
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'

export default function App() {
    const lastNotificationResponse = Notifications.useLastNotificationResponse()
    React.useEffect(() => {
        if (
            lastNotificationResponse &&
            lastNotificationResponse.notification.request.content.data.url &&
            lastNotificationResponse.actionIdentifier ===
                Notifications.DEFAULT_ACTION_IDENTIFIER
        ) {
            // Linking.openURL(
            //     lastNotificationResponse.notification.request.content.data.url
            // )
        }
    }, [lastNotificationResponse])

    React.useEffect(() => {
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

                const token = (await Notifications.getExpoPushTokenAsync()).data
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
    }, [])
    if (Text.defaultProps == null) {
        Text.defaultProps = {}
        Text.defaultProps.allowFontScaling = false
    } else {
    }

    if (TextInput.defaultProps == null) {
        TextInput.defaultProps = {}
        TextInput.defaultProps.allowFontScaling = false
    } else {
    }

    let [fontsLoaded] = useFonts({
        Roboto_Thin: Roboto_100Thin,
        Roboto_Thin_Italic: Roboto_100Thin_Italic,
        Roboto_Light: Roboto_300Light,
        Roboto_Light_Italic: Roboto_300Light_Italic,
        Roboto_Regular: Roboto_400Regular,
        Roboto_Regular_Italic: Roboto_400Regular_Italic,
        Roboto_Medium: Roboto_500Medium,
        Roboto_Medium_Italic: Roboto_500Medium_Italic,
        Roboto_Bold: Roboto_700Bold,
        Roboto_Bold_Italic: Roboto_700Bold_Italic,
        Roboto_Black: Roboto_900Black,
        Roboto_Black_Italic: Roboto_900Black_Italic,
    })

    if (!fontsLoaded) {
        return null
    }
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <PaperProvider>
                    <RootSiblingParent>
                        <MainNavigator />
                    </RootSiblingParent>
                </PaperProvider>
            </Provider>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
