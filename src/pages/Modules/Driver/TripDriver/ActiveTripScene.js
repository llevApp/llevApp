import React,{useState,useEffect,useRef} from "react";
import {View ,Keyboard, Platform,TouchableHighlight,TextInput } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import styles from './TripScene.style';
import {GOOGLE_MAPS_APIKEY,URL_API,TRIPS_DRIVER,DRIVER_END_TRIP,TRIPS_DRIVER_ACTIVE} from "@env";
import { useNavigation } from '@react-navigation/core';
import {
  Box,
  HStack,
  VStack,
  Image,
  Text,
  Button,
  Alert,
  Modal,
  Heading
} from 'native-base';
import { Center } from "native-base";
import { useUserStore } from '../../../Home/Store/StoreHome';
import {useStoreTripDriver} from '../../Driver/TripDriver/Store/StoreScene';
import { AvatarUserMap } from "../../../../ui/avatarUser";
export const colorsPolilynes = ['#00FFFF','#F0F8FF','#7FFFD4','#000000','#A52A2A','#6495ED','#00008B','#FF8C00','#9932CC','#A9A9A9','#006400']
export const ActiveTripScreen= () => {
  /* get trips passenger */
  const [tripID,setTripID] = useState(0) 
  const [openModal,setOpenModal] = useState(false) 
  const mapRef = useRef(null);
  const {name, idUser, careerName, avatarUrl, hasActiveTrip, setHasActiveTrip} = useUserStore();
  const { origin,destination} = useStoreTripDriver(({ setOrigin,setDestination,origin,destination }) => ({
    setOrigin,setDestination,origin,destination
  }));
  const navigation = useNavigation();
  const toHome = () => {
    navigation.replace("Driver");
  }
  const endTrip = ()=>{
    fetch(URL_API+DRIVER_END_TRIP+tripID , {
        method: 'PUT',
        })
    .then((response)=>response.json())
    setOpenModal(true)
  };

  useEffect(()=>{
    if(idUser){
      fetch(URL_API+TRIPS_DRIVER_ACTIVE+idUser , {
        method: 'GET',})
    .then((response)=>response.json())
    .then((json)=> (setTripID(json.trip?.[0]?.trip_id)),setHasActiveTrip(true))
    .catch((error)=>console.log(error))
    }
  }
  ,[hasActiveTrip,idUser]);
  return (
    <View style={styles.container}>
            <HStack w="90%" py="5" alignItems="center" >
                <Center>
                </Center>
            </HStack>
            <HStack w="90%" py="5" alignItems="center" >
                <Center>
                    <Image size={100} resizeMode={"contain"} borderRadius={100} alt=" "
                        source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/4668/4668400.png"
                        }}
                    />
                </Center>
                <Text w="70%" style={styles.H1}>Universidad Católica del Norte Campus Guayacán</Text>
            </HStack>
            <Box width="90%" height="60%" bg="primary.500"  shadow={4}>
                <MapView style={styles.map} mapType="mutedStandard"  
                        initialRegion={
                            {
                                latitude: origin?.location.lat,
                                longitude: origin?.location.lng,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005
                            } 
                        }
                >
                     
                { origin?.location && destination?.location &&
                    (<><MapViewDirections 
                        origin={origin.description}
                        destination={destination.description}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={2}
                        strokeColor="#039BE5"></MapViewDirections>
                        <MapView.Marker
                        coordinate={{
                            latitude: origin?.location.lat,
                            longitude: origin?.location.lng
                        }}
                            
                        title={"Punto de partida"}
                        description={origin?.description}
                        identifier="origin"
                        >
                          <AvatarUserMap avatarURL={avatarUrl}
                            size={12} isUseMap></AvatarUserMap>
                        </MapView.Marker>
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
                    </>)}
                </MapView>
            </Box>
            <HStack w="90%" h="15%" alignItems="center" py="5" >
                <Button w="70%" h="80%" px="50" size="xl" colorScheme="primary" alignItems="center" borderRadius={80} margin="auto"
                    onPress ={endTrip}>
                  <Heading color="#FFFFF9" fontSize={20}>Terminar viaje</Heading>
                   
                </Button>
                <Modal isOpen={openModal} onClose={() => toHome()} >
                    <Modal.Content maxWidth="400px" bgColor={"#FFFFF9"} color={"#FFFFF9" }>
                      <Modal.CloseButton />
                      <Modal.Header>Viaje Finalizado</Modal.Header>
                      <Modal.Body _scrollview={{scrollEnabled:false}}>
                      <Button flex="1" colorScheme="green" onPress={() => {
                        toHome();
                        setOpenModal(false);
                      }}>
                        Volver al Home
                      </Button>
                      </Modal.Body>
                    </Modal.Content>
                </Modal>
            </HStack>
    </View>
    );
}
export default ActiveTripScreen;