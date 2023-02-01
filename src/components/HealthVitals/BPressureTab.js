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
import {
    VictoryLabel,
    VictoryTheme,
    VictoryArea,
    VictoryAxis,
    VictoryBar,
    VictoryCandlestick,
    VictoryChart,
    VictoryGroup,
    VictoryLine,
    VictoryPie,
    VictoryScatter,
    VictoryStack,
    VictoryErrorBar,
    VictoryVoronoiTooltip,
    VictoryTooltip,
} from 'victory-native'

const windowWidth = Dimensions.get('window').width

const BPressureTab = () => {
    return (
        <Stack spacing={20}>
            {/** measure link  */}
            <HStack justifyContent='space-between' alignItems='center'>
                <Text style={styles.linkHead}>Blood pressure levels</Text>

                <TouchableOpacity style={styles.linkBtn}>
                    <Text style={styles.linkBtnText}>Measure</Text>
                </TouchableOpacity>
            </HStack>

            {/** average stat  */}
            <Stack style={styles.avgStat}>
                <Text style={styles.avgStatHead}>Blood Pressure Level</Text>
                <Stack alignItems='center'>
                    <Text style={styles.avgStatNum}>123/75</Text>
                    <Text style={styles.avgStatType}>mm/Hg</Text>
                </Stack>

                <HStack spacing={9}>
                    <HStack alignItems='center' spacing={5}>
                        <Box
                            style={[
                                styles.avgStatDescBox,
                                { backgroundColor: '#009203' },
                            ]}
                        />
                        <Text
                            style={
                                styles.avgStatDescText
                            }>{`Normal <120`}</Text>
                    </HStack>
                    <HStack alignItems='center' spacing={5}>
                        <Box
                            style={[
                                styles.avgStatDescBox,
                                { backgroundColor: '#F58400' },
                            ]}
                        />
                        <Text
                            style={
                                styles.avgStatDescText
                            }>{`Elevated 120-129`}</Text>
                    </HStack>
                    <HStack alignItems='center' spacing={5}>
                        <Box
                            style={[
                                styles.avgStatDescBox,
                                { backgroundColor: '#BC1800' },
                            ]}
                        />
                        <Text
                            style={styles.avgStatDescText}>{`High >130`}</Text>
                    </HStack>
                </HStack>
            </Stack>

            {/** graph */}

            <Stack w='100%' alignItems='center'>
                <VictoryChart
                    domainPadding={{ x: 0, y: 10 }}
                    width={windowWidth}>
                    <VictoryLine
                        interpolation='natural'
                        width={windowWidth}
                        style={{
                            data: {
                                stroke: '#FFAF70',
                                width: windowWidth,
                            },
                            parent: { border: '1px solid #ccc' },
                        }}
                        data={[
                            { x: 'Mon14', y: 10 },
                            { x: 'Tue14', y: 25 },
                            { x: 'Wed14', y: 40 },
                            { x: 'Thur14', y: 50 },
                            { x: 'Fri14', y: 10 },
                        ]}
                    />
                    <VictoryLine
                        interpolation='natural'
                        width={windowWidth}
                        style={{
                            data: {
                                stroke: '#3E66FB',
                                width: windowWidth,
                                strokeWidth: 2,
                            },
                            parent: { border: '1px solid #ccc' },
                        }}
                        data={[
                            { x: 'Mon14', y: 5 },
                            { x: 'Tue14', y: 20 },
                            { x: 'Wed14', y: 30 },
                            { x: 'Thur14', y: 40 },
                            { x: 'Fri14', y: 16 },
                        ]}
                    />
                    <VictoryAxis
                        style={{
                            axis: {
                                stroke: '#756f6a',
                            },
                            axisLabel: {
                                fontSize: 20,
                                padding: 0,
                            },
                            grid: {
                                stroke: ({ tick }) =>
                                    tick > 0.5 ? '#8E8E93' : '#8E8E93',
                                strokeWidth: 0,
                            },
                            ticks: {
                                stroke: '#8E8E93',
                                size: 5,
                                display: 'none',
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
                                    tick > 0.5 ? '#8E8E93' : '#8E8E93',
                                strokeWidth: 0.5,
                            },
                            ticks: {
                                stroke: 'black',
                                size: 5,
                                textAlign: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                display: 'none',
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
                            borderColor: 'rgba(22, 25, 28, 0.1)',
                        },
                    ]}>
                    <Stack>
                        <Text style={[styles.mstatsHead, { color: '#3CC13B' }]}>
                            Lowest
                        </Text>
                        <Text style={[styles.mstatsHead, { color: '#3CC13B' }]}>
                            mm/Hg
                        </Text>
                    </Stack>

                    <Text style={styles.mstatsNum}>134/79</Text>
                </Stack>
                <Stack
                    style={[
                        styles.mstatsContainer,
                        {
                            backgroundColor: '#FFECEA',
                            borderColor: 'rgba(22, 25, 28, 0.1)',
                        },
                    ]}>
                    <Stack>
                        <Text style={[styles.mstatsHead, { color: '#FB492B' }]}>
                            Highest
                        </Text>
                        <Text style={[styles.mstatsHead, { color: '#FB492B' }]}>
                            mm/Hg
                        </Text>
                    </Stack>
                    <Text style={styles.mstatsNum}>143/82</Text>
                </Stack>
            </HStack>

            {/** recent entries */}
            <Stack spacing={15}>
                <Text style={styles.recentEntHead}>Recent entries</Text>
                <Stack style={styles.recentEntContainer} spacing={15}>
                    <Stack>
                        <Text style={styles.recentEntSubHead}>Today</Text>
                        <HStack style={styles.recentEntEntry}>
                            <Text style={styles.recentEntEntryDate}>
                                Mon, 8:25 am
                            </Text>
                            <Text style={styles.recentEntEntryValue}>
                                5.0{' '}
                                <Text style={styles.recentEntEntryValueType}>
                                    mg/dl
                                </Text>
                            </Text>
                        </HStack>
                    </Stack>

                    {/**  week entries */}
                    <Stack>
                        <Text style={styles.recentEntSubHead}>This Week</Text>
                        <HStack style={styles.recentEntEntry}>
                            <Text style={styles.recentEntEntryDate}>
                                Mon, 8:25 am
                            </Text>
                            <Text style={styles.recentEntEntryValue}>
                                5.0{' '}
                                <Text style={styles.recentEntEntryValueType}>
                                    mg/dl
                                </Text>
                            </Text>
                        </HStack>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default BPressureTab

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
        backgroundColor: '#E5E5E5',
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
        height: 178,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '5%',
        paddingBottom: '5%',
        borderWidth: 1,
        borderColor: 'rgba(22, 25, 28, 0.1)',
    },
    avgStatHead: {
        color: '#C2C9D1',
        fontFamily: 'Roboto_Medium',
        fontSize: 18,
        lineHeight: 25,
    },
    avgStatNum: {
        color: 'rgba(245, 132, 0, 1)',
        fontFamily: 'Roboto_Medium',
        fontSize: 45,
    },
    avgStatType: {
        color: '#C2C9D1',
        fontFamily: 'Roboto_Regular',
        fontSize: 20,
        lineHeight: 25,
    },
    avgStatDescBox: {
        width: 14,
        height: 14,

        borderRadius: 9,
    },
    avgStatDescText: {
        color: '#C2C9D1',
        fontFamily: 'Roboto_Medium',
        fontSize: 12,
        lineHeight: 18,
    },
    chart: {
        flex: 1,
    },
    mstatsContainer: {
        height: 163,
        width: '48%',
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
        fontSize: 35,
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
