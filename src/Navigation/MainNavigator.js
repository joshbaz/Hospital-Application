import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../Screens/AuthScreen/LoginScreen'
import RegisterScreen from '../Screens/AuthScreen/RegisterScreen'
import RegisterVerify from '../Screens/AuthScreen/RegisterVerify'
import RegisterSuccess from '../Screens/AuthScreen/RegisterSuccess'
import ForgotScreen from '../Screens/AuthScreen/ForgotScreen'
import ResetScreen from '../Screens/AuthScreen/ResetScreen'
import ResetVerify from '../Screens/AuthScreen/ResetVerify'
import OnboardingInfo from '../Screens/Onboarding/OnboardingInfo'
import MainScreen from '../Screens/OtherScreens/MainScreen'
import HealthVitals from '../Screens/OtherScreens/HealthVitals'
import HeaderArrow from '../components/common/HeaderArrow'
import AccountScreen from '../Screens/AccountScreens/AccountScreen'
import EditAccount from '../Screens/AccountScreens/EditAccount'
import ContactDetails from '../Screens/AccountScreens/ContactDetails'
import LogTime from '../Screens/DataEntryScreens/LogTime'
import HeaderRight from '../components/common/HeaderRight'
import VitalSigns from '../Screens/DataEntryScreens/VitalSigns'
import NewEntryBGlucose from '../Screens/DataEntryScreens/NewEntryBGlucose'
import NewEntryBPressure from '../Screens/DataEntryScreens/NewEntryBPressure'
import NewEntryFitness from '../Screens/DataEntryScreens/NewEntryFitness'
import NewEntrySymptoms from '../Screens/DataEntryScreens/NewEntrySymptoms'
import LogTimeMain from '../Screens/DataEntryScreens/LogTimeMain'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import OnboardingInfo2 from '../Screens/Onboarding/OnboardingInfo2'
const Stack = createNativeStackNavigator()
const MainNavigator = () => {
    const [auth, setAuth] = React.useState(false)

    const { isLoggedIn } = useSelector((state) => state.auth)

    React.useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('@storage_Key')

                if (value) {
                    setAuth(() => true)
                } else {
                   
                    setAuth(() => false)
                }
            } catch (error) {}
        }

        getData()
    }, [isLoggedIn])

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                {!auth ? (
                    <>
                        <Stack.Screen
                            name='Login'
                            component={LoginScreen}
                            options={{ header: () => null }}
                        />
                        <Stack.Screen
                            name='Register'
                            component={RegisterScreen}
                            options={{ header: () => null }}
                        />

                        <Stack.Screen
                            name='Verify'
                            component={RegisterVerify}
                            options={{ header: () => null }}
                        />
                        <Stack.Screen
                            name='RegisterSuccess'
                            component={RegisterSuccess}
                            options={{ header: () => null }}
                        />
                        <Stack.Screen
                            name='ForgotScreen'
                            component={ForgotScreen}
                            options={{ header: () => null }}
                        />
                        <Stack.Screen
                            name='ResetVerify'
                            component={ResetVerify}
                            options={{ header: () => null }}
                        />

                        <Stack.Screen
                            name='ResetScreen'
                            component={ResetScreen}
                            options={{ header: () => null }}
                        />

                        <Stack.Screen
                            name='OnboardingScreen'
                            component={OnboardingInfo2}
                            options={{ header: () => null }}
                        />
                    </>
                ) : (
                    <>
                        {/** Main screen */}

                        <Stack.Screen
                            name='Home'
                            component={MainScreen}
                            options={{ header: () => null }}
                        />

                        {/** onboarding screen */}
                        <Stack.Screen
                            name='OnboardingScreen'
                            component={OnboardingInfo}
                            options={{ header: () => null }}
                        />

                        <Stack.Screen
                            name='HealthVitals'
                            component={HealthVitals}
                            options={{
                                headerTitle: 'Health Vitals',
                                headerLeft: () => <HeaderArrow />,
                                headerTitleAlign: 'center',
                                headerStyle: {
                                    backgroundColor: '#fff',
                                    elevation: 0,
                                    shadowOpacity: 0,
                                },
                                headerShadowVisible: false,
                            }}
                        />
                        {/** account screens */}
                        <Stack.Screen
                            name='MyAccount'
                            component={AccountScreen}
                            options={{
                                headerTitle: 'My account',
                                headerLeft: () => <HeaderArrow />,
                                headerTitleAlign: 'center',
                                headerStyle: {
                                    backgroundColor: '#fff',
                                    elevation: 0,
                                    shadowOpacity: 0,
                                },
                                headerShadowVisible: false,
                            }}
                        />

                        <Stack.Screen
                            name='EditAccount'
                            component={EditAccount}
                            options={{
                                headerTitle: 'My account',
                                headerLeft: () => <HeaderArrow />,
                                headerTitleAlign: 'center',
                                headerStyle: {
                                    backgroundColor: '#fff',
                                    elevation: 0,
                                    shadowOpacity: 0,
                                },
                                headerShadowVisible: false,
                            }}
                        />

                        <Stack.Screen
                            name='ContactDetails'
                            component={ContactDetails}
                            options={{
                                headerTitle: 'My account',
                                headerLeft: () => <HeaderArrow />,
                                headerTitleAlign: 'center',
                                headerStyle: {
                                    backgroundColor: '#fff',
                                    elevation: 0,
                                    shadowOpacity: 0,
                                },
                                headerShadowVisible: false,
                            }}
                        />

                        {/** Data Entry */}
                        <Stack.Screen
                            name='LogTime'
                            component={LogTime}
                            options={{
                                headerTitle: '',
                                headerRight: () => <HeaderRight />,
                                headerLeft: () => <HeaderArrow />,
                                headerTitleAlign: 'center',
                                headerStyle: {
                                    backgroundColor: '#fff',
                                    elevation: 0,
                                    shadowOpacity: 0,
                                },

                                headerShadowVisible: false,
                            }}
                        />

                        <Stack.Screen
                            name='MainLogTime'
                            component={LogTimeMain}
                            options={{
                                headerTitle: '',
                                headerRight: () => <HeaderRight />,
                                headerLeft: () => <HeaderArrow />,
                                headerTitleAlign: 'center',
                                headerStyle: {
                                    backgroundColor: '#fff',
                                    elevation: 0,
                                    shadowOpacity: 0,
                                },

                                headerShadowVisible: false,
                            }}
                        />

                        <Stack.Screen
                            name='VitalSigns'
                            component={VitalSigns}
                            options={{
                                headerTitle: '',
                                headerRight: () => <HeaderRight />,
                                headerLeft: () => <HeaderArrow />,
                                headerTitleAlign: 'center',
                                headerStyle: {
                                    backgroundColor: '#fff',
                                    elevation: 0,
                                    shadowOpacity: 0,
                                },

                                headerShadowVisible: false,
                            }}
                        />

                        <Stack.Screen
                            name='EntryBGlucose'
                            component={NewEntryBGlucose}
                            options={{
                                headerTitle: 'New Entry',

                                headerLeft: (props) => (
                                    <HeaderArrow {...props} />
                                ),
                                headerTitleAlign: 'center',
                                headerStyle: {
                                    backgroundColor: '#fff',
                                    elevation: 0,
                                    shadowOpacity: 0,
                                },

                                headerShadowVisible: false,
                            }}
                        />

                        <Stack.Screen
                            name='EntryBPressure'
                            component={NewEntryBPressure}
                            options={{
                                headerTitle: 'New Entry',

                                headerLeft: () => <HeaderArrow />,
                                headerTitleAlign: 'center',
                                headerStyle: {
                                    backgroundColor: '#fff',
                                    elevation: 0,
                                    shadowOpacity: 0,
                                },

                                headerShadowVisible: false,
                            }}
                        />

                        <Stack.Screen
                            name='EntryFitness'
                            component={NewEntryFitness}
                            options={{
                                headerTitle: 'New Entry',

                                headerLeft: () => <HeaderArrow />,
                                headerTitleAlign: 'center',
                                headerStyle: {
                                    backgroundColor: '#fff',
                                    elevation: 0,
                                    shadowOpacity: 0,
                                },

                                headerShadowVisible: false,
                            }}
                        />

                        <Stack.Screen
                            name='EntrySymptoms'
                            component={NewEntrySymptoms}
                            options={{
                                headerTitle: 'New Entry',

                                headerLeft: () => <HeaderArrow />,
                                headerTitleAlign: 'center',
                                headerStyle: {
                                    backgroundColor: '#fff',
                                    elevation: 0,
                                    shadowOpacity: 0,
                                },

                                headerShadowVisible: false,
                            }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator

const styles = StyleSheet.create({})
