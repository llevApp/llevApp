import React,{useState,useEffect,useRef} from "react";
import {View ,TouchableOpacity, Text,Keyboard, Platform} from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import CountDown from 'react-native-countdown-component';
import styles from './SceneSelectOrigin.style';
import {useStoreTripDriver} from '../Store/StoreScene';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY,URL_API,DRIVER_NEW_TRIP} from "@env";
import { useNavigation } from '@react-navigation/core';
import {
  Button,
  Actionsheet,
  Box,
  VStack,
  useDisclose,HStack,Avatar,
  Spinner,
  Center
} from 'native-base';
import { useUserStore } from '../../../../Home/Store/StoreHome';


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


const SceneSelectOrigin= () => {
  const navigation = useNavigation();
/*   const origin = {latitude: -29.98131942375116, longitude: -71.35180660362076};
  const destination = {latitude: -29.965314, longitude: -71.349513}; */
  const [visible,setVisible] = useState(false); 
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  const bottomInset = useKeyboardBottomInset();
  const { setOrigin,setDestination,origin,destination} = useStoreTripDriver(({ setOrigin,setDestination,origin,destination }) => ({
    setOrigin,setDestination,origin,destination
  }));
  const { idUser } = useUserStore(({ idUser }) => ({
    idUser
  }));
  const mapRef = useRef(null);
/* Config zoom and fit markers */
useEffect(()=>{
  if(origin){
    mapRef.current.fitToSuppliedMarkers(["origin","destination"],
    {edgePadding : {top:50,right:50,bottom:50,left:50},
    }
    );
  }
},[origin])
const back = () => {
  navigation.replace("TripScreen");
}
const toHome = () => {
  navigation.replace("Driver");
}
useEffect( ()=>{
 if(isOpen){
  //SEND POST
  const today = new Date();
  fetch(URL_API+DRIVER_NEW_TRIP, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user_id: idUser,
    latitude: origin?.location.lat,
    longitude: origin?.location.lng,
    start_time: today,
    address:origin?.description
  })
});
} 

},[isOpen]);
  return (
    <>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          mapType="mutedStandard"
          initialRegion={{
            latitude: origin?.location.lat,
            longitude: origin?.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005}}
        //provider={"google"}
        >
        { origin?.location && (
          <MapView.Marker
            coordinate={{
              latitude: origin?.location.lat,
              longitude: origin?.location.lng
            }}
            image={{uri: 'data:image/png;base64,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'}}
            title={"Punto de partida"}
            description={origin?.description}
            identifier={'origin'}
        />)}
        </MapView>
        <Actionsheet isOpen={isOpen} onClose={onClose}>    
        <Actionsheet.Content justifyContent="center">
          <View style={styles.textContainer}>
          <Text style={styles.H1}>Gracias por usar LlevApp !</Text>
          </View>
           
          </Actionsheet.Content>
        </Actionsheet> 
      </View>
      
      <Box  w="100%" h="100%" style={styles.containerBox}  justifyContent="center" align>
      <View style={styles.textContainer}>
              <Text style={styles.H1}>Confirmar punto de partida</Text>
      </View>
          
      

      <GooglePlacesAutocomplete 
          placeholder='Seleccionar punto de partida'
          nearbyPlacesApi="GooglePlacesSearch"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
           console.log("location: ",details.geometry.location)
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
            })
            back();
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
        >
          
      </GooglePlacesAutocomplete>
      </Box>

    </>
);
}
export default SceneSelectOrigin;