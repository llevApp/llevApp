import { Text, View, Center, Container, Heading, Avatar, Divider,Spinner, Box, HStack, NativeBaseProvider, VStack, Button, Stack, ScrollView } from "native-base";
import { StyleSheet, TextComponent } from "react-native";
import { useUserStore } from '../../../../Home/Store/StoreHome';
import {GOOGLE_MAPS_APIKEY,PASSENGER_TRIPS,URL_API} from "@env";
import MapView from "react-native-maps";
import styles from './StyleWidgetPassangerRequest';
import * as Location from 'expo-location';
import React, { useEffect,useState,useRef } from 'react';
import { useStoreTripPassanger } from '../../../../Modules/Passenger/TripDriver/Store/StoreScene';
import * as Progress from 'react-native-progress';

const WidgetPassengerRequest = () => {
    const mapRef = useRef(null);
    const [origin,setOrigin] = useState({
        latitude: -29.98131942375116,
        longitude: -71.35180660362076,
    });
    const { setOrigin:originRequest} = useStoreTripPassanger(({ setOrigin,setDestination,origin,destination }) => ({
        setOrigin,setDestination,origin,destination
    }));

    
async function getLocationPermission(){
    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
        alert('permiso denegado');
        return;
    }
    let location = await Location.getCurrentPositionAsync({});/* Get Latitude and longitude IPHONE */
    const current = {
        latitude: location.coords.latitude,
        longitude:location.coords.longitude
    }
}
 



/* THE USER'S GEOLOCATION IS CALLED ONLY ONCE */
useEffect( ()=>{getLocationPermission()},[])
    return(<>
        <Container style={styles.container} shadow={4} >
            <View >
                <VStack >
                    <Text  marginLeft={100} fontSize={24} marginTop={4}>UCN,coquimbo</Text>
                    <HStack marginLeft={8} bgColor={"white"}>
                        <Progress.Bar  progress={1} width={70} height={20} color="green" bor />
                        <Progress.Bar indeterminate={true} width={130} height={20} color="gold" />
                        <Progress.Bar progress={0} width={70} height={10} color="grey" />
                    </HStack>
                    <VStack space={2}>
                        <Text fontSize={12} marginLeft="8">Esperando respuesta del conductor</Text>
                    </VStack>
                    <HStack bgColor={"green"} marginTop={2}>
                        <Avatar bg="cyan.500"source={{
                            uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        }} size="md" marginLeft={10} ></Avatar>
                        <VStack space={0}  >
                            <Text fontSize={16} marginLeft="2">Conductor</Text>
                            <Text fontSize={22} fontStyle={"italic"} marginLeft="2">Sebita Sanchez</Text>
                        </VStack>
                    </HStack>
                    <Button marginLeft="12" w="80%" h="30%" px="50" size="xl" colorScheme="secondary" alignItems="center" borderRadius={20}>
                        Cancelar Solicitud
                    </Button>
                </VStack>
                
                
            </View>
      </Container>
</>
    );
}

export default WidgetPassengerRequest;
