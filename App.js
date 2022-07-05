import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,useRef} from 'react';
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
import ChatScreenDriver from './src/pages/Modules/Driver/Screens/Chat/ChatScreen';
/* ------- */
/* Messages */
import MessagesScreen from './src/pages/Modules/Passenger/Screens/Chat/Messages/MessagesScreen';
import  MessagesScreenDriver from './src/pages/Modules/Driver/Screens/Chat/Messages/MessagesScreen';
import { Button, KeyboardAvoidingView, NativeBaseProvider} from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native-web';
import SceneSelectOrigin from './src/pages/Modules/Driver/TripDriver/SceneSelectOrigin/SceneSelectOrigin';
import BackButton from './src/utils/backButton';
import { storeApp } from './storeApp';
import{hubWebSocket} from './src/services/common/hubWebSocket';
import{useUserStore} from './src/pages/Home/Store/StoreHome';
import * as Notifications from 'expo-notifications';
/* Driver */
import ActiveTripScene from './src/pages/Modules/Driver/TripDriver/ActiveTripScene';

const Stack = createNativeStackNavigator();
/* Changes */
// First, set the handler that will cause the notification
// to show the alert

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

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
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const{pushNotification} = storeApp();
  const {idUser}=useUserStore();
  const {messages,messagesPassenger}=hubWebSocket();
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  async function registerForPushNotificationsAsync() {
    let token;
    if (true) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
          },
        });
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    }
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }
  async function schedulePushNotification(titleMessage,bodyMessage,dataMessage) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: titleMessage+"📬",
        body: bodyMessage,
        data: { data: dataMessage },
      },
      trigger: { seconds: 2 },
    });
  }
  useEffect(()=>{
    if(idUser){
    if(messages){
      console.log('Desde app mensajes para driver:',idUser,messages);
     
         schedulePushNotification('LLEVAPP ',messages?.name+' te contribuye con '+messages?.contribution+', aceptas ?',messages?.name+' te contribuye con '+messages?.contribution+', aceptas?');
      
    }else if(messagesPassenger){
      console.log('Desde app mensajes pasajeros:',idUser,messagesPassenger);
      let result = messagesPassenger?.status == 'accepted' ? 'aceptado' :'rechazado';
      schedulePushNotification('LLEVAPP ','Tu solicitud de viaje ha sido '+result,'Tu solicitud de viaje ha sido '+result);
    }
    }
  },[idUser,messages,messagesPassenger]);
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
        <Stack.Screen  options= {HeaderOptionsBack("Login")} name="Register" component={RegisterScene} />
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
        {/* Messages from passenget*/}
        <Stack.Screen  options={{ headerShown: false }} name="MessagesScreen" component={MessagesScreen} />
        {/* Messages from DRIVER*/}
        <Stack.Screen  options={{ headerShown: false }} name="MessagesScreenDriver" component={MessagesScreenDriver} />
        <Stack.Screen  options={{ headerShown: false }} name="ChatScreenDriver" component={ChatScreenDriver} />
      </Stack.Navigator>
{/*       <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      /> */}
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
