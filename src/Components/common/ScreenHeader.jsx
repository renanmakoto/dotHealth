import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../../constants/theme'

export default function ScreenHeader({ title, subtitle, style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.xxl,
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.title,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZES.lg,
    lineHeight: 22,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
})
