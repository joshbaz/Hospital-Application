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
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit'
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory-native'
import BPressureTab from '../../components/HealthVitals/BPressureTab'

import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-root-toast'
import {
    StatisticalVitalGlucoseReading,
    StatisticalVitalPressureReading,
    reset,
} from '../../Store/features/vitals/vitalSlice'
import moment from 'moment-timezone'

const windowWidth = Dimensions.get('window').width

const HealthVitals = ({navigation}) => {
    let dispatch = useDispatch()
    const [activeTab, setActiveTab] = React.useState('glucose')

    const handleTabChange = (tabname) => {
        setActiveTab(() => tabname)
    }

    const { isError, isSuccess, message, glucoseVitals, pressureVitals } =
        useSelector((state) => state.vitals)

    React.useEffect(() => {
        dispatch(StatisticalVitalGlucoseReading())
    }, [dispatch])

    React.useEffect(() => {
        dispatch(StatisticalVitalPressureReading())
    }, [dispatch])

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

            dispatch(reset())
        }
    }, [isError, isSuccess, message, dispatch])
    return (
        <Stack style={styles.container}>
            {/** Title */}
            <Stack h='10%' style={styles.titleContainer}>
                <Text style={styles.textTitle}>My Diary</Text>
            </Stack>

            {/** rest of the content */}
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    width: '100%',
                    marginTop: 0,
                }}>
                <Stack h='100%' style={styles.contentContainer} spacing={'15%'}>
                    {/** tabs */}
                    <HStack style={styles.tabContainer}>
                        <TouchableOpacity
                            onPress={() => handleTabChange('glucose')}
                            style={[
                                styles.tabButton,
                                activeTab === 'glucose' &&
                                    styles.tabButtonActive,
                            ]}>
                            <Text style={styles.tabBtnText}>Bl. Glucose</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleTabChange('pressure')}
                            style={[
                                styles.tabButton,
                                activeTab !== 'glucose' &&
                                    styles.tabButtonActive,
                            ]}>
                            <Text style={styles.tabBtnText}>Bl. Pressure</Text>
                        </TouchableOpacity>
                    </HStack>

                    {activeTab === 'glucose' && (
                        <Stack spacing={20}>
                            {/** measure link  */}
                            <HStack
                                justifyContent='space-between'
                                alignItems='center'>
                                <Text style={styles.linkHead}>
                                    Blood glucose levels
                                </Text>

                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('LogTime', {
                                            vital: 'Blood Glucose',
                                        })
                                    }
                                    style={styles.linkBtn}>
                                    <Text style={styles.linkBtnText}>
                                        Measure
                                    </Text>
                                </TouchableOpacity>
                            </HStack>

                            {/** average stat  */}
                            <Stack style={styles.avgStat}>
                                <Text style={styles.avgStatHead}>
                                    Average Blood Sugar Level
                                </Text>
                                <Text style={styles.avgStatNum}>
                                    {glucoseVitals.avgVital}
                                </Text>
                                <Text style={styles.avgStatType}>mg/dl</Text>
                            </Stack>

                            {/** graph */}

                            <Stack w='100%' alignItems='center'>
                                <VictoryChart
                                    domainPadding={{ x: 15 }}
                                    width={windowWidth}>
                                    <VictoryBar
                                        width={windowWidth}
                                        barWidth={30}
                                        style={{
                                            data: {
                                                fill: '#8E8E93',
                                                width: windowWidth,
                                            },
                                        }}
                                        data={glucoseVitals.graphEntries}
                                        alignment='middle'
                                    />
                                    <VictoryAxis
                                        style={{
                                            axis: {
                                                stroke: '#756f6a',
                                                display: 'none',
                                            },
                                            axisLabel: {
                                                fontSize: 20,
                                                padding: 0,
                                            },
                                            grid: {
                                                stroke: ({ tick }) =>
                                                    tick > 0.5
                                                        ? '#8E8E93'
                                                        : '#8E8E93',
                                            },
                                            ticks: {
                                                stroke: '#8E8E93',
                                                size: 5,
                                            },
                                            tickLabels: {
                                                width: '100%',
                                                fontSize: 15,
                                                paddingRight: 100,
                                                textAlign: 'center',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                display: 'none',
                                            },
                                        }}
                                        dependentAxis={true}
                                    />
                                    <VictoryAxis
                                        style={{
                                            axis: {
                                                stroke: '#756f6a',
                                                width: '100%',
                                            },
                                            axisLabel: {
                                                fontSize: 20,
                                                padding: 30,
                                            },
                                            grid: {
                                                stroke: ({ tick }) =>
                                                    tick > 0.5 ? '' : '',
                                            },
                                            ticks: {
                                                stroke: 'black',
                                                size: 5,
                                                textAlign: 'center',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            },
                                            tickLabels: {
                                                width: '100%',
                                                fontSize: 15,
                                                paddingRight: 100,
                                                textAlign: 'center',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            },
                                        }}
                                        width={windowWidth - 30}
                                        dependentAxis={false}
                                    />
                                </VictoryChart>
                            </Stack>

                            {/** low & high stats */}

                            <HStack justifyContent='space-between'>
                                <Stack
                                    style={[
                                        styles.mstatsContainer,
                                        {
                                            backgroundColor: 'rgb(245,252,245)',
                                            borderColor:
                                                'rgba(22, 25, 28, 0.1)',
                                        },
                                    ]}>
                                    <Stack>
                                        <Text
                                            style={[
                                                styles.mstatsHead,
                                                { color: '#3CC13B' },
                                            ]}>
                                            Lowest
                                        </Text>
                                        <Text
                                            style={[
                                                styles.mstatsHead,
                                                { color: '#3CC13B' },
                                            ]}>
                                            mg/dL
                                        </Text>
                                    </Stack>

                                    <Text style={styles.mstatsNum}>
                                        {' '}
                                        {glucoseVitals.lowestVital}
                                    </Text>
                                </Stack>
                                <Stack
                                    style={[
                                        styles.mstatsContainer,
                                        {
                                            backgroundColor: '#FFECEA',
                                            borderColor:
                                                'rgba(22, 25, 28, 0.1)',
                                        },
                                    ]}>
                                    <Stack>
                                        <Text
                                            style={[
                                                styles.mstatsHead,
                                                { color: '#FB492B' },
                                            ]}>
                                            Highest
                                        </Text>
                                        <Text
                                            style={[
                                                styles.mstatsHead,
                                                { color: '#FB492B' },
                                            ]}>
                                            mg/dL
                                        </Text>
                                    </Stack>
                                    <Text style={styles.mstatsNum}>
                                        {' '}
                                        {glucoseVitals.highestVital}
                                    </Text>
                                </Stack>
                            </HStack>

                            {/** recent entries */}
                            <Stack spacing={15}>
                                <Text style={styles.recentEntHead}>
                                    Recent entries
                                </Text>
                                <Stack
                                    style={styles.recentEntContainer}
                                    spacing={15}>
                                    <Stack>
                                        <Text style={styles.recentEntSubHead}>
                                            Today
                                        </Text>
                                        {glucoseVitals.todayEntries.length >
                                            0 && (
                                            <Stack>
                                                {glucoseVitals.todayEntries.map(
                                                    (data) => {
                                                        let day = moment(
                                                            data.createdDate
                                                        ).format('ddd, h:m a')
                                                        return (
                                                            <HStack
                                                                key={data._id}
                                                                style={
                                                                    styles.recentEntEntry
                                                                }>
                                                                <Text
                                                                    style={
                                                                        styles.recentEntEntryDate
                                                                    }>
                                                                    {day}
                                                                </Text>
                                                                <Text
                                                                    style={
                                                                        styles.recentEntEntryValue
                                                                    }>
                                                                    {
                                                                        data.healthVital
                                                                    }
                                                                    <Text
                                                                        style={
                                                                            styles.recentEntEntryValueType
                                                                        }>
                                                                        mg/dl
                                                                    </Text>
                                                                </Text>
                                                            </HStack>
                                                        )
                                                    }
                                                )}
                                            </Stack>
                                        )}
                                    </Stack>

                                    {/**  week entries */}
                                    <Stack pb={60}>
                                        <Text style={styles.recentEntSubHead}>
                                            This Week
                                        </Text>
                                        {glucoseVitals.weekEntries.length >
                                            0 && (
                                            <Stack>
                                                {glucoseVitals.weekEntries.map(
                                                    (data) => {
                                                        let day = moment(
                                                            data.createdDate
                                                        ).format('ddd, h:m a')
                                                        return (
                                                            <HStack
                                                                key={data._id}
                                                                style={
                                                                    styles.recentEntEntry
                                                                }>
                                                                <Text
                                                                    style={
                                                                        styles.recentEntEntryDate
                                                                    }>
                                                                    {day}
                                                                </Text>
                                                                <Text
                                                                    style={
                                                                        styles.recentEntEntryValue
                                                                    }>
                                                                    {
                                                                        data.healthVital
                                                                    }
                                                                    <Text
                                                                        style={
                                                                            styles.recentEntEntryValueType
                                                                        }>
                                                                        mg/dl
                                                                    </Text>
                                                                </Text>
                                                            </HStack>
                                                        )
                                                    }
                                                )}
                                            </Stack>
                                        )}
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    )}

                    {/** BI. Pressure */}
                    {activeTab === 'pressure' && <BPressureTab />}
                </Stack>
            </ScrollView>
        </Stack>
    )
}

