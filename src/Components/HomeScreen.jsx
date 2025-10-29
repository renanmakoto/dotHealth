import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.appName}>dotHealth</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pick a calculator</Text>
        <Text style={styles.cardSubtitle}>
          Tap an option to get instant insights. Your information never leaves the device.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('BMICalculator')}
        >
          <Text style={styles.primaryLabel}>Body Mass Index (BMI)</Text>
          <Text style={styles.primaryHint}>See where you land on the scale instantly</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('BMRCalculator')}
        >
          <Text style={styles.secondaryLabel}>Basal Metabolic Rate (BMR)</Text>
          <Text style={styles.secondaryHint}>Estimate daily energy burn at rest</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.meta}>
        <Text style={styles.metaText}>No accounts. No ads. Just essentials.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  hero: {
    marginBottom: 32,
  },
  appName: {
    fontSize: 42,
    color: '#00ADA2',
    fontWeight: '700',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111111',
  },
  cardSubtitle: {
    marginTop: 8,
    fontSize: 15,
    color: '#8A8F98',
    lineHeight: 22,
  },
  primaryButton: {
    marginTop: 32,
    backgroundColor: '#00ADA2',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  primaryLabel: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  primaryHint: {
    marginTop: 4,
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.75,
  },
  secondaryButton: {
    marginTop: 16,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: '#00ADA2',
    backgroundColor: '#FFFFFF',
  },
  secondaryLabel: {
    fontSize: 18,
    color: '#00ADA2',
    fontWeight: '600',
  },
  secondaryHint: {
    marginTop: 4,
    fontSize: 13,
    color: '#8A8F98',
  },
  meta: {
    marginTop: 32,
  },
  metaText: {
    fontSize: 14,
    color: '#858585',
    letterSpacing: 0.3,
  },
})
