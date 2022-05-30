import * as React from 'react';
import { Text, View, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button } from "native-base";
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../../../../../firebase';
import { useUserStore } from '../../../Home/Store/StoreHome';
import { useTripsStore } from './StoreTrip/StoreTrips';

const AccountScreen = () => {
    const navigation = useNavigation();
    const handleSignOut = () => {
      auth
        .signOut()
        .then(() => {
          useUserStore.getState().clearAll();
          useTripsStore.getState().clearAll();
          navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    };

    const userImg = "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
    const {name} = useUserStore();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Avatar size={"2xl"} style={styles.image}
              source={{uri: userImg}}>
          </Avatar>
          <Center style={styles.infoContainer}>
            <Heading style={styles.text.username}>{name}</Heading>
          </Center>
          
          <TouchableOpacity onPress={handleSignOut} style={styles.button}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  mainContainer: {
      minWidth:'100%', 
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
  infoContainer: {
    //alignItems:'rigth', 
    justifyContent:'space-evenly',
    padding: 20,
  },
  info: {
      alignItems:'center', 
      justifyContent:'space-evenly',
      content: {
          alignItems:'flex-start',
      }
  },
  text: {
      username: {
          fontSize: 25,
          textAlign: 'center',

          //fontStyle: '',
          //color: '#fff',
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
  button: {
    backgroundColor: '#002333',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default AccountScreen;