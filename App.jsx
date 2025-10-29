import React from 'react'
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack'
import { StatusBar, View, StyleSheet } from 'react-native'
import HomeScreen from './src/Components/HomeScreen'
import BMICalculator from './src/Components/BMICalculator'
import BMRCalculator from './src/Components/BMRCalculator'
import Footer from './src/Components/Footer'

const Stack = createStackNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#F6F6F6"
      />
      <View style={styles.appContainer}>
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
        </NavigationContainer>
        <Footer />
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
})
