import React, { useEffect,useState } from 'react'
import { Text, View, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button, Stack } from "native-base";
import { useNavigation } from '@react-navigation/core';
import { useUserStore } from '../../../Home/Store/StoreHome';
export default function HomeScreen() {
const [nameShow, setNameShow] = useState(null);
const navigation = useNavigation();
/* Function call start trip */
const { name} = useUserStore(({ name }) => ({
    name
  }));
  

const initTrip = ()=>{
    navigation.replace("TripScreen");
};
useEffect(()=>{
    if(name){
    setNameShow(name);
  }
}),[name];
return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <NativeBaseProvider bg="#FFF" style={{flex: 1, justifyContent: "space-evenly", alignItems: "center", }}>
    <Center >
      <Container minWidth={"100%"}>
        <Box height="70%" minWidth={"100%"} w="100%" shadow="2" bg="emerald.200" justifyContent="space-evenly">
            <Center>
                <HStack alignItems="center" justifyContent="space-evenly">
                    <Box width={"65%"}> 
                    <VStack space={4} alignItems="flex-start">
                        <Heading  style={{fontSize:15, fontStyle:"italic"}}>Ing civil en computacion e Informatica</Heading>
                        <Heading>{nameShow ? nameShow : 'No Name'}</Heading>
                        <Button rounded={"full"} onPress={initTrip}>Comenzar viaje</Button>
                    </VStack>
                    </Box>
                    <Avatar bg="cyan.500" size={"xl"}
                        source={{uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    }}>
                        XD
                    </Avatar>
                </HStack>
            </Center>
            
        </Box>
      </Container>
      <Container>
        <Box minWidth={"90%"}  alignContent="space-between" alignItems="stretch" justifyContent="space-between"
        borderColor={"#FA3"} borderRadius={10} rounded="xl" padding={5} borderWidth={1.5}> 
            <VStack space={4}>
                <HStack justifyContent="space-between">
                    <Heading  style={{fontSize:15, fontStyle:"italic"}}>Historial de viajes</Heading>
                    <Button size="sm" variant="ghost">Ver todos</Button>
                </HStack>
                <Box width={"100%"}> 
                    <Box bg="#DEEFE7" rounded="md" width="100%" alignContent="space-between" >
                        <HStack padding={3} alignContent="space-between" alignItems={"stretch"} justifyContent="space-between">
                            <Heading fontSize={15}>Aporte </Heading>
                            <Text style={{fontSize:15, fontStyle:"italic"}}>$ 1.000</Text>
                        </HStack>
                    </Box>
                    <Box bg="#DEEFE7" rounded="md" width="100%" alignContent="space-between">
                        <HStack padding={3} alignContent="space-between" alignItems={"stretch"} justifyContent="space-between">
                            <Heading fontSize={15}>Aporte </Heading>
                            <Text style={{fontSize:15, fontStyle:"italic"}}>$ 1.000</Text>
                        </HStack>
                    </Box>
                </Box>
            </VStack>
        </Box>
      </Container>
    </Center>
    </NativeBaseProvider>
        </View>
    );
}