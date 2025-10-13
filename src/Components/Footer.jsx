import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Keyboard } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Footer() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)
  const insets = useSafeAreaInsets()

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true))
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false))
    return () => {
      showSub?.remove()
      hideSub?.remove()
    }
  }, [])

  if (isKeyboardVisible) return null

  return (
    <SafeAreaView edges={['bottom']} style={[styles.footerContainer, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <Text style={styles.footer}>2025 - by dotExtension</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#858585',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
})
