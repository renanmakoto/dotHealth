import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>dotHealth</Text>
      <Text style={styles.subtitle}>Choose one of the options to calculate</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BMICalculator')}
      >
        <Text style={styles.buttonText}>Body Mass Index (BMI)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.bmrButton]}
        onPress={() => navigation.navigate('BMRCalculator')}
      >
        <Text style={styles.buttonText}>Basal Metabolic Rate (BMR)</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#858585',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  title: {
    fontSize: 54,
    color: '#00ADA2',
    fontWeight: 'bold',
    marginTop: -200,
    marginBottom: 200
  },
  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00ADA2',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  bmrButton: {
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})