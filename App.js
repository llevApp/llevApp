import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/pages/Login/LoginScene';
import HomeScreen from './src/pages/Home/HomeScreen';
import SplashScreen from './src/pages/Home/SplashScreen'
import Driver from './src/pages/Modules/Driver/Driver' 
import RegisterScene from './src/pages/Register/RegisterScene';
import TripScreen from './src/pages/Modules/Driver/TripDriver/TripScene';
import { NativeBaseProvider} from 'native-base';
const Stack = createNativeStackNavigator();
/* Changes */
export default function App() {
  return (
    <NativeBaseProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Splash" component={SplashScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen  options={{ headerShown: false }} name="Register" component={RegisterScene} />
        <Stack.Screen  options={{ headerShown: false }} name="Driver" component={Driver} />
        <Stack.Screen  options={{ headerShown: false }} name="TripScreen" component={TripScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
