import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ResultBMI({ messageResultBMI, resultBMI }) {
  return (
    <View style={styles.result}>
      <View style={styles.resultBG}>
        <Text style={styles.message}>{messageResultBMI}</Text>
        <Text style={styles.resultNumber}>{resultBMI}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  result: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultBG: {
    backgroundColor: '#b9b9b9',
    width: 300,
    borderRadius: 150,
    height: 150,
  },
  message: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },
  resultNumber: {
    fontSize: 48,
    color: '#00ADA2',
    fontWeight: 'bold',
    textAlign: 'center'
  },
})