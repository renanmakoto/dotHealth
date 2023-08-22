import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function Title() {
    return(
        <View style={styles.boxTitle}>
            <Text style={styles.textTitle}>dotHealth</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    boxTitle: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    textTitle: {
        color:"#00D6D6",
        fontSize: 24,
        fontWeight: "bold",
    }
})