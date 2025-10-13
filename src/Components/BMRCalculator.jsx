import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, Vibration } from 'react-native'
import { Picker } from '@react-native-picker/picker'

export default function BMRCalculator() {
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [gender, setGender] = useState('male')
  const [bmr, setBmr] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const calculateBMR = () => {
    Keyboard.dismiss()
    
    // Validate that all fields are filled
    if (!age || !weight || !height) {
      setErrorMessage('Please fill in all fields (age, weight, and height) to calculate your BMR.')
      setBmr(null)
      // Add vibration feedback
      Vibration.vibrate(500)
      return
    }

    // Clear any previous error message
    setErrorMessage('')
    
    let heightInMeters = parseFloat(height)
    if (heightInMeters > 10) {
      heightInMeters = heightInMeters / 100
    }

    let bmrValue
    if (gender === 'male') {
      bmrValue = 88.362 + (13.397 * parseFloat(weight)) + (4.799 * heightInMeters * 100) - (5.677 * parseFloat(age))
    } else {
      bmrValue = 447.593 + (9.247 * parseFloat(weight)) + (3.098 * heightInMeters * 100) - (4.330 * parseFloat(age))
    }
    setBmr(bmrValue.toFixed(2))
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Text style={styles.title}>BMR Calculator</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            style={[styles.picker, { color: '#000' }]} // picker text color
            dropdownIconColor="#000"  // icon color (Android)
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Male" value="male" color="#000" />
            <Picker.Item label="Female" value="female" color="#000" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Age (years)"
          placeholderTextColor="#9AA0A6"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          placeholderTextColor="#9AA0A6"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          placeholderTextColor="#9AA0A6"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />

        <TouchableOpacity onPress={calculateBMR} style={styles.button}>
          <Text style={styles.buttonText}>CALCULATE BMR</Text>
        </TouchableOpacity>

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        {bmr && (
          <Text style={styles.result}>Your BMR is: {bmr} kcal/day</Text>
        )}
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#858585',
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 50,
  },
  title: {
    fontSize: 34,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
  },
  pickerContainer: {
    width: '80%',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'gray',
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 30,
  },
  picker: {
    width: '100%',
    height: 50,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: '#F6F6F6',
    color: '#000',  // text color for inputs
  },
  button: {
    backgroundColor: '#00ADA2',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  errorMessage: {
    marginTop: 20,
    fontSize: 16,
    color: '#FFB6C1',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
})
