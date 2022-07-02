import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {Animated,ImageBackground,Alert,Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../../../firebase.js'
import styles from './StyleRegister'
import logoLogin from '../../../img/logo.png'
import background from '../../../img/background.png'
import { Box, Button, CheckIcon, FormControl, Icon, Input, Select, Stack, VStack, WarningOutlineIcon } from 'native-base'
import { FontAwesome5,MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import {URL_API,CREATE_NEW_USER,GET_DATA_USER} from "@env";
import useLoginStore from '../Login/Store/storeLogin.js'
import { useUserStore } from '../Home/Store/StoreHome.js'



const RegisterScene = () => {
  //Guardamos los correos
  const [name, setName] = useState(null)
  const [career, setCareer] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [uuid, setUuid] = useState(null)
  const [nameError, setNameError] = useState('')
  const [careerError, setCareerError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigation = useNavigation()
  const [show, setShow] = React.useState(false);
  const { userData, setAvatarUrl } = useUserStore(); 

  const handleSignUp = () => {
    handleSignUp2()
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        setUuid(user.uid)
        useLoginStore.getState().setEmail(email);
        console.log('Registrado con:', user.email);
      })
      .catch(error => Alert.alert(`Error al registrar: ${error})`))
  }

  const handleSignUp2 = () => {
    console.log(name, career, email, password)
  }

  const validate = () => {
    if (name=='' || name==null) {
      return false
    } else if (career==0 || career==null) {
      return false
    } else if (email=='' || email==null) {
      return false
    }
    return true
  }

  const submitValidation = validate()

  useEffect(() => {
    console.log(uuid)
    console.log(URL_API+CREATE_NEW_USER)
    if(uuid){
      //SEND POST
      const today = new Date();
      fetch(URL_API+CREATE_NEW_USER, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name:name,
        career_id:career,
        email:email,
        uuid_fb:uuid,
      })
    }).then(
      function(response) {
        if (response.ok) {    
          let responseText = JSON.stringify(response.text());
          console.log(responseText);
          const url =  URL_API+GET_DATA_USER;
          userData(url,email);
          navigation.replace("Login")
        }
        else {
          Alert.alert(`Unable to retrieve events.\nInvalid response received - (${response.status}).`);
        }
      }
    )
    .catch(
      function(error) {
        Alert.alert(`Unable to retrieve events.\n${error.message}`);
      }
    );
  }}, [uuid])

 
/* Use Effect unsuscribe */
  /* useEffect(async() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Login")
      }
    })

    return unsubscribe
  }, []) */

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
          <VStack space={5} alignItems="center">
            <Box>
               <Input 
              isRequired
              color="white" w={{
              base: "90%",
              md: "25%"
              }} 
              backgroundColor="#00000020"
              InputLeftElement={<Icon as={<FontAwesome5 name="user-circle" size={24}/>} 
              size={5} ml="2" color="muted.200" />} placeholder="Nombre" 
              onChangeText={text => setName(text)}/>
            </Box>
            {/*<Box>
             <FormControl >
          <Stack minW={"90%"}>
             <FormControl.Label>Password</FormControl.Label>
            <Input type="password" defaultValue="12345" placeholder="password" />
            <FormControl.HelperText>
              Must be atleast 6 characters.
            </FormControl.HelperText>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Atleast 6 characters are required.
            </FormControl.ErrorMessage>
          </Stack>
        </FormControl> 
            </Box>*/}
            <Box>
              <Select
                InputRightElement={<Icon as={<MaterialIcons name="expand-more" size={24} />} 
                size={7} mr="1" color="muted.200" />}
                backgroundColor="#00000020"
                selectedValue={null} minW={"90%"} accessibilityLabel="Choose Service" placeholder="Carrera" color={'white'}
                _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />
                }} onValueChange={itemValue =>setCareer(itemValue)}>
                  <Select.Item label="Ingeniería civil en Computación e informática" value={1} />
                  <Select.Item label="Ingeniería civil Indusctrial" value={1} />
                  <Select.Item label="Derecho" value={1} />
                  <Select.Item label="Biología marina" value={1} />
              </Select>
            </Box>
            <Box>
               <Input color="white" w={{
              base: "90%",
              md: "25%"
              }}
              backgroundColor="#00000020"
              type={"email"}
              placeholder="Correo" 
              onChangeText={text => setEmail(text)}/>
            </Box>
            <Box>
              <Input color="white" 
              backgroundColor="#00000020"
                w={{ base: "90%", md: "25%"}} type={show ? "text" : "password"} InputRightElement={<Icon as={<MaterialCommunityIcons size={24} name={show? "eye-off":"eye"}/>} 
                size={5} mr="2" color="muted.200" onPress={() => setShow(!show)}/>} placeholder="Contraseña"
                onChangeText={text => setPassword(text)}/>
            </Box>
            
           
          </VStack>
        {/* <TextInput
          placeholder="Nombre"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
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
        /> */}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={handleSignUp}
          isDisabled={!submitValidation}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Registrar</Text>
        </Button>
      </View>
        </Animated.View>
        </ImageBackground>
    </Animated.View>
  )
}

export default RegisterScene
