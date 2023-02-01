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
import React from 'react'
import { Text, Stack, Box, HStack } from '@react-native-material/core'
import { MaterialIcons } from '@expo/vector-icons'

const HeaderRight = () => {
    return (
        <TouchableOpacity>
            <HStack justifyContent='center' items='center'>
                <Text style={styles.linkText}>Diary</Text>
            </HStack>
        </TouchableOpacity>
    )
}

export default HeaderRight

const styles = StyleSheet.create({
    linkText: {
        fontFamily: 'Roboto_Regular',
        fontSize: 16,
        color: '#3E66FB',
        lineHeight: 28,
    },
})
