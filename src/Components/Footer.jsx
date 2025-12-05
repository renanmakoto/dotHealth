import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Keyboard } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS, FONT_WEIGHTS, APP_INFO } from '../constants'

export default function Footer() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)
  const insets = useSafeAreaInsets()

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true)
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false)
    })

    return () => {
      showSubscription?.remove()
      hideSubscription?.remove()
    }
  }, [])

  if (isKeyboardVisible) {
    return null
  }

  const bottomPadding = Math.max(insets.bottom - 24, 0)

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.container, { paddingBottom: bottomPadding }]}
    >
      <Text style={styles.text}>
        {APP_INFO.year} · by {APP_INFO.author}
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    marginBottom: 0,
  },
  text: {
    color: COLORS.textMuted,
    fontWeight: FONT_WEIGHTS.semiBold,
    letterSpacing: 0.4,
  },
})
