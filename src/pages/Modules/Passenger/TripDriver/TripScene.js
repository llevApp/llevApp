import React,{useState,useEffect,useRef} from "react";
import {Alert,View ,TouchableOpacity, Text,Keyboard, Platform, KeyboardEvent,TouchableHighlight,TextInput } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import CountDown from 'react-native-countdown-component';
import styles from './TripScene.style';
import moment from 'moment';
import { useStoreTripPassanger} from './Store/StoreScene';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY,PASSENGER_TRIPS,URL_API,WEB_SOCKET_CHANNEL} from "@env";
import {hubWebSocket} from '../../../../services/common/hubWebSocket';
import { useUserStore } from '../../../Home/Store/StoreHome';
import {useStoreMessage} from '../TripDriver/Store/StoreConfirmTrip';
import {
  Button,
  Actionsheet,
  Box,
  VStack,
  useDisclose,
} from 'native-base';
import { AlertDialog, Center } from "native-base";

import { useNavigation } from '@react-navigation/core'
import { Marker } from "react-native-svg";
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
export const TripScreen= () => {
  const navigation = useNavigation();
  const[trips,setTrips]=useState([]);
  const [contribution, setContribution] = useState('');
  const[dataWs,setDataWs]=useState(null);
  const[activeWs,setActiveWs]=useState(false);
  const [visible,setVisible] = useState(false); 
  /* show trips  user*/
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  const bottomInset = useKeyboardBottomInset();
  const mapRef = useRef(null);
  const { idUser } = useUserStore(({ idUser }) => ({
    idUser
  }));
  const{setMessage} = useStoreMessage(({ setMessage }) => ({
    setMessage
  }));
  const {conection: wsConection, isOpen:isOpenWs, setIsOpen} = hubWebSocket();
/*   const origin = {latitude: -29.98131942375116, longitude: -71.35180660362076};
  const destination = {latitude: -29.965314, longitude: -71.349513}; */
  const { origin,setOrigin,destination,setDestination} = useStoreTripPassanger(({ setOrigin,setDestination,origin,destination }) => ({
    setOrigin,setDestination,origin,destination
  }));
  const sendDataInit = () => {
    /* Send Data to Driver for ws */
        console.log('Connected to the server')
        let ws = new WebSocket(WEB_SOCKET_CHANNEL+dataWs?.driver_id);
        hubWebSocket.getState().setConection(ws);
        setActiveWs(true);
    }
    const openModal = (t) => {
      setActiveWs(false);
      setVisible(true);
      console.log('*******************');
      console.log(origin);
      console.log(t)
      setDataWs(t);
      console.log('*******************');
    }
  /* get trips passenger */
  useEffect(()=>{
    fetch(URL_API+PASSENGER_TRIPS)
    .then((response)=>response.json())
    .then((json)=>setTrips(json))
    .catch((error)=>alert(error))
    .finally( ()=>console.log('finally'));
    setDestination({
      location:{
          lat: -29.965314,
          lng: -71.34951
      },
      description:'UCN Coquimbo'
    });
  
  }

  ,[]);

    useEffect(()=>{
      if(wsConection && activeWs){
        console.log('entramos al ws');
        wsConection.onopen = () => {
          // connection opened
          setIsOpen(true);
          wsConection.send(`
            {
              "request":{
                  "trip_id":${dataWs?.trip_id},
                  "user_id":${dataWs?.driver_id},
                  "latitude":${dataWs?.latitude},
                  "longitude":${dataWs?.longitude},
                  "contribution":${contribution}
              }
            }
        `);
        setVisible(false);
        navigation.replace("Passenger");
        };
        wsConection.onmessage = (e) => {
          // a message was received
          console.log(e.data);
          setMessage(e.data);
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
    },[activeWs]);

  return (
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          mapType="mutedStandard"
          initialRegion={{
            latitude: -29.98131942375116,
            longitude: -71.35180660362076,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421}}
          //provider={"google"}
        >

      {trips?.map((t,index) => (
        
        <>
          <MapView.Marker 
           coordinate={{
                  latitude: t?.latitude,
                  longitude: t?.longitude
                }}
                description={t?.addres}
          
                title={"Esto es un marker de los viajes"}
                image={{uri: 'data:image/png;base64,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'}}
          >
                  <MapView.Callout tooltip>
                                      <TouchableHighlight onPress= {()=>openModal(t)}>
                                      {/* "address": "condominio las vilcas",
                                          "career": "Ingenieria Civil en Computacion e Informatica",
                                          "init_trip_time": "2022-05-05T19:07:04.937Z",
                                          "latitude": -11.1111,
                                          "longitude": -12.222,
                                          "name": "Dionisio Alejandro Olivares Astudillo",
                                          "total_passenger": 0,
                                          "total_tips": 0,
                                          "trip_id": "20",*/}
                                          <View style={styles.colorBoxText}>
                                              <Text>{'Conductor: '}</Text>
                                              <Text style={{color:'#A9A9A9'}}>{t?.name}</Text>
                                              <Text>{'Inicio de viaje: '}</Text>
                                              <Text style={{color:'#A9A9A9'}}>{
                                                moment(t?.init_trip_time).format('DD MMM YYYY HH:MM')
                                               }</Text>
                                          </View>
                  </TouchableHighlight>
                </MapView.Callout>
          </MapView.Marker>
           <MapViewDirections 
            origin={{ latitude: t?.latitude,
                  longitude: t?.longitude}}
            destination={{
              latitude: -29.965314,
              longitude: -71.349513
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor={colorsPolilynes[ Math.floor(Math.random() * 10)]}></MapViewDirections>
            </>
        ))}
       
 
        {
         origin && (
           <>
            <MapView.Marker
            draggable={true}
            onDragEnd={(direction)=>setOrigin(direction.nativeEvent.coordinate)}
            pinColor={'blue'}
            coordinate={{
              latitude: origin?.latitude,
              longitude:origin?.longitude
            }}
            title={"Este eres tú"}
            description={"Tu ubicacion actual"}
            identifier="destination"
        />
        <MapView.Marker
            pinColor={'blue'}
            coordinate={{
              latitude: -29.965314,
              longitude: -71.349513
            }}
            image={{uri: 'data:image/png;base64,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'}}
            title={"UCN"}
            description={"Campus CBO"}
            identifier="destination"
            />
      {/*     <MapViewDirections 
            origin={origin}
            destination={{
              latitude: -29.965314,
              longitude: -71.349513
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="#039BE5"></MapViewDirections> */}
        </>
          )
        }

        </MapView>
        <Center flex={1} px="3">
                {/* <ModalInstrucction /> */}
        </Center>
        <Actionsheet isOpen={visible} onClose={onClose}>
        <Actionsheet.Content bottom={bottomInset}>
              <Box w="100%" style={styles.containerBox}  justifyContent="center">
              <View style={styles.textContainer}>
              <Text style={styles.H1}>Iniciar oferta de viaje</Text>
              </View>
            
                <TextInput
                placeholder="contribution"
                value={contribution}
                onChangeText={text => setContribution(text)}
                style={styles.input}
                />
                <VStack alignItems="center">
                    <Button onPress={sendDataInit} style={styles.button} padding={5}>
                        <Text style={styles.buttonText}>Enviar oferta</Text>
                      </Button>
                  </VStack>
              </Box>    
          </Actionsheet.Content>
        </Actionsheet> 
        </View>

);
}
export default TripScreen;