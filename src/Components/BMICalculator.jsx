import React, { useMemo, useState } from "react"
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
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [messageBMI, setMessageBMI] = useState("Fill in with height and weight")
  const [bmi, setBMI] = useState(null)
  const [textButton, setTextButton] = useState("Calculate")
  const [errorMessage, setErrorMessage] = useState("")
  const [BMIList, setBMIList] = useState([])

  const historyData = useMemo(() => [...BMIList].reverse(), [BMIList])

  function calculateBMI() {
    let parsedHeight = parseFloat(height)
    const parsedWeight = parseFloat(weight)

    if (Number.isNaN(parsedHeight) || Number.isNaN(parsedWeight)) {
      setErrorMessage("Use numbers only for height and weight.")
      setBMI(null)
      Vibration.vibrate()
      return false
    }

    if (parsedWeight <= 0) {
      setErrorMessage("Weight must be greater than zero.")
      setBMI(null)
      Vibration.vibrate()
      return false
    }

    if (parsedHeight > 10) {
      parsedHeight = parsedHeight / 100
    }

    if (parsedHeight <= 0) {
      setErrorMessage("Height must be greater than zero.")
      setBMI(null)
      Vibration.vibrate()
      return false
    }

    const totalBMI = (parsedWeight / (parsedHeight * parsedHeight)).toFixed(2)
    const entry = { id: new Date().getTime().toString(), bmi: totalBMI }

    setBMIList((arr) => [...arr, entry])
    setBMI(totalBMI)
    return true
  }

  function verifyBMI() {
    Vibration.vibrate()
    setErrorMessage("Please complete both fields to continue.")
  }

  function validationBMI() {
    if (weight && height) {
      const didCalculate = calculateBMI()
      if (didCalculate) {
        setHeight("")
        setWeight("")
        setMessageBMI("Your BMI is:")
        setTextButton("Calculate again")
        setErrorMessage("")
      }
      return
    }

    verifyBMI()
    setBMI(null)
    setTextButton("Calculate")
    setMessageBMI("Fill in with height and weight")
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={historyData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTap="handled"
        ListHeaderComponent={() => (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>BMI Calculator</Text>
              <Text style={styles.subtitle}>
                Enter your latest measurements to get a quick insight into your body composition.
              </Text>
            </View>

            <Pressable onPress={Keyboard.dismiss} style={styles.formCard}>
              <Text style={styles.sectionLabel}>Personal stats</Text>

              {!!errorMessage && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              )}

              {bmi == null && (
                <>
                  <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Height</Text>
                    <Text style={styles.fieldHelper}>Centimeters or meters · example: 170 or 1.70</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={setHeight}
                      value={height}
                      placeholder="Ex. 170"
                      keyboardType="numeric"
                      placeholderTextColor="#8A8F98"
                      selectionColor="#00ADA2"
                      returnKeyType="next"
                    />
                  </View>

                  <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Weight</Text>
                    <Text style={styles.fieldHelper}>Kilograms · example: 70</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={setWeight}
                      value={weight}
                      placeholder="Ex. 70"
                      keyboardType="numeric"
                      placeholderTextColor="#8A8F98"
                      selectionColor="#00ADA2"
                      returnKeyType="done"
                    />
                  </View>
                </>
              )}

              {bmi != null && (
                <View style={styles.resultContainer}>
                  <ResultBMI messageResultBMI={messageBMI} resultBMI={bmi} />
                </View>
              )}

              <TouchableOpacity onPress={validationBMI} style={styles.primaryButton} activeOpacity={0.85}>
                <Text style={styles.primaryButtonText}>{textButton}</Text>
              </TouchableOpacity>
            </Pressable>

            <View style={styles.historyHeading}>
              <Text style={styles.historyTitle}>Recent results</Text>
              {historyData.length === 0 && (
                <Text style={styles.emptyHistory}>Your history will appear here after the first calculation.</Text>
              )}
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <View>
              <Text style={styles.historyLabel}>BMI</Text>
              <Text style={styles.historyValue}>{item.bmi}</Text>
            </View>
            <Text style={styles.historyMeta}>Saved</Text>
          </View>
        )}
        ListFooterComponent={<View style={styles.footerSpacer} />}
      />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  list: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  listContent: {
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
  formCard: {
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
  errorMessage: {
    marginTop: 12,
    fontSize: 14,
    color: "#FFB6C1",
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
  input: {
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    color: "#111111",
  },
  resultContainer: {
    marginTop: 24,
    alignItems: "center",
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
  historyHeading: {
    marginTop: 36,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  emptyHistory: {
    marginTop: 8,
    fontSize: 14,
    color: "#8A8F98",
  },
  historyItem: {
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  historyLabel: {
    fontSize: 13,
    color: "#8A8F98",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  historyValue: {
    marginTop: 6,
    fontSize: 24,
    color: "#00ADA2",
    fontWeight: "700",
  },
  historyMeta: {
    fontSize: 12,
    color: "#858585",
  },
  footerSpacer: {
    height: 32,
  },
})
