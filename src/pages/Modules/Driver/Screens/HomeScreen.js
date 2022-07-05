import React, { useEffect, useState } from 'react'
import { View, NativeBaseProvider, VStack, Flex ,Button,Modal,Center,Text} from "native-base";
import { useNavigation } from '@react-navigation/core';
import { useUserStore } from '../../../Home/Store/StoreHome';
import { useTripsStore } from './StoreTrip/StoreTrips';
import WidgetUserInfo from '../HomeDriver/Widgets/WidgetUserInfo';
import WidgetUserTrips from '../HomeDriver/Widgets/WidgetUserTrips';
import { StyleSheet } from 'react-native';
import { hubWebSocket } from '../../../../services/common/hubWebSocket';
import { Alert } from 'react-native-web';
import {WEB_SOCKET_CHANNEL} from "@env";
import RefreshControl from '../../../../utils/refreshControl';
import Loader from 'react-native-modal-loader';


const HomeScreen = () => {
const [nameShow, setNameShow] = useState(null);
const navigation = useNavigation();
const [showModal, setShowModal] = useState(false);
const {idUser, name} = useUserStore();
const {conection: wsConection, isOpen, setIsOpen,messages,setMessages} = hubWebSocket();
const [disableTouchView, setDisableTouchView] = useState(true)

useEffect(()=>{
    useTripsStore.getState().setTripsPassenger(idUser);
    if (idUser) {
      setDisableTouchView(false)
    } else {
      setDisableTouchView(true)
    }
},[idUser]);

useEffect(()=>{
    if(name){
    setNameShow(name);
  }
}),[name];

useEffect(()=>{
    /* Create Connection with WS */
    if(idUser){
      let ws = new WebSocket(WEB_SOCKET_CHANNEL+idUser);
      hubWebSocket.getState().setConection(ws);
    }else{
      //Undefined id user;
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
        const json = JSON.parse(e.data);
        if(json?.request){
          setMessages(json?.request);
          setShowModal(true);
        }
      };
      wsConection.onerror = (e) => {
        // an error occurred
        console.log('Error in WS, '+ e.message);
      };
      
      wsConection.onclose = (e) => {
        // connection closed
        console.log(e.code +' ' +e.reason);
      };
    }
  
},[wsConection]);

useEffect(()=>{
    //hubWebSocket.getState().clearMessages();
}),[messages];


return (
        <View style={styles.mainContainer} pointerEvents= {disableTouchView ? "none" : "auto"}> 
          <Loader loading={disableTouchView} color="#159A9C" opacity={"0.5"} size={"large"} title={"Cargando..."}/>
          <RefreshControl>

          <NativeBaseProvider bg="#FFF" style={{flex: 1, justifyContent: "space-evenly", alignItems: "center", }}>
          <Flex >
              <VStack style={styles.widgets} space={5}>
                  <WidgetUserInfo style={styles.userInfo}/>
                  <WidgetUserTrips style={styles.tripsInfo}/>
              </VStack>
          </Flex>
          </NativeBaseProvider>
          </RefreshControl>
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