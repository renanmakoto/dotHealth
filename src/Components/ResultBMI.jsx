import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ResultBMI({ messageResultBMI, resultBMI }) {
  if (!resultBMI) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>BMI</Text>
      </View>
      <Text style={styles.message}>{messageResultBMI}</Text>
      <Text style={styles.value}>{resultBMI}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 24,
    backgroundColor: "#F6F6F6",
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#00ADA2",
  },
  badgeText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: "#8A8F98",
  },
  value: {
    marginTop: 12,
    fontSize: 40,
    fontWeight: "700",
    color: "#00ADA2",
    letterSpacing: 1,
  },
})
