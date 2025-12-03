import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { COLORS, BORDER_RADIUS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../../constants/theme'

export default function Button({
  title,
  subtitle,
  onPress,
  variant = 'primary',
  style,
  disabled = false,
}) {
  const isPrimary = variant === 'primary'
  
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled}
      style={[
        styles.button,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton,
        style,
      ]}
    >
      <Text style={[styles.label, isPrimary ? styles.primaryLabel : styles.secondaryLabel]}>
        {title}
      </Text>
      {subtitle && (
        <Text style={[styles.hint, isPrimary ? styles.primaryHint : styles.secondaryHint]}>
          {subtitle}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg + 2,
    paddingHorizontal: SPACING.xl,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
  label: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  primaryLabel: {
    color: COLORS.white,
  },
  secondaryLabel: {
    color: COLORS.primary,
  },
  hint: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZES.sm,
  },
  primaryHint: {
    color: COLORS.white,
    opacity: 0.75,
  },
  secondaryHint: {
    color: COLORS.textSecondary,
  },
})
