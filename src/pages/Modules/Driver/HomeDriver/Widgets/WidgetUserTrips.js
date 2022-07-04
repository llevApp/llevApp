import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Text, View, FlatList,Spacer,Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button, Stack, ScrollView, Image } from "native-base";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useUserStore } from '../../../../Home/Store/StoreHome';
import { useTripsStore } from './../../Screens/StoreTrip/StoreTrips';

const WidgetUserTrips = () => {
    const {tripsArray} = useTripsStore()
    const { idUser, name } = useUserStore();
  
    useEffect(()=>{useTripsStore.getState().setTripsPassenger(idUser)},[idUser]);
    useEffect(()=>{
        useTripsStore.getState().setTripsPassenger(idUser)
    },[]); 



    const TripCard = (trip) => {
        return (
            <>
                <Box width={"100%"} style={styles.tripCard.container}> 
                    <Box style={styles.tripCard.header} >
                        <Heading fontSize={15}>Aporte </Heading>
                        <Text style={{fontSize:15, fontStyle:"italic"}}>{trip.recentText}</Text>
                    </Box>
                    <Box /* bg="#DEEFE7" */ rounded="md" width="100%" alignContent="space-between">
                        <VStack padding={3} alignContent="space-between" alignItems={"stretch"} justifyContent="space-between">
                            <Box>
                                <Heading style={styles.tripCard.text.title}>Pasajero</Heading>
                                <Heading style={styles.tripCard.text.value}>{trip.driver}</Heading>
                            </Box>
                            <Box>
                                <Heading style={styles.tripCard.text.title}>Ubicación</Heading>
                                <Heading style={styles.tripCard.text.value}>{trip.address?.toUpperCase()}</Heading>
                            </Box>
                        </VStack>
                    </Box>
                </Box>
            </>
        );
    };

    return(<>
        
        <Container style={styles.mainContainer} maxHeight ="55%">
            <Box style={styles.mainBox} >
                <Heading fontSize="sm" pb="0" borderColor="black"  color="white"  pl="4"  py="0" >  
                    <Text color="coolGray.600" _dark={{color: "warmGray.200"}} pl="2"  fontStyle="italic">
                        Ultimos viajes realizados: 
                    </Text>  
                </Heading>
                {tripsArray? 
                    (<><FlatList data={tripsArray.slice(0,3)} 
                        renderItem={({item}) => 
                            <Box borderWidth="0.4"  borderColor="gray.200" _dark={{borderColor: "gray.600"} } background="white"  pl="90" pr="5" py="6" borderRadius="20" w = "100%">
                                <HStack space={3} justifyContent="center" >
                                    <VStack>
                                        <HStack space={2} justifyContent="left" pl="4"  >
                                            <Text fontSize="xs"  _dark={{color: "warmGray.50"}} color="#159A9C" bold   py="0"  >
                                                {item.address?.toUpperCase()}
                                            </Text>
                                        </HStack>
                                        <HStack space={3} justifyContent="left" pl="4" >
                                            <Text  fontSize="lg" color="coolGray.600" _dark={{color: "warmGray.200"}} >
                                                $
                                            </Text>
                                            <Text  fontSize="lg" color="#6AC18A" _dark={{color: "warmGray.200"}} >
                                                {item.recentText}
                                            </Text>
                                            <Text  fontSize="xs" color="coolGray.600" _dark={{color: "warmGray.200"}} pl="1" py="1.5" >
                                                USD
                                            </Text>
                                        </HStack>
                                    </VStack>
                                    <Spacer />
                                    <HStack space={1}  >
                                        <Text fontSize="2xs" _dark={{color: "warmGray.50"}} color="coolGray.800"  pl="0" pr="70" py="1" >
                                            {item.timeStamp}
                                        </Text>
                                    </HStack>
                                </HStack>
                            </Box>} keyExtractor={item => item.id}
                        />
                    </>) : 
                    (<><HStack space={2} alignItems="center" justifyContent='center' padding={10}>
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
      </Container>
</>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
    },
    mainBox: {
        padding:20, 
        shadow:'20', 
        backgroundColor:'#ffffff',
        justifyContent:'space-between',
        alignContent:'space-between',
        alignItems:'stretch',

        minWidth:'100%',
        
        rounded:'xl',
        borderColor:'#B4BEC9', 
        borderRadius:10,
        borderWidth:1,

        /* shadowOffset:10,
        shadowRadius:5,
        shadow:5, */
        
        scroll: {
           space: '10px', 
        }
        
    },

    tripCard: {
        container: {
            //flex:1,
            rounded:'xl',
            borderColor:'#B4BEC9', 
            borderRadius:10,
            borderWidth:1,
            padding:10,
            marginTop:10,
        },
        header: {
            backgroundColor: '#F5F5FF',
            rounded: 10,
            justifyContent:'space-around',
            alignContent:'space-between',
            //alignItems:'stretch',
            flexDirection: 'row',
            rounded:'xl',
            padding:10,
        },
        text:{
            title: {
                fontSize: 15,
                //fontStyle: '',
                color: '#A9A9AA',
            },
            value: {
                fontSize: 15,
                //color: '#fff',
            }
        }
    },    
    text: {
        name: {
            fontSize: 20,
            color: '#fff',
        },
        career: {
            fontSize: 15,
            fontStyle: 'italic',
            color: '#fff',
        },
    },
    button: {
        marginTop:5,
    },
    image: {
        borderColor: '#fff',
    },
  });

export default WidgetUserTrips;