import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../../constants/theme'

export default function ErrorMessage({ message, style }) {
  if (!message) return null
  
  return <Text style={[styles.error, style]}>{message}</Text>
}

const styles = StyleSheet.create({
  error: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.error,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
})
