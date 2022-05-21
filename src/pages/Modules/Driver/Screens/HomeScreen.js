import React, { useEffect,useState } from 'react'
import { Text, View, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button, Stack, Flex } from "native-base";
import { useNavigation } from '@react-navigation/core';
import { useUserStore } from '../../../Home/Store/StoreHome';
import WidgetUserInfo from '../HomeDriver/Widgets/WidgetUserInfo';
import WidgetUserTrips from '../HomeDriver/Widgets/WidgetUserTrips';
import { StyleSheet } from 'react-native';


const HomeScreen = () => {
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
    console.log('Entramos a Home Screen');
    setNameShow(name);
  }
}),[name];
return (
        <View style={styles.mainContainer}>
            <NativeBaseProvider bg="#FFF" style={{flex: 1, justifyContent: "space-evenly", alignItems: "center", }}>
    <Flex >
        <VStack style={styles.widgets} space={5}>
            <WidgetUserInfo style={styles.userInfo}/>
            <WidgetUserTrips style={styles.tripsInfo}/>
        </VStack>
      
    </Flex>
    </NativeBaseProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        //minWidth:'100%', 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    widgets: {
        alignItems:'center',
        marginBottom: 10,
        flex:1,
    },
    userInfo: {
        maxHeight:'10px', 
        marginBottom:'10px',
    },
    tripsInfo: {
        padding:10,
        marginTop:10,
        flex:1,
    },
});

export default HomeScreen;