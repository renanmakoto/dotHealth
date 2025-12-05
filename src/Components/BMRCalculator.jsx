import React, { useRef, useState, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Vibration,
  ScrollView,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'

import {
  Button,
  Card,
  ErrorMessage,
  InputField,
  ScreenHeader,
  SectionLabel,
} from './common'
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDER_RADIUS,
  SHADOWS,
  GENDER_OPTIONS,
  MESSAGES,
} from '../constants'
import { calculateBMR, validateBMRInputs } from '../utils/calculations'

export default function BMRCalculator() {
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [gender, setGender] = useState(GENDER_OPTIONS.MALE)
  
  const [bmr, setBmr] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  
  const scrollViewRef = useRef(null)

  const handleCalculate = useCallback(() => {
    const validation = validateBMRInputs({ age, weight, height })

    if (!validation.isValid) {
      setErrorMessage(validation.error)
      setBmr(null)
      Vibration.vibrate(300)
      return
    }

    const calculatedBMR = calculateBMR({
      age: validation.parsed.age,
      weight: validation.parsed.weight,
      height: validation.parsed.height,
      gender,
    })

    setErrorMessage('')
    setBmr(calculatedBMR)
    Keyboard.dismiss()

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 150)
  }, [age, weight, height, gender])

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          onScrollBeginDrag={Keyboard.dismiss}
        >
          <ScreenHeader
            title="BMR Calculator"
            subtitle="Estimate how many calories your body needs at rest to stay fueled."
          />

          <Card>
            <SectionLabel>Personal profile</SectionLabel>

            <GenderPicker value={gender} onValueChange={setGender} />

            <InputField
              label="Age"
              helperText="Years · example: 29"
              placeholder="Age in years"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              returnKeyType="next"
            />

            <InputField
              label="Weight"
              helperText="Kilograms · example: 70"
              placeholder="Weight in kg"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              returnKeyType="next"
            />

            <InputField
              label="Height"
              helperText="Centimeters or meters · example: 172 or 1.72"
              placeholder="Height"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              returnKeyType="done"
            />

            <ErrorMessage message={errorMessage} style={styles.errorMessage} />

            <Button
              title={MESSAGES.BUTTONS.CALCULATE_BMR}
              onPress={handleCalculate}
              style={styles.calculateButton}
            />
          </Card>

          {bmr && <BMRResult value={bmr} />}

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

function GenderPicker({ value, onValueChange }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>Gender</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor={COLORS.primary}
        >
          <Picker.Item label="Male" value={GENDER_OPTIONS.MALE} color={COLORS.textPrimary} />
          <Picker.Item label="Female" value={GENDER_OPTIONS.FEMALE} color={COLORS.textPrimary} />
        </Picker>
      </View>
    </View>
  )
}

function BMRResult({ value }) {
  return (
    <View style={styles.resultCard}>
      <Text style={styles.resultLabel}>Your BMR</Text>
      <Text style={styles.resultValue}>{value}</Text>
      <Text style={styles.resultMeta}>kilocalories per day</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xxl,
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.xxl,
  },
  field: {
    marginTop: SPACING.xl,
  },
  fieldLabel: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
  },
  pickerWrapper: {
    marginTop: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLORS.background,
  },
  picker: {
    width: '100%',
    height: 52,
    color: COLORS.textPrimary,
  },
  errorMessage: {
    marginTop: SPACING.xl,
  },
  calculateButton: {
    marginTop: SPACING.xxl + 4,
  },
  resultCard: {
    marginTop: SPACING.xxxl,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    paddingVertical: SPACING.xxl + 4,
    paddingHorizontal: SPACING.xxl,
    alignItems: 'center',
    ...SHADOWS.md,
  },
  resultLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  resultValue: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.hero,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
    letterSpacing: 1,
  },
  resultMeta: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  bottomSpacer: {
    height: SPACING.xxxl,
  },
})
