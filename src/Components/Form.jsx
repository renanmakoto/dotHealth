import React, { useState } from "react"
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Vibration, Pressable, Keyboard, FlatList } from "react-native"

import ResultBMI from "./ResultBMI"

export default function Form() {

    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageBMI, setMessageBMI] = useState("Fill in with height and weight")
    const [bmi, setBMI] = useState(null)
    const [textButton, setTextButton] = useState("Calculate")
    const [errorMessage, setErrorMessage] = useState(null)
    const [BMIList, setBMIList] = useState([])

    function BMICalculator() {
        let heightFormat = height.replace(",", ".")
        let totalBMI = ((weight / (heightFormat * heightFormat)).toFixed(2))
        setBMIList((arr) => [...arr, { id: new Date().getTime().toString(), bmi: totalBMI }])
        setBMI(totalBMI)
    }

    function verifyBMI() {
        if (bmi == null) {
            Vibration.vibrate()
            setErrorMessage("You must fill in the gap")
        }
    }

    function validationBMI() {
        console.log(BMIList)
        if (weight != null && height != null) {
            BMICalculator()
            setHeight(null)
            setWeight(null)
            setMessageBMI("Your BMI is: ")
            setTextButton("Calculate again")
            setErrorMessage(null)
            return
        } else {
            verifyBMI()
            setBMI(null)
            setTextButton("Calculate")
            setMessageBMI("Fill in with height and weight")
        }
    }

    return (
        <View style={styles.formContext}>
            {bmi == null ?
                <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                    <Text style={styles.formLabel}>Height: </Text>
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setHeight}
                        value={height}
                        placeholder="Ex. 1.70 (Use .)"
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
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </Pressable>
                :
                <View style={styles.exhibitionResultBMI}>
                    <ResultBMI
                        messageResultBMI={messageBMI}
                        resultBMI={bmi}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            validationBMI()
                        }}
                        style={styles.buttonCalculator}
                    >
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
            }
            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.listBMI}
                data={BMIList.reverse()}
                renderItem={({ item }) => {
                    return (
                        <Text style={styles.resultBMIItem}>
                            <Text style={styles.textResultItemList}>BMI Result: </Text>
                            {item.bmi}
                        </Text>
                    )
                }}
                keyExtractor={(item) => item.id}
            />
            <Text
                style={styles.footer}
            >2025 - by dotExtension | Renan Makoto</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    formContext: {
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: "#858585",
        alignItems: "center",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 30,
    },
    form: {
        width: "100%",
    },
    formLabel: {
        color: "white",
        fontSize: 18,
        paddingLeft: 20,
    },
    input: {
        width: "90%",
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
        backgroundColor: "#00D6D6",
        paddingTop: 14,
        paddingBottom: 14,
        marginLeft: 12,
        margin: 30,
    },
    textButtonCalculator: {
        fontSize: 20,
        color: "#FFFFFF",
        fontWeight: "bold"
    },
    errorMessage: {
        fontSize: 12,
        color: "red",
        fontWeight: "bold",
        paddingLeft: 20,
    },
    exhibitionResultBMI: {
        width: "100%",
        height: "50%",
    },
    listBMI: {
        marginTop: 20,
    },
    resultBMIItem: {
        fontSize: 26,
        color: "#FFFFFF",
        height: 50,
        width: "100%",
        paddingRight: 20,
    },
    textResultItemList: {
        fontSize: 16,
        color: "#FFFFFF",
    },
    footer: {
        color: '#FFFFFF',
        fontWeight: 'Bold',
        height: 50
    }
})
