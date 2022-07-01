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

const ResponseRequest = () =>{
    wsConection?.send(`
      {
        "response":{
            "status":"accepted",
            "trip_id":${messages.tripId},
            "user_id":${messages.userId}
        }
      }
  `);
};
const ResponseDeclinedRequest = () =>{
  wsConection?.send(`
    {
      "response":{
          "status":"declined",
          "trip_id":${messages.tripId},
          "user_id":${messages.userId}
      }
    }
`);
};

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
        console.log('VIENE DESDE CONDUCTOR',e.data)
        setMessages(e.data);
        setShowModal(true);
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
    //console.log('Mensaje WS: ', messages);
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



          <Modal isOpen={showModal} onClose={() => setShowModal(false)} >
                    <Modal.Content maxWidth="400px" bgColor={"#FFFFF9"} color={"#FFFFF9" }>
                      <Modal.CloseButton />
                      <Modal.Header>Solicitud de viaje</Modal.Header>
                      <Modal.Body _scrollview={{scrollEnabled:false}}>
                      <VStack style={styles.widgets} space={2}>
                        <VStack direction="row" space={3}>
                          <Text>{messages?.name}</Text>
                        </VStack>
                        <VStack direction="row" space={3}>
                          <Text>Ubicación:</Text>
                          <Text>{messages?.location}</Text>
                        </VStack>
                        <VStack direction="row" space={1} >
                          <Text>Contribución:</Text>
                          <Text>{messages?.contribution}</Text>
                        </VStack>
                      </VStack>
                      <Button flex="1" colorScheme="green" onPress={() => {
                        ResponseRequest();
                        setShowModal(false);
                      }}>
                        Aceptar
                      </Button>
                      <Button variant="ghost" colorScheme="red" onPress={() => {
                        ResponseDeclinedRequest();
                        setShowModal(false);
                      }}>
                        Cancelar
                      </Button>
                      </Modal.Body>
                    </Modal.Content>
          </Modal>
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