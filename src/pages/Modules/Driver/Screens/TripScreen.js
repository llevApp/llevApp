import React, { useEffect, useState } from 'react'
import { Text, View,FlatList,Spacer,Image, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button, Spinner } from "native-base";
import { useUserStore } from './../../../Home/Store/StoreHome';
import { useTripsStore } from './StoreTrip/StoreTrips';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import {URL_API,TRIPS_DRIVER} from '@env';
export default function TripScreen({ navigation }) {

    const {tripsArray} = useTripsStore()
    const { idUser, name } = useUserStore();
  


    const passengerNumberWidget =(item)=>{
        if (item.passengerNumber == 0){
            return(
                <HStack marginTop={8} marginRight={4}>
                    <FontAwesome name="user-o" size={24} color="black" />
                    <FontAwesome name="user-o" size={24} color="black" />
                    <FontAwesome name="user-o" size={24} color="black" />
                    <FontAwesome name="user-o" size={24} color="black" />
                </HStack>
            )
        }
        if (item.passengerNumber == 1){
            return(
                <HStack marginTop={8} marginRight={4}>
                    <FontAwesome name="user" size={26} color="black" />
                    <FontAwesome name="user-o" size={24} color="black" />
                    <FontAwesome name="user-o" size={24} color="black" />
                    <FontAwesome name="user-o" size={24} color="black" />
                </HStack>
            )
        }
        if (item.passengerNumber == 2){
            return(
                <HStack marginTop={8} marginRight={4}>
                    <FontAwesome name="user" size={26} color="black" />
                    <FontAwesome name="user" size={26} color="black" />
                    <FontAwesome name="user-o" size={24} color="black" />
                    <FontAwesome name="user-o" size={24} color="black" />
                </HStack>
            )
        }
        if (item.passengerNumber == 3){
            return(
                <HStack marginTop={8} marginRight={4}>
                    <FontAwesome name="user" size={26} color="black" />
                    <FontAwesome name="user" size={26} color="black" />
                    <FontAwesome name="user" size={26} color="black" />
                    <FontAwesome name="user-o" size={24} color="black" />
                </HStack>
            )
        }
        if (item.passengerNumber == 4){
            return(
                <HStack marginTop={8} marginRight={4}>
                    <FontAwesome name="user" size={26} color="black" />
                    <FontAwesome name="user" size={26} color="black" />
                    <FontAwesome name="user" size={26} color="black" />
                    <FontAwesome name="user" size={26} color="black" />
                </HStack>
            )
        }
    }

    useEffect(()=>{useTripsStore.getState().setTripsPassenger(idUser)},[idUser]);
    useEffect(()=>{
        useTripsStore.getState().setTripsPassenger(idUser)
    },[]); 
    useEffect(()=>{
        const FlatListData = tripsArray?.map((trip,index)=>{
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
        //console.log(FlatListData);
    },[tripsArray]);
    return (
        <View style={{ flex: 1 }} background="#F5F8FF">
            <Box >
                <Heading fontSize="xl" pb="0" borderColor="black"  color="white"  pl="10" pr="50" py="0" marginTop="10" marginBottom="0" >
                        <VStack space={4}pl="4" py="4" >
                            <HStack pl="4" space={2}>
                                <MaterialCommunityIcons name="card-account-details" size={24} color="black" />
                                <Text color="#0C5C5D" _dark={{color: "warmGray.200"}}  fontSize="xl" fontWeight="bold" pl="4">
                                    {name}
                                </Text>
                            </HStack>
                        </VStack>
                </Heading>
                {tripsArray.length > 0 ? 
                    (<>
                        <FlatList data={tripsArray} 
                        renderItem={({item}) => 
                            <Box borderWidth="0.5" borderColor="gray.200" _dark={{borderColor: "gray.600"} } background="white" borderRadius="20" w={"100%"} h={120}>
                                <HStack space={4} justifyContent="flex-end" marginRight={5} marginLeft={10} marginTop={2}>
                                    <VStack marginLeft ="2" >
                                        <HStack  >
                                            <Text fontSize="sm"  _dark={{color: "warmGray.50"}} color="#159A9C" maxWidth={120} minWidth={120} >
                                                {item.address?.toUpperCase()}
                                            </Text>
                                        </HStack>
                                        <HStack space={3} maxH={10} minH={10}>
                                            <Text  fontSize="4xl" color="#6AC18A" _dark={{color: "warmGray.200"}}>
                                                $
                                            </Text>
                                            <Text  fontSize="4xl" color="#6AC18A" _dark={{color: "warmGray.200"}} >
                                                {item.recentText}
                                            </Text>
                                            <Text  fontSize="2xs" color="coolGray.600" _dark={{color: "warmGray.200"}} marginTop="6" >
                                                USD
                                            </Text>
                                        </HStack>
    
                                    </VStack>
                                    <Spacer />
                                    <VStack marginRight={10}>
                                    <HStack space={1}>
                                        <Text fontSize="2xs" _dark={{color: "warmGray.50"}} color="coolGray.800" >
                                            {item.timeStamp}
                                        </Text>
                                    </HStack>
                                        {passengerNumberWidget(item)}
                                    </VStack>
                                </HStack>
                                
                            </Box>} keyExtractor={item => item.id}
                        />
                    </>) : 
                    (<>
                        <HStack space={2} alignItems="center" justifyContent='center' padding={10}>
                            <Heading color="primary.500" fontSize="md">
                                <Center>
                                    <Text>Sin viajes Disponibles</Text>
                                    <Image size={400} resizeMode={"contain"} borderRadius={0} alt=" "
                                        source={{
                                            uri: "https://stories.freepiklabs.com/storage/18539/no-data-pana-1440.png"
                                        }}
                                    >
                                    </Image>
                                </Center>
                            </Heading>
                        </HStack>
                    </>)}
            </Box>
        </View>
    );



   
}