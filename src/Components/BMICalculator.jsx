import React, { useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  Pressable,
  Keyboard,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import ResultBMI from "./ResultBMI"

export default function BMICalculator() {
  const [height, setHeight] = useState(null)
  const [weight, setWeight] = useState(null)
  const [messageBMI, setMessageBMI] = useState("Fill in with height and weight")
  const [bmi, setBMI] = useState(null)
  const [textButton, setTextButton] = useState("Calculate")
  const [errorMessage, setErrorMessage] = useState(null)
  const [BMIList, setBMIList] = useState([])

  function calculateBMI() {
    let heightInMeters = parseFloat(height)
    if (heightInMeters > 10) {
      heightInMeters = heightInMeters / 100
    }
    const totalBMI = (weight / (heightInMeters * heightInMeters)).toFixed(2)
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
    if (weight != null && height != null) {
      calculateBMI()
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.formContext}>
        <Text style={styles.title}>BMI Calculator</Text>

        {bmi == null ? (
          <Pressable onPress={Keyboard.dismiss} style={styles.form}>
            <Text style={styles.formLabel}>Height: </Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setHeight}
              value={height}
              placeholder="Ex. 1.70 (Use . or 170)"
              keyboardType="numeric"
              placeholderTextColor="#8A8F98"
              selectionColor="#00ADA2"
            />

            <Text style={styles.formLabel}>Weight: </Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setWeight}
              value={weight}
              placeholder="Ex. 70"
              keyboardType="numeric"
              placeholderTextColor="#8A8F98"
              selectionColor="#00ADA2"
            />

            <TouchableOpacity onPress={validationBMI} style={styles.buttonCalculator}>
              <Text style={styles.textButtonCalculator}>{textButton}</Text>
            </TouchableOpacity>
          </Pressable>
        ) : (
          <View style={styles.exhibitionResultBMI}>
            <ResultBMI messageResultBMI={messageBMI} resultBMI={bmi} />
            <TouchableOpacity onPress={validationBMI} style={styles.buttonCalculator}>
              <Text style={styles.textButtonCalculator}>{textButton}</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.listBMI}
          data={[...BMIList].reverse()}
          renderItem={({ item }) => (
            <Text style={styles.resultBMIItem}>
              <Text style={styles.textResultItemList}>BMI Result: </Text>
              {item.bmi}
            </Text>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  formContext: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#858585",
    alignItems: "center",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 50,
  },
  title: {
    fontSize: 34,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 50,
  },
  form: {
    width: "100%",
    marginTop: 50,
  },
  formLabel: {
    color: "white",
    fontSize: 18,
    paddingLeft: 20,
  },
  input: {
    width: "90%",
    borderRadius: 50,
    backgroundColor: "#FFFFFF", // slightly brighter for contrast
    height: 44,
    margin: 12,
    paddingHorizontal: 14,
    color: "#111111",
  },
  buttonCalculator: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    backgroundColor: "#00ADA2",
    paddingTop: 14,
    paddingBottom: 14,
    marginLeft: 12,
    margin: 30,
  },
  textButtonCalculator: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
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
})
