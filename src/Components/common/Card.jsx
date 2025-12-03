import React from 'react'
import { View, StyleSheet } from 'react-native'
import { COLORS, BORDER_RADIUS, SPACING, SHADOWS } from '../../constants/theme'

export default function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xxl,
    ...SHADOWS.lg,
  },
})
