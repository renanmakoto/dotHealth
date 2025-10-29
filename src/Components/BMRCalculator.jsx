import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Vibration,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native"
import { Picker } from "@react-native-picker/picker"

export default function BMRCalculator() {
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [gender, setGender] = useState("male")
  const [bmr, setBmr] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

  const calculateBMR = () => {
    if (!age || !weight || !height) {
      setErrorMessage("Please fill in age, weight, and height to continue.")
      setBmr(null)
      Vibration.vibrate(300)
      return
    }

    const parsedAge = parseFloat(age)
    const parsedWeight = parseFloat(weight)
    let parsedHeight = parseFloat(height)

    if ([parsedAge, parsedWeight, parsedHeight].some((value) => Number.isNaN(value) || value <= 0)) {
      setErrorMessage("Enter valid numerical values greater than zero.")
      setBmr(null)
      Vibration.vibrate(300)
      return
    }

    if (parsedHeight > 10) {
      parsedHeight = parsedHeight / 100
    }

    let bmrValue
    if (gender === "male") {
      bmrValue = 88.362 + 13.397 * parsedWeight + 4.799 * (parsedHeight * 100) - 5.677 * parsedAge
    } else {
      bmrValue = 447.593 + 9.247 * parsedWeight + 3.098 * (parsedHeight * 100) - 4.33 * parsedAge
    }

    setErrorMessage("")
    setBmr(bmrValue.toFixed(2))
    Keyboard.dismiss()
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTap="handled"
          >
            <View style={styles.header}>
              <Text style={styles.title}>BMR Calculator</Text>
              <Text style={styles.subtitle}>
                Estimate how many calories your body needs at rest to stay fueled.
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionLabel}>Personal profile</Text>

              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Gender</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={gender}
                    onValueChange={(value) => setGender(value)}
                    style={styles.picker}
                    dropdownIconColor="#00ADA2"
                  >
                    <Picker.Item label="Male" value="male" color="#111111" />
                    <Picker.Item label="Female" value="female" color="#111111" />
                  </Picker>
                </View>
              </View>

              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Age</Text>
                <Text style={styles.fieldHelper}>Years · example: 29</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Age in years"
                  placeholderTextColor="#8A8F98"
                  keyboardType="numeric"
                  value={age}
                  onChangeText={setAge}
                  returnKeyType="next"
                  selectionColor="#00ADA2"
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Weight</Text>
                <Text style={styles.fieldHelper}>Kilograms · example: 70</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Weight in kg"
                  placeholderTextColor="#8A8F98"
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={setWeight}
                  returnKeyType="next"
                  selectionColor="#00ADA2"
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Height</Text>
                <Text style={styles.fieldHelper}>Centimeters or meters · example: 172 or 1.72</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Height"
                  placeholderTextColor="#8A8F98"
                  keyboardType="numeric"
                  value={height}
                  onChangeText={setHeight}
                  returnKeyType="done"
                  selectionColor="#00ADA2"
                />
              </View>

              {!!errorMessage && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              )}

              <TouchableOpacity
                onPress={calculateBMR}
                style={styles.primaryButton}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryButtonText}>Calculate BMR</Text>
              </TouchableOpacity>
            </View>

            {bmr && (
              <View style={styles.resultCard}>
                <Text style={styles.resultLabel}>Your BMR</Text>
                <Text style={styles.resultValue}>{bmr}</Text>
                <Text style={styles.resultMeta}>kilocalories per day</Text>
              </View>
            )}

            <View style={styles.bottomSpacer} />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    color: "#111111",
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: "#8A8F98",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  sectionLabel: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#858585",
    fontWeight: "600",
  },
  field: {
    marginTop: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  fieldHelper: {
    fontSize: 13,
    color: "#8A8F98",
    marginTop: 4,
  },
  pickerWrapper: {
    marginTop: 12,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#F6F6F6",
  },
  picker: {
    width: "100%",
    height: 52,
    color: "#111111",
  },
  input: {
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    color: "#111111",
  },
  errorMessage: {
    marginTop: 20,
    fontSize: 14,
    color: "#FFB6C1",
    fontWeight: "600",
  },
  primaryButton: {
    marginTop: 28,
    backgroundColor: "#00ADA2",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  resultCard: {
    marginTop: 32,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  resultLabel: {
    fontSize: 13,
    color: "#858585",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  resultValue: {
    marginTop: 12,
    fontSize: 40,
    fontWeight: "700",
    color: "#00ADA2",
    letterSpacing: 1,
  },
  resultMeta: {
    marginTop: 8,
    fontSize: 14,
    color: "#8A8F98",
  },
  bottomSpacer: {
    height: 32,
  },
})
