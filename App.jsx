import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack'
import HomeScreen from './src/Components/HomeScreen'
import BMICalculator from './src/Components/BMICalculator'
import BMRCalculator from './src/Components/BMRCalculator'
import Footer from './src/Components/Footer'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
        />
        <Stack.Screen 
          name="BMICalculator" 
          component={BMICalculator} 
        />
        <Stack.Screen 
          name="BMRCalculator" 
          component={BMRCalculator} 
        />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  )
}