export default HealthVitals

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    titleContainer: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 0,
        justifyContent: 'center',
    },

    textTitle: {
        fontFamily: 'Roboto_Bold',
        color: '#16191C',
        fontSize: 25,
        lineHeight: 41,
        letterSpacing: 0.37,
    },
    contentContainer: {
        backgroundColor: '#fcfcfd',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: '20%',
    },
    tabContainer: {
        height: 32,
        backgroundColor: 'rgba(118, 118, 128, 0.12)',
        borderRadius: 8,
        padding: 2,
        justifyContent: 'space-between',
    },
    tabButton: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        borderRadius: 6,
    },
    tabButtonActive: {
        backgroundColor: '#fff',
    },
    tabButtonInActive: {},
    tabBtnText: {
        fontFamily: 'Roboto_Medium',
        fontSize: 15,
        color: '#000',
    },
    linkHead: {
        fontFamily: 'Roboto_Regular',
        fontSize: 20,
        color: '#000',
        lineHeight: 28,
    },
    linkBtn: {
        height: 40,
        backgroundColor: '#3E66FB',
        alignItems: 'center',
        justifyContent: 'center',
        width: 92,
        borderRadius: 10,
    },
    linkBtnText: {
        fontFamily: 'Roboto_Regular',
        fontSize: 14,
        color: '#fff',
        lineHeight: 20,
    },
    avgStat: {
        backgroundColor: '#fff',
        height: 140,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '5%',
        paddingBottom: '5%',
        borderWidth: 1,
        borderColor: 'rgba(22, 25, 28, 0.1)',
    },
    avgStatHead: {
        color: '#8E8E93',
        fontFamily: 'Roboto_Medium',
        fontSize: 18,
        lineHeight: 25,
    },
    avgStatNum: {
        color: '#3E66FB',
        fontFamily: 'Roboto_Medium',
        fontSize: 45,
    },
    avgStatType: {
        color: '#8E8E93',
        fontFamily: 'Roboto_Regular',
        fontSize: 20,
        lineHeight: 25,
    },
    chart: {
        flex: 1,
    },
    mstatsContainer: {
        height: 163,
        width: '45%',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingTop: '9%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '7%',
        borderWidth: 1,
    },
    mstatsHead: {
        color: '#16191C',
        fontFamily: 'Roboto_Medium',
        fontSize: 18,
    },
    mstatsNum: {
        color: '#16191C',
        fontFamily: 'Roboto_Bold',
        fontSize: 38,
    },
    recentEntHead: {
        color: '#16191C',
        fontFamily: 'Roboto_Medium',
        fontSize: 20,
    },
    recentEntContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
        paddingBottom: 10,
    },
    recentEntSubHead: {
        color: '#000000',
        fontFamily: 'Roboto_Medium',
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(22, 25, 28, 0.25)',
        paddingBottom: 8,
    },
    recentEntEntry: {
        height: 40,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(22, 25, 28, 0.25)',
    },
    recentEntEntryDate: {
        color: '#8E8E93',
        fontFamily: 'Roboto_Medium',
        fontSize: 15,
        width: '45%',
    },
    recentEntEntryValue: {
        color: '#16191C',
        fontFamily: 'Roboto_Medium',
        fontSize: 21,
    },
    recentEntEntryValueType: {
        color: '#8E8E93',
        fontFamily: 'Roboto_Regular',
        fontSize: 13,
    },
})
