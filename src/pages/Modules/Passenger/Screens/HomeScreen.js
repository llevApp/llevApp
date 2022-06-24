import React, { useEffect,useState } from 'react'
import { Text, View, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button, Stack, Flex } from "native-base";
import { useNavigation } from '@react-navigation/core';
import { useUserStore } from '../../../Home/Store/StoreHome';
import WidgetUserInfo from '../HomePassenger/Widgets/WidgetUserInfo';
import WidgetUserTrips from '../HomePassenger/Widgets/WidgetUserTrips';
import { Alert, StyleSheet } from 'react-native';
import {hubWebSocket} from '../../../../services/common/hubWebSocket';
import {useStoreMessage} from '../TripDriver/Store/StoreConfirmTrip';

const HomeScreen = () => {
const [nameShow, setNameShow] = useState(null);
const navigation = useNavigation();
/* Function call start trip */
const { name,idUser } = useUserStore();
/* Get ws connection */
const {conection: wsConection, isOpen, setIsOpen} = hubWebSocket();
const{message} = useStoreMessage(({ message }) => ({
    message
  }));
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
      //let ws = new WebSocket(WEB_SOCKET_CHANNEL+idUser);
      //hubWebSocket.getState().setConection(ws);
    }else{
      console.log('Undefined id user');
    }
},[idUser]);
useEffect(()=>{
    console.log(message);
},[message])

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