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
//import {TripScreen as TripsScreenPassenger} from './src/pages/Modules/Passenger/TripDriver/TripScene';
import {TripScreen as TripsScreenPassenger} from './src/pages/Modules/Passenger/TripDriver/TripScene2';
import SceneTripInit from './src/pages/Modules/Driver/TripDriver/SceneTripInit/SceneTripInit';
import {SceneTripInit as SceneTripInitPassenger} from './src/pages/Modules/Passenger/TripDriver/SceneTripInit/SceneTripInit';
/* PASSENGER */
import Passenger from './src/pages/Modules/Passenger/Passenger';
import ChatScreen from './src/pages/Modules/Passenger/Screens/Chat/ChatScreen';
/* ------- */
/* Messages */
import MessagesScreen from './src/pages/Modules/Passenger/Screens/Chat/Messages/MessagesScreen';
import { Button, KeyboardAvoidingView, NativeBaseProvider} from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native-web';
import SceneSelectOrigin from './src/pages/Modules/Driver/TripDriver/SceneSelectOrigin/SceneSelectOrigin';
import BackButton from './src/utils/backButton'

/* Driver */
import ActiveTripScene from './src/pages/Modules/Driver/TripDriver/ActiveTripScene';

const Stack = createNativeStackNavigator();
/* Changes */
export default function App() {
  const HeaderOptionsBack= (screen) => {
    return {
        headerTransparent: true,
        headerLeft: () => (
          <BackButton screenName={screen}/>
        ),
        headerTitle: ""
      }
    }
  
  return (
   
    <NativeBaseProvider>
      <NavigationContainer>
      <SafeAreaProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding": "height"}
        style={{flex:1}}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
      >

      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Splash" component={SplashScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen  options={{ headerShown: false }} name="Register" component={RegisterScene} />
        <Stack.Screen  options={{ headerShown: false }} name="Driver" component={Driver} />
        <Stack.Screen  options= {HeaderOptionsBack("Driver")} name="TripScreen" component={TripScreen} />
        <Stack.Screen  options= {HeaderOptionsBack("TripScreen")} name="SceneTripInit" component={SceneTripInit} />
        <Stack.Screen   options= {HeaderOptionsBack("TripScreen")} name="SceneSelectOrigin" component={SceneSelectOrigin} />
        <Stack.Screen  options={{ headerShown: false }} name="Passenger" component={Passenger} />
        {/* Driver */}
        <Stack.Screen  options= {HeaderOptionsBack("Driver")} name="ActiveTrips" component={ActiveTripScene} />
        {/* passenger */}
        <Stack.Screen  options={{ headerShown: false }} name="ChatScreen" component={ChatScreen} />
        <Stack.Screen  options= {HeaderOptionsBack("Passenger")} name="TripScreenPassenger" component={TripsScreenPassenger} />
        <Stack.Screen  options={{ headerShown: false }} name="SceneTripInitPassenger" component={SceneTripInitPassenger} />
        {/* Messages */}
        <Stack.Screen  options={{ headerShown: false }} name="MessagesScreen" component={MessagesScreen} />
      </Stack.Navigator>
      </KeyboardAvoidingView>
      </SafeAreaProvider>
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
