import React from "react"
import { Text, View } from "react-native"

export default function ResultBMI(props) {
    return(
        <View>
            <Text>{props.messageResultBMI}</Text>
            <Text>{props.resultBMI}</Text>
        </View>
    )
}