import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDER_RADIUS,
  SHADOWS,
} from '../constants'

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
    width: '100%',
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.background,
    paddingVertical: SPACING.xxl + 4,
    paddingHorizontal: SPACING.xxl,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  badge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.primary,
  },
  badgeText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: 0.6,
  },
  message: {
    marginTop: SPACING.lg,
    fontSize: FONT_SIZES.xl,
    color: COLORS.textSecondary,
  },
  value: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.hero,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    letterSpacing: 1,
  },
})
