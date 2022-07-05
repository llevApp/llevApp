import React,{useState,useEffect,useRef} from "react";
import {Alert,View, Text,Keyboard, Platform,TouchableHighlight,TextInput, StyleSheet, ViewBase } from "react-native";
import {  NativeBaseProvider, Flex,Spinner,Modal,Heading, Container, Badge} from "native-base";
import * as Notifications from 'expo-notifications';
//import styles from './WidgetTripStatus.style';
import moment from 'moment';
import { useStoreTripPassanger} from './../Store/StoreScene';
import {GOOGLE_MAPS_APIKEY,PASSENGER_TRIPS,URL_API,WEB_SOCKET_CHANNEL} from "@env";
import {hubWebSocket} from '../../../../../services/common/hubWebSocket';
import { useUserStore } from '../../../../Home/Store/StoreHome';
import {useTripsStore} from '../../Screens/StoreTrip/StoreTrips';
import {
  Button,
  Actionsheet,
  Box,
  VStack,
  useDisclose,
  Image,
  HStack,
} from 'native-base';
import { AlertDialog, Center } from "native-base";

import { useNavigation } from '@react-navigation/core'
import { Marker } from "react-native-svg";
import {AvatarUser, AvatarUserMap} from "../../../../../ui/avatarUser";
export const colorsPolilynes = ['#00FFFF','#F0F8FF','#7FFFD4','#000000','#A52A2A','#6495ED','#00008B','#FF8C00','#9932CC','#A9A9A9','#006400']
const useKeyboardBottomInset = () => {
  const [bottom, setBottom] = React.useState(0);
  const subscriptions = React.useRef([]);
  React.useEffect(() => {
    function onKeyboardChange(e) {
      if (
        e.startCoordinates &&
        e.endCoordinates.screenY < e.startCoordinates.screenY
      )
        setBottom(e.endCoordinates.height);
      else setBottom(0);
    }

    if (Platform.OS === 'ios') {
      subscriptions.current = [
        Keyboard.addListener('keyboardWillChangeFrame', onKeyboardChange),
      ];
    } else {
      subscriptions.current = [
        Keyboard.addListener('keyboardDidHide', onKeyboardChange),
        Keyboard.addListener('keyboardDidShow', onKeyboardChange),
      ];
    }
    return () => {
      subscriptions.current.forEach((subscription) => {
        subscription.remove();
      });
    };
  }, [setBottom, subscriptions]);

  return bottom;
};
const ModalInstrucction = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);
  return <Center marginBottom={'700px'}>
      <Button colorScheme="coolGray" onPress={() => setIsOpen(!isOpen)}>
       Como tomar un viaje?
      </Button>
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Instrucciones</AlertDialog.Header>
          <AlertDialog.Body>
            1.- Selecciona tu ubicacion en donde el conductor podra pasar por ti.{"\n"}
            2.- Luego tienes que seleccionar el icono del usuario para efectuar el inicio del trato.{"\n"}
            3.- Esperar a que confirme tu propuesta.{"\n"}
            4.- Listo!! preparado para disfrutar de LlevApp!!{"\n"}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Cerrar
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>;
};
export const WidgetTripStatus = () => {

    const {name} = useUserStore();
    const {conection,messagesPassenger}= hubWebSocket();
    const [fullWidget,setFullWidget] = useState(false);
    const[stateTripPassanger,setStateTripPassanger]=useState(null);
    const {tripSendData,setTripSendData}=useTripsStore();
    const TripCard = (props) => {
      const {nameDriver,addres}=props;
        return (
            <>
                <Box width={"100%"} > 
                    {/* <Box style={styless.tripCard.header} >
                        <Heading fontSize={15}>Aporte </Heading>
                        <Text style={{fontSize:15, fontStyle:"italic"}}>{trip.recentText}</Text>
                    </Box> */}
                    <Box /* bg="#DEEFE7" */ rounded="md" width="100%" alignContent="space-between">
                        <VStack padding={3} alignContent="space-between" alignItems={"stretch"} justifyContent="space-between">
                            <Box>
                                <Heading style={styless.tripCard.text.title}>Conductor</Heading>
                                <Heading style={styless.tripCard.text.value}>{nameDriver ?? '-'}</Heading>
                            </Box>
                            <Box>
                                <Heading style={styless.tripCard.text.title}>Punto de partida</Heading>
                                <Heading style={styless.tripCard.text.value}>{addres ?? '-'}</Heading>
                            </Box>
                        </VStack>
                    </Box>
                </Box>
            </>
        );
    };

    const StatusWidget = (props) => {
      const {status}=props;
        //let status = 2

        const colorSchemes = ["info","success","error","warning"]
        const textInfo = ["Que pasa mi chico","Viaje confirmado","Viaje rechazado","Esperando respuesta"]
        return <View>
            <Badge variant={"solid"} colorScheme={colorSchemes[status == 'accepted' ? 1 : status == 'declined' ? 2 : 3]} alignSelf="center">
                {textInfo[status == 'accepted' ? 1 : status == 'declined' ? 2 : 3]}
            </Badge>
        </View>
    }

    const imagesAvatar = [
       "https://cdn-icons-png.flaticon.com/512/194/194938.png",
       "https://cdn-icons-png.flaticon.com/512/219/219961.png",
       "https://cdn-icons-png.flaticon.com/512/219/219968.png",
       "https://cdn-icons-png.flaticon.com/512/219/219975.png",
       "https://cdn-icons-png.flaticon.com/512/219/219956.png",
       "https://cdn-icons-png.flaticon.com/512/219/219971.png",
       "https://cdn-icons-png.flaticon.com/512/219/219969.png",
       "https://cdn-icons-png.flaticon.com/512/219/219958.png",
       "https://cdn-icons-png.flaticon.com/512/219/219959.png",
       "https://cdn-icons-png.flaticon.com/512/219/219972.png",
       "https://cdn-icons-png.flaticon.com/512/219/219966.png",
       "https://cdn-icons-png.flaticon.com/512/219/219964.png",
       "https://cdn-icons-png.flaticon.com/512/219/219965.png",
       "https://cdn-icons-png.flaticon.com/512/219/219954.png",
       "https://cdn-icons-png.flaticon.com/512/219/219974.png",
       "https://cdn-icons-png.flaticon.com/512/219/219967.png",
       "https://cdn-icons-png.flaticon.com/512/219/219976.png",
    ]
const clearView = ()=>{
  setTimeout(()=>{setTripSendData(null)}, 30000);
  setTimeout(()=>{setStateTripPassanger(null)}, 30000);
}
useEffect(()=>{
  if(messagesPassenger){
    if(useTripsStore.getState().tripSendData?.trip_id == messagesPassenger?.trip_id ){
      setTripSendData({
        "trip_id":tripSendData?.trip_id,
        "user_id":tripSendData?.user_id,
        "latitude":tripSendData?.latitude,
        "longitude":tripSendData?.longitude,
        "contribution":tripSendData?.contribution,
        "location":tripSendData?.location,
        "nameDriver":tripSendData?.nameDriver,
        "addressDriver":tripSendData?.addressDriver,
        "status":messagesPassenger?.status
      })
      clearView();
    }
  }
},[messagesPassenger]);
useEffect(()=>{
   if(useTripsStore.getState().tripSendData){
    setStateTripPassanger(tripSendData);
  }
},[tripSendData]);
    return (
    <>
      {stateTripPassanger != null ? (
        <Container style={styless.mainContainer}>
            <Box style={styless.mainBox}> 
                <VStack space={4}>
                    <HStack justifyContent="space-between">
                        <Heading  style={{fontSize:15}}>Solicitud de viaje</Heading>
                        <Button size="sm" variant="ghost" onPress={() => {setFullWidget(!fullWidget)}}>{fullWidget? "Ver menos" : "Ver más"}</Button>
                    </HStack>
                    <HStack justifyContent={"space-around"} alignItems="center">
                        <Heading fontSize={15}>Estado solicitud </Heading>
                        <StatusWidget status={stateTripPassanger?.status}></StatusWidget>
                    </HStack>
                    {fullWidget && (
                    <Box style={styless.mainBox.scroll}>
                        <HStack justifyContent={"space-around"} alignItems="center">
                            <Box>
                                <TripCard nameDriver={useTripsStore.getState().tripSendData?.nameDriver} addres={useTripsStore.getState().tripSendData?.addressDriver}/>
                            </Box>
                        </HStack>
                    </Box>)}
                </VStack>
            </Box>
         </Container>
      ): null }
  </>
  );
};

