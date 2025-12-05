import React, { useMemo, useState, useCallback } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Vibration,
} from 'react-native'

import {
  Button,
  Card,
  ErrorMessage,
  InputField,
  ScreenHeader,
  SectionLabel,
} from './common'
import ResultBMI from './ResultBMI'
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDER_RADIUS,
  SHADOWS,
  MESSAGES,
} from '../constants'
import {
  calculateBMI,
  validateBMIInputs,
  generateId,
} from '../utils/calculations'

export default function BMICalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  
  const [bmi, setBMI] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  
  const [bmiHistory, setBmiHistory] = useState([])

  const messageBMI = bmi ? MESSAGES.BMI.RESULT : MESSAGES.BMI.INITIAL
  const buttonText = bmi ? MESSAGES.BUTTONS.CALCULATE_AGAIN : MESSAGES.BUTTONS.CALCULATE
  const historyData = useMemo(() => [...bmiHistory].reverse(), [bmiHistory])

  const resetForm = useCallback(() => {
    setHeight('')
    setWeight('')
    setBMI(null)
    setErrorMessage('')
  }, [])

  const handleCalculate = useCallback(() => {
    if (bmi !== null) {
      resetForm()
      return
    }

    const validation = validateBMIInputs(height, weight)

    if (!validation.isValid) {
      setErrorMessage(validation.error)
      setBMI(null)
      Vibration.vibrate()
      return
    }

    const calculatedBMI = calculateBMI(validation.parsedWeight, validation.parsedHeight)
    const entry = { id: generateId(), bmi: calculatedBMI }

    setBmiHistory((prev) => [...prev, entry])
    setBMI(calculatedBMI)
    setErrorMessage('')
    Keyboard.dismiss()
  }, [bmi, height, weight, resetForm])

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ScreenHeader
          title="BMI Calculator"
          subtitle="Enter your latest measurements to get a quick insight into your body composition."
        />

        <Pressable onPress={Keyboard.dismiss}>
          <Card>
            <SectionLabel>Personal stats</SectionLabel>

            <ErrorMessage message={errorMessage} />

            {bmi === null ? (
              <>
                <InputField
                  label="Height"
                  helperText="Centimeters or meters · example: 170 or 1.70"
                  placeholder="Ex. 170"
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="numeric"
                  returnKeyType="next"
                />

                <InputField
                  label="Weight"
                  helperText="Kilograms · example: 70"
                  placeholder="Ex. 70"
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                  returnKeyType="done"
                />
              </>
            ) : (
              <View style={styles.resultContainer}>
                <ResultBMI messageResultBMI={messageBMI} resultBMI={bmi} />
              </View>
            )}

            <Button
              title={buttonText}
              onPress={handleCalculate}
              style={styles.calculateButton}
            />
          </Card>
        </Pressable>

        <HistorySection data={historyData} />

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

function HistorySection({ data }) {
  return (
    <View style={styles.historySection}>
      <Text style={styles.historyTitle}>{MESSAGES.HISTORY.TITLE}</Text>
      
      {data.length === 0 ? (
        <Text style={styles.emptyHistory}>{MESSAGES.HISTORY.EMPTY}</Text>
      ) : (
        data.map((item) => <HistoryItem key={item.id} item={item} />)
      )}
    </View>
  )
}

function HistoryItem({ item }) {
  return (
    <View style={styles.historyItem}>
      <View>
        <Text style={styles.historyLabel}>BMI</Text>
        <Text style={styles.historyValue}>{item.bmi}</Text>
      </View>
      <Text style={styles.historyMeta}>Saved</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xxl,
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.xxl,
  },
  resultContainer: {
    marginTop: SPACING.xxl,
    alignItems: 'center',
  },
  calculateButton: {
    marginTop: SPACING.xxl + 4,
  },
  historySection: {
    marginTop: 36,
  },
  historyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textPrimary,
  },
  emptyHistory: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  historyItem: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg + 2,
    paddingHorizontal: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...SHADOWS.sm,
  },
  historyLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  historyValue: {
    marginTop: 6,
    fontSize: FONT_SIZES.hero - 16,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.bold,
  },
  historyMeta: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
  },
  bottomSpacer: {
    height: SPACING.xxxl,
  },
})
