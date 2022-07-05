import { Text, View, Container, Heading, Avatar, Divider, Box, HStack, VStack} from "native-base";
import { StyleSheet,TouchableHighlight } from "react-native";
import { useUserStore } from '../../../../Home/Store/StoreHome';
import {GOOGLE_MAPS_APIKEY,PASSENGER_TRIPS,URL_API} from "@env";
import MapView from "react-native-maps";
import styles from './StyleWidgetHomePassenger';
import * as Location from 'expo-location';
import React, { useEffect,useState,useRef } from 'react';
import { useStoreTripPassanger } from '../../../../Modules/Passenger/TripDriver/Store/StoreScene';
import {AvatarUser, AvatarUserMap} from "../../../../../ui/avatarUser";

const WidgetUserTrips = () => {
    const mapRef = useRef(null);
    const[trips, setTrips]=useState([]);
    const [origin,setOrigin] = useState({
        latitude: -29.98131942375116,
        longitude: -71.35180660362076,
    });
    const { idUser } = useUserStore(({ idUser }) => ({
        idUser
      }));
    const {name} = useUserStore();
    const { setOrigin:originRequest} = useStoreTripPassanger(({ setOrigin,setDestination,origin,destination }) => ({
        setOrigin,setDestination,origin,destination
      }));

    const { avatarUrl } = useUserStore(
    );
    console.log("avatar url: ",avatarUrl)
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
        .then((json)=>{
            if(json){
              let response = json?.map((t)=>{
                if( t?.driver_id != idUser){
                return t;
              }
            });
            let filter = response.filter((v)=>v!=undefined);
            setTrips(filter)
            }
          })
        //.then((json)=>setTrips(json), console.log(trips))
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
                    <Heading fontSize="md" pb="0" borderColor="black"  color="white"    py="0" >  
                    <Text color="coolGray.600" _dark={{color: "warmGray.200"}} pl="2" >
                        Conductores a tu alrededor
                    </Text>  
                </Heading>
                    <VStack space={290} >  
                        <HStack justifyContent="space-between">  
                        </HStack>
                        <MapView
                            ref={mapRef}
                            borderRadius="5"
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
                            { trips?.length>0 ? trips?.map((t,index)=> (<>

                                <MapView.Marker 
                                    coordinate={{
                                        latitude: t?.latitude,
                                        longitude: t?.longitude
                                    }}
                                >
                                    <AvatarUserMap avatarURL={`https://firebasestorage.googleapis.com/v0/b/llevapp.appspot.com/o/images%2Favatars%2F${t?.uuid_fb}.png?alt=media&token=7ae4bc5b-af55-4c54-b162-e065f2fa8af4`}
                                        size={6} 
                                        isUseMap>
                                    </AvatarUserMap>
                                    <MapView.Callout tooltip>
                                        <TouchableHighlight onPress= {()=>openModal(t)}>
                                            <View style={styles.colorBoxText}>
                                                <HStack space={1}>
                                                <View width={"45%"} justifyContent='center' padding={1}>
                                                    <AvatarUser avatarURL={`https://firebasestorage.googleapis.com/v0/b/llevapp.appspot.com/o/images%2Favatars%2F${t?.uuid_fb}.png?alt=media&token=7ae4bc5b-af55-4c54-b162-e065f2fa8af4`} size={"20"}></AvatarUser>
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


