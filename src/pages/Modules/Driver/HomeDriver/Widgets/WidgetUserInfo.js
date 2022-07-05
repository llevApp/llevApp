import React, { useState, useEffect } from 'react';
import { Text, View, Center, Container, Heading, Avatar, Box, HStack, VStack, Button,PresenceTransition ,Badge} from "native-base";
import { ImageBackground, StyleSheet } from "react-native";
import { useUserStore } from '../../../../Home/Store/StoreHome';
import { useNavigation } from '@react-navigation/core'
import {URL_API,TRIPS_DRIVER_ACTIVE} from "@env";
import {useStoreTripDriver} from '../../TripDriver/Store/StoreScene';
import AvatarUser from '../../../../../ui/avatarUser';
const WidgetUserInfo = () => {
    const backgrounImg = "https://digitalsynopsis.com/wp-content/uploads/2017/07/beautiful-color-ui-gradients-backgrounds-socialive.png";  
    const navigation = useNavigation();
    const {name, idUser, careerName, avatarUrl, hasActiveTrip, setHasActiveTrip} = useUserStore();
    const [textButton,setTextButton]=useState(null);
    useEffect(()=>{
        if(idUser){
        fetch(URL_API+TRIPS_DRIVER_ACTIVE+idUser , {
            method: 'GET',})
        .then((response)=>response.json())
        .then((json)=> {
        useStoreTripDriver.getState().setOrigin({location:{'lat':json?.trip[0]?.latitude,'lng':json?.trip[0]?.longitude},'description':json?.trip[0]?.address});
        useStoreTripDriver.getState().setDestination({
            location:{
                lat: -29.965314,
                lng: -71.34951
            },
            description:'UCN Coquimbo'});
          if(json?.has_data){
            setHasActiveTrip(true);
            setTextButton("Ver viaje");
          }else{
            setHasActiveTrip(false);
            setTextButton("Comenzar viaje");
          }
        }
        )
        .catch((error)=>console.log(error))
      } 
    },[useUserStore.getState().idUser,useUserStore.getState().hasActiveTrip]);

    const goToTripScreen= ()=>{
        navigation.replace("TripScreen")
    }
    const goToActiveTripScreen= ()=>{
        navigation.navigate("ActiveTrips")
    }
    return(
        <>
            <Container style={styles.mainContainer} >
                <ImageBackground source={{uri: backgrounImg}} borderRadius={5}  >
                    <Box  style={styles.mainBox} >
                    <Center>
                        <HStack style={styles.info}>
                            <Box flex={5} > 
                                <VStack style={styles.info.content} space={1} >
                                    <Heading style={styles.text.career}>{careerName}</Heading>
                                    <Heading style={styles.text.name}>{name}</Heading>
                                    <Button rounded="full" onPress={textButton == 'Ver viaje' ? goToActiveTripScreen : goToTripScreen} style={styles.button}>{textButton}</Button>
                                </VStack>
                            </Box>
                            <AvatarUser avatarURL={avatarUrl} size={'xl'}></AvatarUser>
                                <PresenceTransition 
                                       visible={textButton == 'Ver viaje'}
                                       initial={{
                                           opacity: 0,
                                           scale: 0
                                       }} animate={{
                                           opacity: 1,
                                           scale: 1,
                                           transition: {
                                               duration: 250
                                           }
                                   }}>
                                    <Avatar.Badge size={8} borderColor="papayawhip" bg="green.500" marginRight={3} top={10}/>
                                </PresenceTransition>
                        </HStack>
                        {textButton == 'Ver viaje' ?
                        <Badge colorScheme="info" alignSelf="flex-end" variant="subtle"px={7}>
                            viaje activo
                        </Badge>:null}
                    </Center>
                </Box>
                </ImageBackground>
            </Container>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        minWidth:'100%', 
        shadow:'20', 
        //height:'container',
        //flex: 0,
      /* backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center', */
    },
    mainBox: {
        padding:20, 
        minWidth: '100%', 
        shadow:'20', 
        justifyContent:'space-between',
    },
    info: {
        alignItems:'center',
        justifyContent:'space-evenly',
        content: {
            alignItems:'flex-start',
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
        /* backgroundSize: cover,
        backgroundPosition: Center, */
    },
  });
export default WidgetUserInfo;