import React, { useEffect, useState } from 'react'
import { Text, View, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button, Stack, Flex } from "native-base";
import { useNavigation } from '@react-navigation/core';
import { useUserStore } from '../../../Home/Store/StoreHome';
import { useTripsStore } from './StoreTrip/StoreTrips';
import WidgetUserInfo from '../HomeDriver/Widgets/WidgetUserInfo';
import WidgetUserTrips from '../HomeDriver/Widgets/WidgetUserTrips';
import { StyleSheet } from 'react-native';
import { hubWebSocket } from '../../../../services/common/hubWebSocket';
import { Alert, Modal } from 'react-native-web';
import {WEB_SOCKET_CHANNEL} from "@env";

import {WEB_SOCKET_CHANNEL} from "@env";
const HomeScreen = () => {
const [nameShow, setNameShow] = useState(null);
const navigation = useNavigation();
/* Function call start trip */
const {idUser, name } = useUserStore();
/* Get ws connection */

const {conection: wsConection, isOpen, setIsOpen,messages} = hubWebSocket();
useEffect(()=>{
    useTripsStore.getState().setTripsPassenger(idUser);
},[idUser]);

useEffect(()=>{
    if(name){
    setNameShow(name);
    /*  */
    console.log('Estamos en vista driver');
  }
}),[name];
  /* When get the user id, open ws */
  useEffect(()=>{
    /* Create Connection with WS */
    console.log(idUser);
    if(idUser){
      let ws = new WebSocket(WEB_SOCKET_CHANNEL+idUser);
      hubWebSocket.getState().setConection(ws);
      console.log('CACAAAAA');
    }else{
      console.log('Undefined id user');
    }
},[idUser]);
const initTrip = ()=>{
    navigation.replace("TripScreen");
};
useEffect(()=>{
    if(name){
    setNameShow(name);
  }
}),[name];
useEffect(()=>{
  if(wsConection){
    wsConection.onopen = () => {
      // connection opened
      setIsOpen(true);
    };
    wsConection.onmessage = (e) => {
      // a message was received
      console.log(e.data);
      Example();
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
        Alert.alert(e.data);
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
useEffect(()=>{
    console.log('Mensaje WS: ', messages);
    //hubWebSocket.getState().clearMessages();
}),[messages];
 */
//console.log('store: ',hubWebSocket.getState());

const [modalVisible, setModalVisible] = useState(true);

return (
        <View style={styles.mainContainer}>
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      ><Text>Hide Modal</Text></Modal>
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



const Example = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </View>
    );
  };