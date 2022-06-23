import React, { useEffect,useState } from 'react'
import { Text, View, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button, Stack, Flex } from "native-base";
import { useNavigation } from '@react-navigation/core';
import { useUserStore } from '../../../Home/Store/StoreHome';
import WidgetUserInfo from '../HomePassenger/Widgets/WidgetUserInfo';
import WidgetUserTrips from '../HomePassenger/Widgets/WidgetUserTrips';
import { Alert, StyleSheet } from 'react-native';
import {hubWebSocket} from '../../../../services/common/hubWebSocket';
import {WEB_SOCKET_CHANNEL} from "@env";
const HomeScreen = () => {
const [nameShow, setNameShow] = useState(null);
const navigation = useNavigation();
/* Function call start trip */
const { name,idUser } = useUserStore();
/* Get ws connection */
const {conection: wsConection, isOpen, setIsOpen} = hubWebSocket();
const initTrip = ()=>{
    navigation.replace("TripScreenPassenger");
};
useEffect(()=>{
    if(name){
    setNameShow(name);
    console.log('Estamos en vista Pasajero');
  }
}),[name];
  /* When get the user id, open ws */
  useEffect(()=>{
    /* Create Connection with WS */
    if(idUser){
      let ws = new WebSocket(WEB_SOCKET_CHANNEL+idUser);
      hubWebSocket.getState().setConection(ws);
    }else{
      console.log('Undefined id user');
    }
},[idUser]);
useEffect(()=>{
  if(wsConection){
    wsConection.onopen = () => {
      // connection opened
      setIsOpen(true);
    };
    wsConection.onmessage = (e) => {
      // a message was received
      console.log(e.data);
    };
    wsConection.onerror = (e) => {
      // an error occurred
      Alert.alert('Error in WS, '+ e.message);
    };
    
    wsConection.onclose = (e) => {
      // connection closed
      //console.log(e.code, e.reason);
      Alert.alert(e.code +' ' +e.reason);
    };
  }

},[wsConection]);
/* useEffect(() => {
    if (wsConection) {
      wsConection?.onopen = () => {
        setIsOpen(true);
        console.log('Connected to the server')
       wsConection?.send(`
          {
            "request":{
                "trip_id":110,
                "user_id":2,
                "latitude":-11.2212,
                "longitude":-12.222,
                "contribution":90
            }
          }
      `); 
      };
      wsConection?.onclose = (e) => {
        setIsOpen(false);
        console.log('Disconnected. Check internet or server.')
        console.log(e);
      };
      wsConection?.onerror = (e) => {
        console.log(e.message);
      };
      wsConection?.onmessage = (e) => {
        console.log(e.data);
        hubWebSocket.getState().setMessages(e.data);
      };
      console.log(isOpen)
    }
  }, [wsConection]); */
return (
        <View style={styles.mainContainer}>
            <NativeBaseProvider bg="#FFF" style={{flex: 1, justifyContent: "space-evenly", alignItems: "center", }}>
    <Flex >
        <VStack style={styles.widgets} space={5}>
            <WidgetUserInfo style={styles.userInfo}/>
            <WidgetUserTrips style={styles.tripsInfo}/>
        </VStack>
      
    </Flex>
    </NativeBaseProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        //minWidth:'100%', 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    widgets: {
        alignItems:'center',
        marginBottom: 10,
        flex:1,
    },
    userInfo: {
        maxHeight:'10px', 
        marginBottom:'10px',
    },
    tripsInfo: {
        padding:10,
        marginTop:10,
        flex:1,
    },
});

export default HomeScreen;