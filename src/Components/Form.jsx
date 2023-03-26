import React, { useState } from "react"
import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity, Vibration } from "react-native"

import ResultBMI from "./ResultBMI"

export default function Form() {

    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageBMI, setMessageBMI] = useState("Fill in with height and weight")
    const [bmi, setBMI] = useState(null)
    const [textButton, setTextButton] = useState("Calculate")
    const [errorMessage, setErrorMessage] = useState(null)

    function BMICalculator() {
        return setBMI((weight / (height * height)).toFixed(2))
    }

    function verifyBMI() {
        if (bmi == null) {
            Vibration.vibrate()
            setErrorMessage("You must fill in the gap")
        }
    }

    function validationBMI() {
        if (weight != null && height != null) {
            BMICalculator()
            setHeight(null)
            setWeight(null)
            setMessageBMI("Your BMI is: ")
            setTextButton("Calculate again")
            setErrorMessage(null)
            return
        }
        verifyBMI()
        setBMI(null)
        setTextButton("Calculate")
        setMessageBMI("Fill in with height and weight")
        
    }

    return(
        <View style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Height: </Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setHeight}
                    value={height} 
                    placeholder="Ex. 1.70" 
                    keyboardType="numeric"
                />
                <Text style={styles.formLabel}>Weight: </Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="Ex. 70"
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    onPress={() => {
                        validationBMI()
                    }}
                    style={styles.buttonCalculator}
                >
                    <Text
                        style={styles.textButtonCalculator}    
                    >{textButton}
                    </Text>
                </TouchableOpacity>
            </View>
            <ResultBMI 
                messageResultBMI={messageBMI} 
                resultBMI={bmi}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    formContext: {
        width: "100%",
        height: "100%",
        bottom: 0,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 30,
    },
    form: {
        width: "100%",
        height: "auto",
        marginTop: 30,
        padding: 10,
    },
    formLabel: {
        color: "#000000",
        fontSize: 18,
        paddingLeft: 20,
    },
    input: {
        width:"90%",
        borderRadius: 50,
        backgroundColor: "#F6F6F6",
        height: 40,
        margin: 12,
        paddingLeft: 10,
    },
    buttonCalculator: {
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        backgroundColor: "#FF0043",
        paddingTop: 14,
        paddingBottom: 14,
        marginLeft: 12,
        margin: 30,
    },
    textButtonCalculator: {
        fontSize: 20,
        color: "#FFFFFF"
    },
    errorMessage: {
        fontSize: 12,
        color: "red",
        fontWeight: "bold",
        paddingLeft: 20,
    }
})