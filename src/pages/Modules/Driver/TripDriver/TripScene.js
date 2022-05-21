import React,{useState,useEffect} from "react";
import {View ,TouchableOpacity, Text} from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import CountDown from 'react-native-countdown-component';
import styles from './TripScene.style';
import {useStoreTripDriver} from './Store/StoreScene';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  Button,
  Actionsheet,
  useDisclose,
  Box,
  Avatar,
  HStack,
  VStack
} from 'native-base';
import { useNavigation } from '@react-navigation/core'
const TripScreen= () => {
  const navigation = useNavigation();
  const GOOGLE_MAPS_APIKEY = '';
/*   const origin = {latitude: -29.98131942375116, longitude: -71.35180660362076};
  const destination = {latitude: -29.965314, longitude: -71.349513}; */
  const [visible,setVisible] = useState(true); 
  const { setOrigin,setDestination,origin} = useStoreTripDriver(({ setOrigin,setDestination,origin }) => ({
    setOrigin,setDestination,origin
  }));
  
  const sendDataInit = () => {
    setVisible(false);
    navigation.replace("SceneTripInit");
  }

  return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          mapType="mutedStandard"
          initialRegion={{
            latitude: origin?.location.lat,
            longitude: origin?.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005}}
          //provider={"google"}
        >
        </MapView>
        <Actionsheet isOpen={visible}>
          <Actionsheet.Content>
              <Box w="100%" style={styles.containerBox}  justifyContent="center">
              <View style={styles.textContainer}>
              <Text style={styles.H1}>Confirmar punto de partida</Text>
              </View>
              <GooglePlacesAutocomplete
                  placeholder='Seleccionar punto de partida'
                  nearbyPlacesApi="GooglePlacesSearch"
                  fetchDetails={true}
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    setOrigin({
                      location:details.geometry.location,
                      description:data.description
                    })
                    setDestination({
                      location:{
                          lat: -29.965314,
                           lng: -71.34951
                      },
                      description:'UCN Coquimbo'
                    });
                    //SET DATA ORIGIN DESTINATION
                  }}
                  query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'es',
                  }}
                  styles={{
                    textInput:{
                      fontSize:16,
                      margin:10
                    }
                  }}
                  returnKeyType={"search"}
                  enablePoweredByContainer={false}
                  minLength={2}
                  debounce={400}
                  
                />
               
                <VStack alignItems="center">
                    <Button onPress={sendDataInit} style={styles.button} padding={5}>
                        <Text style={styles.buttonText}>Comenzar viaje</Text>
                      </Button>
                  </VStack>
              </Box>    
          </Actionsheet.Content>
        </Actionsheet> 
        </View>

);
}
export default TripScreen;
       {/*   <Actionsheet.Content justifyContent="center">
            
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text style={styles.H1}>Confirmar punto de partida</Text>
            </Box>
            <Actionsheet.Item >
              <HStack justifyContent="center" mx={{
              base: "5",
              md: "2"
              }} space={2}>
                  <Avatar bg="green.500" mr="4" Avatar size="lg" marginTop={8} marginLeft={0} ource={{
                  uri: "https://bit.ly/broken-link"
                  }}>
                    NG
                  </Avatar>

                  <VStack space={2} alignItems="center">
                      <Text style={styles.H2}>Inicio de viaje</Text>
                      <Text style={styles.adress}>El faro 15, La Herradura</Text>
                      <Text></Text>
                      <Text style={styles.H2}>Destino</Text>
                      <Text style={styles.location}>UCN Campus Guayacan</Text>
                      <Text style={styles.adress}>Larrondo 1281, Coquimbo</Text>
                  </VStack>
                  <VStack space={1} alignItems="center" marginTop={10}>
                    <CountDown
                      until={10 * 60 +30}
                      timeToShow={['M', 'S']}
                      onFinish={() => alert('finished')}
                      onPress={() => alert('hello')}
                      digitStyle={{backgroundColor: '#FFF'}}
                      timeLabels={{m: 'MM', s: 'SS'}}
                      size={20}
                    />
                  </VStack>
                </HStack>
            </Actionsheet.Item>
            <Actionsheet.Item>
              <VStack alignItems="center">
                <Button backgroundColor={"#002333"} w="100%"
                 padding={5} marginTop={1} marginLeft={55} borderRadius={15}>
                  Comenzar viaje
                  </Button>
              </VStack>
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet> */}