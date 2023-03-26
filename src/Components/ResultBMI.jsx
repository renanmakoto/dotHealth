import React from "react"
import { Text, View, StyleSheet } from "react-native"

export default function ResultBMI(props) {
    return(
        <View style={styles.resultBMI}>
            <Text style={styles.infotmation}>{props.messageResultBMI}</Text>
            <Text style={styles.numberBMI}>{props.resultBMI}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    resultBMI: {
        flex: 1,
        marginTop: 15,
        paddingTop: 60,
        borderRadius: 50,
        alignItems: "center",
        width: "100%",
    },
    infotmation: {
        fontSize: 18,
        color: "#FF0043",
        fontWeight: "bold",
    },
    numberBMI: {
        fontSize: 48,
        color: "#FF0043",
        fontWeight: "bold",
    }
})