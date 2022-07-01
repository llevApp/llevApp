import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {Animated,ImageBackground,Alert,Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../../../firebase.js'
import styles from './StyleRegister'
import logoLogin from '../../../img/logo.png'
import background from '../../../img/background.png'
import { Box, CheckIcon, Icon, Input, Select } from 'native-base'
import { FontAwesome5 } from '@expo/vector-icons'; 

const RegisterScene = () => {
  //Guardamos los correos
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  const [show, setShow] = React.useState(false);


  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        //console.log('Registrado con:', user.email);
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
        <Image  style={styles.logoContainer} source={logoLogin} />
        </View>
        <Text>{'\n'}</Text>
        <Text>{'\n'}</Text>
        <View style={styles.inputContainer}>
        <Input w={{
      base: "75%",
      md: "25%"
    }} InputLeftElement={<Icon as={<FontAwesome5 name="user-circle" size={24} color="black"/>
  } size={5} ml="2" color="muted.400" />} placeholder="Name" />
      <Input w={{
      base: "75%",
      md: "25%"
    }} type={show ? "text" : "password"} InputRightElement={<Icon as={<FontAwesome5 name={show? "eye-slash":"eye"}/>} size={4} mr="2" color="muted.400" onPress={() => setShow(!show)} />} placeholder="Password" />
        <TextInput
          placeholder="Nombre"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <Select selectedValue={null} minWidth="200" accessibilityLabel="Choose Service" placeholder="Carrera"  style={styles.select}
        _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
        }} mt={1} onValueChange={itemValue =>console.log('')}>
          <Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          <Select.Item label="Cross Platform Development" value="cross" />
          <Select.Item label="UI Designing" value="ui" />
          <Select.Item label="Backend Development" value="backend" />
        </Select>
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