import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {Alert,Image,KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../../../firebase.js'
import styles from './StyleLogin'
import logoLogin from '../../../img/logoLogin.png'
import { Radio, NativeBaseProvider } from "native-base";
import useLoginStore from './Store/storeLogin';
const LoginScreen = () => {
  //Guardamos los correos
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
/* State radio button */
const [value, setValue] = useState("driver");

  const handleSignUp = () => {
    navigation.replace("Register")
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Login con:', user.email);
      })
      .catch(error => Alert.alert('Creedenciales incorrectas'))
  }
/* Use Effect unsuscribe */
  useEffect(() => {
    useLoginStore.getState().setTarget(undefined);
    useLoginStore.getState().setEmail(undefined);
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        useLoginStore.getState().setEmail(user.email);
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [email])

  return (
    <NativeBaseProvider>
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
    <View style={styles.imageContainer}>
        <Image  style={styles.logoContainer}  source={logoLogin} />
      </View>
      <Text>{'\n'}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <Text>{'\n'}</Text>
   {/* Radio button */}
<View>
<Radio.Group name="myRadioGroup" 
    accessibilityLabel="favorite number"
    value={value} 
    onChange={nextValue => {
      setValue(nextValue);
      useLoginStore.getState().setTarget(nextValue);

    }
    }
    >
      <Radio shadow={2} value="driver" my="2">Conductor</Radio>
      <Radio shadow={2} value="passanger" my="2">
        Pasajero
      </Radio>
    </Radio.Group>
</View>
{/*  */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </NativeBaseProvider>
  )
}

export default LoginScreen