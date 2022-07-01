import { Text, View, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button, Stack, ScrollView } from "native-base";
import { StyleSheet,TouchableHighlight } from "react-native";
import { useUserStore } from '../../../../Home/Store/StoreHome';
import {GOOGLE_MAPS_APIKEY,PASSENGER_TRIPS,URL_API} from "@env";
import MapView from "react-native-maps";
import styles from './StyleWidgetHomePassenger';
import * as Location from 'expo-location';
import React, { useEffect,useState,useRef } from 'react';
import MapViewDirections from "react-native-maps-directions";
import { useStoreTripPassanger } from '../../../../Modules/Passenger/TripDriver/Store/StoreScene';
import {AvatarUser, AvatarUserMap} from "../../../../../ui/avatarUser";

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

    const { avatarUrl } = useUserStore(
    );
    console.log(avatarUrl)
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
        setOrigin(current);
        originRequest(current);
    }

    /* get trips passenger */
    useEffect(()=>{
        fetch(URL_API+PASSENGER_TRIPS)
        .then((response)=>response.json())
        .then((json)=>setTrips(json))
        .catch((error)=>alert(error))
    }
    ,[]);


    useEffect( ()=>{
        getLocationPermission()
    },[])

        return(
            <>
                <Container style={styles.mainContainer}>
                    <Box style={styles.mainBox}>
                    <HStack justifyContent="space-between">
                        <Heading  style={{fontSize:15}}>A tu alrededor</Heading>
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
                                longitudeDelta: 0.015}
                            }
                        > 
                            <MapView.Marker
                                coordinate={{
                                    latitude: origin?.latitude,
                                    longitude:origin?.longitude
                                }}
                               title={"Tu ubicación"}
                                identifier="origin"
                                
                                
                            >
                            <AvatarUserMap avatarURL={avatarUrl}
                                size={6} 
                                isUseMap>
                            </AvatarUserMap>

                            </MapView.Marker>
                            { trips?.length>0 ? trips?.map((t,index) => (<>
                                <MapView.Marker 
                                    coordinate={{
                                        latitude: t?.latitude,
                                        longitude: t?.longitude
                                    }}
                                >
                                    <AvatarUserMap avatarURL={`https://firebasestorage.googleapis.com/v0/b/sistema-electivos-auth.appspot.com/o/images%2Favatars%2F${t?.uuid_fb}.png?alt=media&token=2be81107-b1eb-45f8-baa7-349cc6bfb99d`}
                                        size={6} 
                                        isUseMap>
                                    </AvatarUserMap>
                                    <MapView.Callout tooltip>
                                        <TouchableHighlight onPress= {()=>openModal(t)}>
                                            <View style={styles.colorBoxText}>
                                                <HStack space={1}>
                                                <View width={"45%"} justifyContent='center' padding={1}>
                                                    <AvatarUser avatarURL={`https://firebasestorage.googleapis.com/v0/b/sistema-electivos-auth.appspot.com/o/images%2Favatars%2F${t?.uuid_fb}.png?alt=media&token=2be81107-b1eb-45f8-baa7-349cc6bfb99d`} size={"20"}></AvatarUser>
                                                </View>
                                                </HStack>
                                            </View>
                                        </TouchableHighlight>
                                    </MapView.Callout>
                                </MapView.Marker>
                                </> 
                                )):null
                            }
                        </MapView>
                    </VStack>
                    </Box>
            </Container>
            </>
        );
}

export default WidgetUserTrips;


