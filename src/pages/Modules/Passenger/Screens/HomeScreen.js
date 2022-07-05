import React, { useEffect,useState } from 'react'
import { View, NativeBaseProvider, VStack, Flex ,Button,Modal,Text} from "native-base";
import { useNavigation } from '@react-navigation/core';
import { useUserStore } from '../../../Home/Store/StoreHome';
import WidgetUserInfo from '../HomePassenger/Widgets/WidgetUserInfo';
import WidgetUserTrips from '../HomePassenger/Widgets/WidgetUserTrips';
import { Alert, StyleSheet } from 'react-native';
import {hubWebSocket} from '../../../../services/common/hubWebSocket';
import WidgetTripStatus from '../TripDriver/WidgetTripStatus/WidgetTripStatus';

const HomeScreen = () => {
const [nameShow, setNameShow] = useState(null);
const navigation = useNavigation();
/* Function call start trip */
const { name,idUser } = useUserStore();
const [showModal, setShowModal] = useState(false);
/* Get ws connection */
const {conection: wsConection, isOpen, setIsOpen,messagesPassenger,setMessages} = hubWebSocket();
const initTrip = ()=>{
    navigation.replace("TripScreenPassenger");
};
const sendResponseDriver= ()=>{
  hubWebSocket.getState().clearMessagesPassenger();
  hubWebSocket.getState().clearMessages();
  wsConection?.send(`
  {
    "request":{
        "status":"chat",
        "trip_id":${messages.tripId},
        "user_id":${messages.userId}
    }
  }
`);
}
const pushToChat = ()=>{
    console.log('Send to Chat');
    navigation.navigate('Chat')
    //navigation.navigate('MessagesScreen');
}
useEffect(()=>{
    if(name){
    setNameShow(name);
    //console.log('Estamos en vista Pasajero');
  }
}),[name];
  /* When get the user id, open ws */
  useEffect(()=>{
    /* Create Connection with WS */
    if(idUser){
      //let ws = new WebSocket(WEB_SOCKET_CHANNEL+idUser);
      //hubWebSocket.getState().setConection(ws);
    }else{
      //console.log('Undefined id user');
    }
},[idUser]);
useEffect(()=>{
  if(hubWebSocket.getState().messagesPassenger!=null){
    console.log('Mensaje desde el store:');
    console.log(hubWebSocket.getState().messagesPassenger);
    setShowModal(true);
  }
},[hubWebSocket.getState().messagesPassenger])

return (
        <View style={styles.mainContainer}>
            <NativeBaseProvider bg="#FFF" style={{flex: 1, justifyContent: "space-evenly", alignItems: "center", }}>
    <Flex >
        <VStack style={styles.widgets} space={2}>
            <WidgetUserInfo style={styles.userInfo}/>
            <WidgetTripStatus></WidgetTripStatus>
            <WidgetUserTrips style={styles.tripsInfo}/>
        </VStack>
      
    </Flex>
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} >
                    <Modal.Content maxWidth="400px" bgColor={"#FFFFF9"} color={"#FFFFF9" }>
                      <Modal.CloseButton />
                      {messagesPassenger?.status == 'accepted' ? 
                      <>
                      <Modal.Header>Viaje confirmado!!!</Modal.Header>
                      <Modal.Body _scrollview={{scrollEnabled:false}}>
                      <VStack style={styles.widgets} space={2}>
                        <VStack direction="row" space={1} >
                          <Text>Deseas chatear con el conductor ?</Text>
                        </VStack>
                      </VStack>
                      <Button flex="1" colorScheme="green" onPress={() => {
                        pushToChat();
                        setShowModal(false);
                        hubWebSocket.getState().clearMessagesPassenger();
                        //setMessages(null);
                        //setMessagesPassenger(null);
                      }}>
                        Chatear
                      </Button>
                      <Button variant="ghost" colorScheme="blue" onPress={() => {
                        setShowModal(false);
                        //setMessages(null);
                        //setMessagesPassenger(null);
                        hubWebSocket.getState().clearMessagesPassenger();
                      }}>
                        Todo ok
                      </Button>
                      </Modal.Body> 
                      </> :
                      <>
                      <Modal.Header>Viaje no confirmado</Modal.Header>
                      <Modal.Body _scrollview={{scrollEnabled:false}}>
                      <VStack style={styles.widgets} space={2}>
                        <VStack direction="row" space={3}>
                        <Text>No fue aceptado tu viaje, que pena....'</Text>
                        </VStack>
                      </VStack>
                      <Button flex="1" colorScheme="green" onPress={() => {
                        setShowModal(false);
                        setMessages(null);
                        hubWebSocket.getState().clearMessagesPassenger();
                      }}>
                        Cerrar
                      </Button>
                      </Modal.Body> 
                      </>
                    }
                    </Modal.Content>
          </Modal>
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