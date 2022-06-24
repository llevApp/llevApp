import { Text, View, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button, Stack, ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { useUserStore } from '../../../../Home/Store/StoreHome';
import {GOOGLE_MAPS_APIKEY,PASSENGER_TRIPS,URL_API} from "@env";
import MapView from "react-native-maps";
import styles from './StyleWidgetHomePassenger';
import * as Location from 'expo-location';
import React, { useEffect,useState,useRef } from 'react';
import MapViewDirections from "react-native-maps-directions";
import { useStoreTripPassanger } from '../../../../Modules/Passenger/TripDriver/Store/StoreScene';
const WidgetUserTrips = () => {
    const mapRef = useRef(null);
    const[trips, setTrips]=useState([]);
    const [origin,setOrigin] = useState({
        latitude: -29.98131942375116,
        longitude: -71.35180660362076,
    });
    const {name} = useUserStore();
    const { setOrigin:originRequest,destination,setDestination} = useStoreTripPassanger(({ setOrigin,setDestination,origin,destination }) => ({
        setOrigin,setDestination,origin,destination
      }));
/* Call function when the user put geolocalization */
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
    console.log(current);
    setOrigin(current);
    originRequest(current);
}
 
/* get trips passenger */
useEffect(()=>{
    fetch(URL_API+PASSENGER_TRIPS)
    .then((response)=>response.json())
    .then((json)=>setTrips(json))
    .catch((error)=>alert(error))
    .finally( ()=>console.log('finally'));
}
,[]);



/* THE USER'S GEOLOCATION IS CALLED ONLY ONCE */
useEffect( ()=>{
    getLocationPermission()
},[])

    return(<>
        
        <Container style={styles.mainContainer}>
            <Box style={styles.mainBox}>
            <HStack justifyContent="space-between">
                <Heading  style={{fontSize:15, fontStyle:"italic"}}>A tu alrededor</Heading>
            </HStack> 
            <VStack space={290}>  
                <HStack justifyContent="space-between">  
            </HStack>
            <MapView
                            ref={mapRef}
                            style={styles.map}
                            mapType="mutedStandard"
                            initialRegion={{
                                latitude: origin?.latitude,
                                longitude:origin?.longitude,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.015}}
                            //provider={"google"}
                > 
                                <MapView.Marker
                                coordinate={{
                                    latitude: origin?.latitude,
                                    longitude:origin?.longitude
                                }}
                                image={{uri: 'data:image/png;base64,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'}}
                                title={"Tu ubicación"}
                                //description={origin?.description}
                                identifier="origin"
            />
        
            </MapView>
            </VStack>
            </Box>
      </Container>
</>
    );
}

export default WidgetUserTrips;
      {/* <MapView
                    style={styles.map}
                    mapType="mutedStandard"
                    initialRegion={{
                        latitude: -29.98131942375116,
                        longitude: -71.35180660362076,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421}}
                    //provider={"google"}
                >
                </MapView> */}