const styless = StyleSheet.create({
    mainContainer: {
        //flex:1,
    },
    mainBox: {
        padding:20, 
        shadow:'20', 
        backgroundColor:'#ffffff',
        justifyContent:'space-between',
        alignContent:'space-between',
        alignItems:'stretch',

        minWidth:'100%',
        
        rounded:'xl',
        borderColor:'#B4BEC9', 
        borderRadius:10,
        borderWidth:1,

        /* shadowOffset:10,
        shadowRadius:5,
        shadow:5, */
        
        scroll: {
           space: '10px', 
        }
        
    },

    tripCard: {
        container: {
            //flex:1,
            rounded:'xl',
            borderColor:'#B4BEC9', 
            borderRadius:10,
            borderWidth:1,
            padding:10,
            marginTop:10,
        },
        header: {
            backgroundColor: '#F5F5FF',
            rounded: 10,
            justifyContent:'space-around',
            alignContent:'space-between',
            //alignItems:'stretch',
            flexDirection: 'row',
            rounded:'xl',
            padding:10,
        },
        text:{
            title: {
                fontSize: 15,
                //fontStyle: '',
                color: '#A9A9AA',
            },
            value: {
                fontSize: 15,
                //color: '#fff',
            }
        }
    },    
    text: {
        name: {
            fontSize: 20,
            color: '#fff',
        },
        career: {
            fontSize: 15,
            fontStyle: 'italic',
            color: '#fff',
        },
    },
    button: {
        marginTop:5,
    },
    image: {
        borderColor: '#fff',
    },
  });

export default WidgetTripStatus;