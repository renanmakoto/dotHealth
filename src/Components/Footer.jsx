import React from 'react'
import { View, StyleSheet, Text } from "react-native"

export default function Footer() {
    return(
        <View>
            <Text style={styles.footer}>2025 - by dotExtension</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        color: '#FFFFFF',
        fontWeight: 'Bold',
        height: 70,
        backgroundColor: '#858585',
        textAlign: 'center',
        paddingBottom: 10,
    }
})