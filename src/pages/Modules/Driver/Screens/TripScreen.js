import React, { useEffect, useState } from 'react'
import { Text, View,FlatList,Spacer,Image, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button, Spinner } from "native-base";
import { useUserStore } from './../../../Home/Store/StoreHome';
import { useTripsStore } from './StoreTrip/StoreTrips';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import {URL_API,TRIPS_DRIVER} from "@env";
export default function TripScreen({ navigation }) {

    const [FlatListData,setArrayList] = useState([])
    const {arraylist, latitude, longitude, initTripTime} = useTripsStore()
    const { idUser, name } = useUserStore();
    useEffect(()=>{
      
        useTripsStore.getState().setTripsPassenger(URL_API+TRIPS_DRIVER+idUser)
    },[]); 
    useEffect(()=>{
        const FlatListData = arraylist?.map((trip,index)=>{
            let date = moment(trip.init_trip_time).format('MM/DD/YY HH:MM')
            return{
                id:index,
                driver:trip.name,
                start:[trip.latitude,trip.longitude],
                timeStamp:date,
                recentText:trip.total_tips,
                address:trip.address,
                passengerNumber:trip.total_passenger,
                avatarUrl: "https://img.icons8.com/officel/80/000000/map-pin.png"
            }
        });
        setArrayList(FlatListData);
        console.log(FlatListData);
    },[arraylist]);

    //const name = FlatListData?.[0]?.driver;
    //page desing
    return (
        <View style={{ flex: 1 }} background="#F5F8FF">
            <Box >
                <Heading fontSize="xl" pb="0" borderColor="black"  color="white"  pl="10" pr="50" py="0" marginTop="10" marginBottom="0" >
                        <VStack space={4} justifyContent="left" pl="4" py="4" >
                            <Text color="coolGray.600" _dark={{color: "warmGray.200"}} pl="2"  fontStyle="italic">
                                Viajes como conductor realizados por: 
                            </Text>
                            <HStack pl="4" space={2}>
                                <MaterialCommunityIcons name="card-account-details" size={24} color="black" />
                                <Text color="#0C5C5D" _dark={{color: "warmGray.200"}}  fontSize="xl" fontWeight="bold" pl="4">
                                    {name}
                                </Text>
                            </HStack>
                        </VStack>
                </Heading>
                {FlatListData? 

                    (<>
                    <FlatList data={FlatListData} 
                    renderItem={({item}) => 
                    <Box borderWidth="0.4" margin="0.2" borderColor="gray.200" _dark={{borderColor: "gray.600"} } background="white"  pl="110" pr="5" py="6" borderRadius="34">
                        <HStack space={3} justifyContent="center" >
                            <VStack>
                                <HStack space={2} justifyContent="left" pl="4"  >
                                    <MaterialCommunityIcons name="map-marker" size={24} color="red"  />
                                    <Text fontSize="sm"  _dark={{color: "warmGray.50"}} color="#159A9C" bold  pl="3" py="0"  >
                                        {item.address?.toUpperCase()}
                                    </Text>
                                </HStack>
                                <HStack space={3} justifyContent="left" pl="4" >
                                    <MaterialCommunityIcons name="hand-coin" size={24} color="black" />
                                    <Text  fontSize="lg" color="coolGray.600" _dark={{color: "warmGray.200"}} pl="2" fontStyle="italic">
                                        $
                                    </Text>
                                    <Text  fontSize="lg" color="#6AC18A" _dark={{color: "warmGray.200"}} fontStyle="italic">
                                        {item.recentText}
                                    </Text>
                                    <Text  fontSize="xs" color="coolGray.600" _dark={{color: "warmGray.200"}} pl="1" py="1.5" fontStyle="italic">
                                        USD
                                    </Text>
                                </HStack>
                                <HStack space={3} justifyContent="left" pl="4" >
                                    <MaterialCommunityIcons name="seat-passenger" size={24} color="black" />
                                    <Text  fontSize="sm" color="coolGray.600" _dark={{color: "warmGray.200"}}pl="2" fontStyle="italic">
                                        Numero de pasajeros: {item.passengerNumber}
                                    </Text>
                                   
                                </HStack>
                            </VStack>
                            <Spacer />
                            <HStack space={1} justifyContent="center" >
                                <MaterialCommunityIcons name="clock-time-eight-outline" size={24} color="black"/>
                                <Text fontSize="2xs" _dark={{color: "warmGray.50"}} color="coolGray.800"  pl="0" pr="70" py="1" >
                                    {item.timeStamp}
                                </Text>
                            </HStack>
                        </HStack>
                    </Box>} keyExtractor={item => item.id}
                />
                    </>) : 
                    (<>
                        <HStack space={2} alignItems="center" justifyContent='center' padding={10}>
                            <Spinner accessibilityLabel="Loading posts" />
                            <Heading color="primary.500" fontSize="md">
                                Cargando datos...
                            </Heading>
                        </HStack>
                    </>)}
            </Box>
        </View>
    );



   
}