import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { COLORS, FONT_SIZES, FONT_WEIGHTS } from '../../constants/theme'

export default function SectionLabel({ children, style }) {
  return <Text style={[styles.label, style]}>{children}</Text>
}

const styles = StyleSheet.create({
  label: {
    fontSize: FONT_SIZES.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: COLORS.textMuted,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
})
