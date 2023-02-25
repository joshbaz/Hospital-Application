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
import { useNavigation } from '@react-navigation/native'
const HeaderArrow = (props) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <HStack justifyContent='center' items='center'>
                <MaterialIcons
                    name='keyboard-arrow-left'
                    size={20}
                    color='#3E66FB'
                />
                <Text style={styles.linkText}>Back</Text>
            </HStack>
        </TouchableOpacity>
    )
}

export default HeaderArrow

const styles = StyleSheet.create({
    linkText: {
        fontFamily: 'Roboto_Regular',
        fontSize: 16,
        color: '#3E66FB',
        lineHeight: 28,
    },
})
