import { useNavigation } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../../../firebase'
import styles from './StyleHome'
import useLoginStore from '../Login/Store/storeLogin';
const HomeScreen = () => {
  const navigation = useNavigation()
  
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }
useEffect(()=>{console.log(useLoginStore.getState().target)},[])
  return (
    <View style={styles.container}>

     
     {/*  <Text> AQUI DIOSITO PON EL MENU {auth.currentUser?.email} !</Text> */}
     <Text>Bienvenido chaval!!</Text>
      <Text>Estas en la vista de {useLoginStore.getState().target}</Text>
      <Text>{useLoginStore.getState().email}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen