import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { COLORS, BORDER_RADIUS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../../constants/theme'

export default function InputField({
  label,
  helperText,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  returnKeyType = 'next',
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      {helperText && <Text style={styles.helper}>{helperText}</Text>}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        selectionColor={COLORS.primary}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.xl,
  },
  label: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
  },
  helper: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  input: {
    marginTop: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg + 2,
    paddingVertical: SPACING.lg,
    fontSize: FONT_SIZES.xl,
    color: COLORS.textPrimary,
  },
})
