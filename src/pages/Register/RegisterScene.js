import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {Animated,ImageBackground,Alert,Image,KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../../../firebase.js'
import styles from './StyleRegister'
import logoLogin from '../../../img/logo.png'
import background from '../../../img/background.png'
const RegisterScene = () => {
  //Guardamos los correos
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()


  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registrado con:', user.email);
      })
      .catch(error => Alert.alert('Error al registrar'))
  }

 
/* Use Effect unsuscribe */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Login")
      }
    })

    return unsubscribe
  }, [])

  return (
    <Animated.View style={styles.containerViewHome} >
     <ImageBackground source={background} resizeMode="cover" style={styles.image}>
     <Animated.View style={{
         flex:1,
        alignItems:'center',
        marginTop:250
    }}>
        <View style={styles.imageContainer}>
        <Image  style={styles.logoContainer}  source={logoLogin} />
        </View>
        <Text>{'\n'}</Text>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Registrar</Text>
        </TouchableOpacity>
      </View>
        </Animated.View>
        </ImageBackground>
    </Animated.View>
  )
}

export default RegisterScene

/* 
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Registrar</Text>
        </TouchableOpacity>
      </View>


*/