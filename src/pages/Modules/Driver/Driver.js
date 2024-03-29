/* import FooterTab from '../../../ui/FooterTab/FooterTab'
import HomeDriver from '../../../pages/Modules/Driver/HomeDriver/HomeDriver' */
import React, { useEffect, useState } from 'react'
import { View, NativeBaseProvider, VStack, Flex ,Button,Modal,Center,Text} from "native-base";
import { useNavigation } from '@react-navigation/core';
import { useUserStore } from '../../Home/Store/StoreHome';
import { useTripsStore } from './Screens/StoreTrip/StoreTrips';
import { hubWebSocket } from '../../../services/common/hubWebSocket';
import { Alert } from 'react-native-web';
import {WEB_SOCKET_CHANNEL} from "@env";
import MainContainer from './MainContainer'
import { StyleSheet } from 'react-native';
import { useStoreDriver } from './DriverStore';
/* import { Text } from 'native-base' */



const Driver = ()=>{

    const [nameShow, setNameShow] = useState(null);
    const navigation = useNavigation();
    const {showModal, setShowModal} = useStoreDriver()
    const {idUser, name} = useUserStore();
    const {conection: wsConection, isOpen, setIsOpen,messages,setMessages} = hubWebSocket();
    const [disableTouchView, setDisableTouchView] = useState(true)

    const ResponseRequest = () =>{
    hubWebSocket.getState().clearMessagesPassenger();
    hubWebSocket.getState().clearMessages();
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
    hubWebSocket.getState().clearMessagesPassenger();
    hubWebSocket.getState().clearMessages();
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
        //'Undefined id user'
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
            let isMounted = true;
            if(json?.request){
            setMessages(json?.request);

            if (isMounted) {
                setShowModal(true);

            }
            isMounted = false
            }
        };
        wsConection.onerror = (e) => {
            // an error occurred
            Alert.alert('Error in WS, '+ e.message);
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
    <>
        <MainContainer></MainContainer>
        {     showModal && messages?.name && messages?.contribution ? 
        (  <Modal isOpen={showModal} onClose={() => setShowModal(false)} >
                    <Modal.Content maxWidth="400px" bgColor={"#FFFFF9"} color={"#FFFFF9" }>
                      <Modal.CloseButton />
                      <Modal.Header>
                        <Text color="coolGray.600" _dark={{color: "warmGray.200"}} pl="2" >
                        Solicitud de viajes
                        </Text>  
                      </Modal.Header>
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
          </Modal>) : null}
    </>
   
    )
}
export default Driver 

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
