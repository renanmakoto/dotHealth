export const COLORS = {
  primary: '#00ADA2',
  primaryLight: '#00D6D6',
  background: '#F6F6F6',
  surface: '#FFFFFF',
  textPrimary: '#111111',
  textSecondary: '#8A8F98',
  textMuted: '#858585',
  error: '#FF6B6B',
  errorLight: '#FFB6C1',
  success: '#4CAF50',
  white: '#FFFFFF',
  black: '#000000',
  shadow: '#000000',
}

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
}

export const FONT_SIZES = {
  xs: 12,
  sm: 13,
  md: 14,
  lg: 15,
  xl: 16,
  xxl: 18,
  xxxl: 20,
  title: 32,
  hero: 40,
  appName: 42,
}

export const FONT_WEIGHTS = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
}

export const BORDER_RADIUS = {
  sm: 12,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 28,
}

export const SHADOWS = {
  sm: {
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  md: {
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  lg: {
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
}

export const COMMON_STYLES = {
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xxl,
    ...SHADOWS.lg,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg + 2,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: FONT_SIZES.xxl,
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.bold,
  },
  input: {
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg + 2,
    paddingVertical: SPACING.lg,
    fontSize: FONT_SIZES.xl,
    color: COLORS.textPrimary,
  },
  sectionLabel: {
    fontSize: FONT_SIZES.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: COLORS.textMuted,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  screenTitle: {
    fontSize: FONT_SIZES.title,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.bold,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  screenSubtitle: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZES.lg,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },
}
