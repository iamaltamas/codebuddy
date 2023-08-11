import React from 'react'
import LoginPage from './src/page/FirstScreen'
import SecondScreen from './src/page/SecondScreen'
import ThirdScreen from './src/page/ThirdScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='firstScreen'>
      <Stack.Screen name='firstScreen' component={LoginPage}/>
        <Stack.Screen name='secondScreen' component={SecondScreen}/>
        <Stack.Screen name='thirdScreen' component={ThirdScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
