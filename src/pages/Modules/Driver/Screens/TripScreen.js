import React, { useEffect, useState } from 'react'
import { Text, View,FlatList,Spacer,Image, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button } from "native-base";
import {useTripsStore} from './StoreTrip/StoreTrips';
import {useUserStore} from './../../../Home/Store/StoreHome';
import moment from 'moment';
export default function TripScreen({ navigation }) {
    
    const [FlatListData,setArrayList] = useState([])
    const {arraylist,latitude,longitude,initTripTime} = useTripsStore()
    //useEffect(()=>{useTripsStore.getState().setTripsPassenger("http://192.168.1.124:10000/api-llevapp/passengers/trips")},[])
    useEffect(()=>{useTripsStore.getState().setTripsPassenger("http://localhost:10000/api-llevapp/driver/trips/4")},[]);
   
    
    useEffect(()=>{

        const FlatListData = arraylist?.map((trip,index)=>{
            let date = moment(trip.init_trip_time).format('MMM DD, YYYY HH:MM')
            return{
                id:index,
                driver:trip.name,
                start:[trip.latitude,trip.longitude],
                timeStamp:date,
                recentText:trip.total_tips,
                passengerNumber:trip.total_passenger,
                avatarUrl: "https://img.icons8.com/officel/80/000000/map-pin.png"
            }
        });
        setArrayList(FlatListData);
        console.log(FlatListData);
    },[arraylist]);


    const name = FlatListData?.[0]?.driver;
    //page desing
    return (
        <View style={{ flex: 1 }} background="#F5F8FF">
            <Box >
                <Heading fontSize="xl" pb="0" borderColor="black"  color="white"  pl="10" pr="50" py="0" marginTop="10" marginBottom="0" >
                        <VStack space={4} justifyContent="left" pl="4" >
                            <Text color="coolGray.600" _dark={{color: "warmGray.200"}} pl="2"  fontStyle="italic">
                                Viajes como conductor realizados por 
                            </Text>
                            <HStack pl="1">
                                <Image size="24px" source={{uri: "https://img.icons8.com/ios/100/000000/driving.png"}} />
                                <Text color="coolGray.800" _dark={{color: "warmGray.200"}}  fontSize="xl" fontWeight="bold">
                                    {name}
                                </Text>
                            </HStack>
                        </VStack>
                </Heading>
                <FlatList data={FlatListData} 
                    renderItem={({item}) => 
                    <Box borderWidth="0.4" margin="0.2" borderColor="gray.200" _dark={{borderColor: "gray.600"} } background="white"  pl="10" pr="5" py="6" borderRadius="34">
                        <HStack space={3} justifyContent="center" >
                            <VStack>
                                <HStack space={0} justifyContent="left" pl="4" >
                                    <Image size="24px" source={{uri: "https://img.icons8.com/officel/80/000000/convertible.png"}}/>
                                    <Text fontSize="md"  _dark={{color: "warmGray.50"}} color="coolGray.800" bold  pl="2"  >
                                        {item.start}
                                    </Text>
                                </HStack>
                               
                                <HStack space={0} justifyContent="left" pl="4" >
                                <Image size="24px" source={{uri: "https://img.icons8.com/cotton/64/000000/donate--v1.png"}}/>
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
                                <HStack space={0} justifyContent="left" pl="4" >
                                    <Image size="24px" source={{uri: "https://img.icons8.com/office/80/000000/passenger.png"}}/>
                                    <Text  fontSize="sm" color="coolGray.600" _dark={{color: "warmGray.200"}}pl="2" fontStyle="italic">
                                        Numero de pasajeros: {item.passengerNumber}
                                    </Text>
                                   
                                </HStack>
                            </VStack>
                            <Spacer />
                            <HStack space={0} justifyContent="left" >
                                <Image size="18px" source={{uri:  "https://img.icons8.com/dusk/64/000000/clock--v1.png"}}/>
                                <Text fontSize="xs" _dark={{color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start" pl="2" pr="4" >
                                    {item.timeStamp}
                                </Text>
                            </HStack>
                        </HStack>
                    </Box>} keyExtractor={item => item.id}
                />
            </Box>
        </View>
    );



   
}