import React,{useState,useEffect,useRef} from "react";
import {View ,TouchableOpacity, Text,Keyboard, Platform, KeyboardEvent } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import CountDown from 'react-native-countdown-component';
import styles from './TripScene.style';
import {useStoreTripDriver} from './Store/StoreScene';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env";
import {
  Button,
  Actionsheet,
  Box,
  VStack,
  useDisclose,
} from 'native-base';
import { useNavigation } from '@react-navigation/core'

const useKeyboardBottomInset = () => {
  const [bottom, setBottom] = React.useState(0);
  const subscriptions = React.useRef([]);

  React.useEffect(() => {
    function onKeyboardChange(e) {
      if (
        e.startCoordinates &&
        e.endCoordinates.screenY < e.startCoordinates.screenY
      )
        setBottom(e.endCoordinates.height);
      else setBottom(0);
    }

    if (Platform.OS === 'ios') {
      subscriptions.current = [
        Keyboard.addListener('keyboardWillChangeFrame', onKeyboardChange),
      ];
    } else {
      subscriptions.current = [
        Keyboard.addListener('keyboardDidHide', onKeyboardChange),
        Keyboard.addListener('keyboardDidShow', onKeyboardChange),
      ];
    }
    return () => {
      subscriptions.current.forEach((subscription) => {
        subscription.remove();
      });
    };
  }, [setBottom, subscriptions]);

  return bottom;
};
const TripScreen= () => {
  const navigation = useNavigation();
/*   const origin = {latitude: -29.98131942375116, longitude: -71.35180660362076};
  const destination = {latitude: -29.965314, longitude: -71.349513}; */
  const [visible,setVisible] = useState(true); 
  const { setOrigin,setDestination,origin} = useStoreTripDriver(({ setOrigin,setDestination,origin }) => ({
    setOrigin,setDestination,origin
  }));
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  const bottomInset = useKeyboardBottomInset();
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
            latitude: -29.98131942375116,
            longitude: -71.35180660362076,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421}}
          //provider={"google"}
        >
        </MapView>
        <Actionsheet isOpen={visible} onClose={onClose}>
        <Actionsheet.Content bottom={bottomInset}>
              <Box w="100%" style={styles.containerBox}  justifyContent="center">
              <View style={styles.textContainer}>
              <Text style={styles.H1}>Seleccionar punto de partida</Text>
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