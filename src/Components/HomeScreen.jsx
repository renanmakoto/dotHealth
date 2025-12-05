import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Button, Card } from './common'
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS,
  SCREENS,
  APP_INFO,
} from '../constants'

export default function HomeScreen({ navigation }) {
  const navigateTo = (screen) => () => navigation.navigate(screen)

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.appName}>{APP_INFO.name}</Text>
      </View>

      <Card>
        <Text style={styles.cardTitle}>Pick a calculator</Text>
        <Text style={styles.cardSubtitle}>
          Tap an option to get instant insights. Your information never leaves the device.
        </Text>

        <Button
          title="Body Mass Index (BMI)"
          subtitle="See where you land on the scale instantly"
          onPress={navigateTo(SCREENS.BMI_CALCULATOR)}
          variant="primary"
          style={styles.primaryButton}
        />

        <Button
          title="Basal Metabolic Rate (BMR)"
          subtitle="Estimate daily energy burn at rest"
          onPress={navigateTo(SCREENS.BMR_CALCULATOR)}
          variant="secondary"
          style={styles.secondaryButton}
        />
      </Card>

      <View style={styles.meta}>
        <Text style={styles.metaText}>No accounts. Just essentials.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.xxl,
    paddingTop: 48,
    paddingBottom: SPACING.xxxl,
  },
  hero: {
    marginBottom: SPACING.xxxl,
    alignItems: 'center',
  },
  appName: {
    fontSize: FONT_SIZES.appName,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: 1,
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
  },
  cardSubtitle: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  primaryButton: {
    marginTop: SPACING.xxxl,
  },
  secondaryButton: {
    marginTop: SPACING.lg,
  },
  meta: {
    marginTop: SPACING.xxxl,
  },
  metaText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textMuted,
    letterSpacing: 0.3,
  },
})
