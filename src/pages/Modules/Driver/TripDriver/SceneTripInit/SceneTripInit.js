import React,{useState,useEffect,useRef} from "react";
import {View ,TouchableOpacity, Text} from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import CountDown from 'react-native-countdown-component';
import styles from './SceneTripInit.style';
import {useStoreTripDriver} from '../Store/StoreScene';
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

const SceneTripInit= () => {

  const GOOGLE_MAPS_APIKEY = 'AIzaSyAsMZa1qIKM3jalkzxNqUyvXQ1CNeS7fEs';
/*   const origin = {latitude: -29.98131942375116, longitude: -71.35180660362076};
  const destination = {latitude: -29.965314, longitude: -71.349513}; */
  const [visible,setVisible] = useState(false); 
  const { setOrigin,setDestination,origin,destination} = useStoreTripDriver(({ setOrigin,setDestination,origin,destination }) => ({
    setOrigin,setDestination,origin,destination
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
  return (
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
          { origin?.location && destination?.location && (
            <>
            <MapViewDirections 
            origin={origin.description}
            destination={destination.description}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="black"></MapViewDirections>
            <MapView.Marker
              coordinate={{
                latitude: origin?.location.lat,
                longitude: origin?.location.lng
              }}
              
              image={{uri: 'data:image/png;base64,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'}}
              title={"Punto de partida"}
              description={origin?.description}
              identifier="origin"
            />
            <MapView.Marker
            pinColor={'blue'}
            coordinate={{
              latitude: -29.965314,
              longitude: -71.349513
            }}
            image={{uri: 'data:image/png;base64,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'}}
            title={"UCN"}
            description={"Campus CBO"}
            identifier="destination"
            />
            
          </>
            )
          }

        { origin?.location && (
          <MapView.Marker
            coordinate={{
              latitude: origin?.location.lat,
              longitude: origin?.location.lng
            }}
            
            image={{uri: 'data:image/png;base64,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'}}
            title={"Punto de partida"}
            description={origin?.description}
        />)}
        </MapView> 


    
          
        </View>
);
}
export default SceneTripInit;
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