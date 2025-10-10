import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Keyboard } from "react-native"

export default function Footer() {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true)
            }
        )
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false)
            }
        )

        return () => {
            keyboardDidHideListener?.remove()
            keyboardDidShowListener?.remove()
        }
    }, [])

    if (isKeyboardVisible) {
        return null
    }

    return(
        <View style={styles.footerContainer}>
            <Text style={styles.footer}>2025 - by dotExtension</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#858585',
        height: 70,
        justifyContent: 'center',
    },
    footer: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 10,
    }
})