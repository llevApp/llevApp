import React, { useEffect, useState } from 'react'
import { Text, View,FlatList,Spacer,Image, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button } from "native-base";
import {useTripsStore} from './StoreTrip/StoreTrips';
import {useUserStore} from './../../../Home/Store/StoreHome';
export default function TripScreen({ navigation }) {
    const {name} = useUserStore();
    
    const [FlatListData,setArrayList] = useState([])
    let data = [{
        id: "",
        start:"sin datos" ,
        timeStamp:"sin datos" ,
        recentText: "sin datos" ,
        avatarUrl: "https://img.icons8.com/officel/80/000000/map-pin.png"
    }]

    const {arraylist,latitude,longitude,initTripTime} = useTripsStore()
    //useEffect(()=>{useTripsStore.getState().setTripsPassenger("http://192.168.1.124:10000/api-llevapp/passengers/trips")},[])
    useEffect(()=>{useTripsStore.getState().setTripsPassenger("http://localhost:10000/api-llevapp/passengers/trips")},[])
   
    
    useEffect(()=>{

        const FlatListData = arraylist?.map((trip,index)=>{
            return{
                id:index,
                driver:trip.driver,
                start:"Punto de partida",
                timeStamp:"2022/02/16 07:23",
                recentText:"Propina",
                passengerNumber:"3",
                avatarUrl: "https://img.icons8.com/officel/80/000000/map-pin.png"
            }
        })
        setArrayList(FlatListData);
        
console.log(FlatListData)
    },[arraylist])
    
    //page desing
    return (
        <View style={{ flex: 1 }} background="#F5F8FF">
            <Box >
                <Heading fontSize="xl" p="8" pb="30" borderColor="black"  color="white" >
                        <Text color="coolGray.600" _dark={{color: "warmGray.200"}} pl="2">
                            Viajes realizados por 
                        </Text>
                        {"\n"}
                        <Text color="coolGray.800" _dark={{color: "warmGray.200"}} pl="2">
                            Nombre Apellido Apellido
                        </Text>
        
                </Heading>
                <FlatList data={FlatListData} 
                    renderItem={({item}) => 
                    <Box borderWidth="0.4" margin="0.2" borderColor="gray.200" _dark={{borderColor: "gray.600"} } background="white"  pl="10" pr="5" py="6" borderRadius="34">
                        <HStack space={3} justifyContent="center" >
                            <VStack>
                                <HStack space={0} justifyContent="left" >
                                    <Image size="24px" source={{uri: "https://img.icons8.com/officel/80/000000/convertible.png"}}/>
                                    <Text fontSize="lg"  _dark={{color: "warmGray.50"}} color="coolGray.800" bold  pl="2" >
                                    {item.start}
                                    </Text>
                                </HStack>
                               
                                <HStack space={0} justifyContent="left" >
                                <Image size="24px" source={{uri: "https://img.icons8.com/cotton/64/000000/donate--v1.png"}}/>
                                    <Text  fontSize="lg" color="coolGray.600" _dark={{color: "warmGray.200"}} pl="2" fontStyle="italic">
                                        {item.recentText}
                                    </Text>
                                </HStack>
                                <HStack space={0} justifyContent="left" >
                                    <Image size="24px" source={{uri: "https://img.icons8.com/office/80/000000/passenger.png"}}/>
                                    <Text  fontSize="md" color="coolGray.600" _dark={{color: "warmGray.200"}}pl="2" fontStyle="italic">
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