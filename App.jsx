import React from 'react'
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import { StatusBar, View, StyleSheet } from 'react-native'

import HomeScreen from './src/Components/HomeScreen'
import BMICalculator from './src/Components/BMICalculator'
import BMRCalculator from './src/Components/BMRCalculator'
import Footer from './src/Components/Footer'
import { COLORS, SCREENS } from './src/constants'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false,
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
}

const screens = [
  { name: SCREENS.HOME, component: HomeScreen },
  { name: SCREENS.BMI_CALCULATOR, component: BMICalculator },
  { name: SCREENS.BMR_CALCULATOR, component: BMRCalculator },
]

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={SCREENS.HOME}
            screenOptions={screenOptions}
          >
            {screens.map(({ name, component }) => (
              <Stack.Screen key={name} name={name} component={component} />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
        <Footer />
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
})
