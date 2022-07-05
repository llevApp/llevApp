import React, { useState, useEffect } from 'react';
import { Text, View, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button2 } from "native-base";
import { TouchableOpacity, StyleSheet, Image, Platform, Button, DevSettings } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth, useAuth, upload } from '../../../../../firebase';
import { useUserStore } from '../../../Home/Store/StoreHome';
import { useTripsStore } from './StoreTrip/StoreTrips';
import { hubWebSocket } from '../../../../services/common/hubWebSocket';
import { hubChat } from '../../../../services/common/hubChat';
import * as ImagePicker from 'expo-image-picker';
import AvatarUser from '../../../../ui/avatarUser';

const AccountScreen = () => {

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const currentUser = useAuth();

    useEffect(() => {
      if (currentUser?.photoURL) {
        setAvatarUrl(currentUser.photoURL);
      }
    }, [currentUser])

    const submitData = async () => {
      //console.log("vamo a cambiar la foto 1")
      if (image != null ){
        const img = await fetch(image);
        const bytes = await img.blob();
        setLoadingChangeAvatar(true)
        //console.log("vamo a cambiar la foto 2")
        await upload(bytes,currentUser,setLoading);
        //console.log("se cambio?")
        setEditing(false)
        setLoadingChangeAvatar(false)
      }
      
    }

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

    const defaultUserImg = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
    const {name, avatarUrl, setAvatarUrl, setLoadingChangeAvatar} = useUserStore();

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
        setEditing(true)
      }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {loading? (
              <>
              </>
          ):(
            <Box size={250} alignContent="flex-start" justifyContent={"flex-start"}>
               <AvatarUser avatarURL={avatarUrl} size={"2xl"}/>
            </Box>
          )}
          <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Editar imagen" onPress={pickImage} />
          </View>
          <Center style={styles.infoContainer}>
            <Heading style={styles.text.username}>{name}</Heading>
          </Center>
          
          {
            editing && (
            <TouchableOpacity onPress={submitData} style={styles.button}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            )
          }
          <TouchableOpacity onPress={handleSignOut} style={styles.button} disabled={loading}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  mainContainer: {
      minWidth:'100%', 
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



