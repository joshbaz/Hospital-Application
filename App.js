import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import MainNavigator from './src/Navigation/MainNavigator'
import { store } from './src/Store/store'
import { Provider } from 'react-redux'
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

export default function App() {
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
                    <MainNavigator />
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
