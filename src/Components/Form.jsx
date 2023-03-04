import React, { useState } from "react"
import { View, StyleSheet, Text, TextInput, Button } from "react-native"

import ResultBMI from "./ResultBMI"

export default function Form() {

    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageBMI, setMessageBMI] = useState("Fill in with height and weight")
    const [bmi, setBMI] = useState(null)
    const [textButton, setTextButton] = useState("Calculate")

    function BMICalculator() {
        return setBMI((weight / (height * height)).toFixed(2))
    }

    function validationBMI() {
        if (weight != null && height != null) {
            BMICalculator()
            setHeight(null)
            setWeight(null)
            setMessageBMI("Your BMI is: ")
            setTextButton("Calculate again")
            return
        }
        setBMI(null)
        setTextButton("Calculate")
        setMessageBMI("Fill in with height and weight")
    }

    return(
        <View>
            <View style={styles.form}>
                <Text>Height: </Text>
                <TextInput
                    onChangeText={setHeight}
                    value={height} 
                    placeholder="Ex. 1.70" 
                    keyboardType="numeric"
                />
                <Text>Weight: </Text>
                <TextInput
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="Ex. 70"
                    keyboardType="numeric"
                />
                <Button
                    onPress={() => {validationBMI()}} 
                    title={textButton}
                />
            </View>
            <ResultBMI 
                messageResultBMI={messageBMI} 
                resultBMI={bmi}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})