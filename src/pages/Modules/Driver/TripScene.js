import React from "react";
import { StyleSheet, View , Text} from "react-native";
import MapView from "react-native-maps";
import {
  Button,
  Actionsheet,
  useDisclose,
  Box,
  extendTheme,
  Avatar,
  HStack,
  VStack
} from 'native-base';


export default function TripScreen() {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  return (
      <View style={styles.container}>
        {}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -29.98131942375116,
            longitude: -71.35180660362076,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
          
        }>
          <MapView.Marker
            coordinate={{
              latitude: -29.98131942375116,
              longitude: -71.35180660362076
            }}
            title={"title"}
            description={"description"}
        />

          <MapView.Marker
            pinColor={'blue'}
            coordinate={{
              latitude: -29.965314,
              longitude: -71.349513
            }}
            title={"UCN"}
            description={"Campus CBO"}
        />
        <MapView.Polyline
            coordinates={[
                {latitude: -29.98131942375116, longitude: -71.35180660362076}, // optional
                {latitude: -29.965314,longitude: -71.349513}, // optional
            ]}
            strokeWidth={4}
        />
        </MapView>
        <Button onPress={onOpen}>Actionsheet</Button>
        <Actionsheet isOpen={isOpen} onClose={onClose} >
          <Actionsheet.Content justifyContent="center">
            
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text style={styles.H1}>Confirmar punto de partida</Text>
            </Box>
            <Actionsheet.Item >
              <HStack justifyContent="center" mx={{
              base: "auto",
              md: "0"
              }} space={3}>
                  <Avatar bg="green.500" mr="1" source={{
                  uri: "https://bit.ly/broken-link"
                  }}>
                    NG
                  </Avatar>
                  <VStack space={2} alignItems="flex-start">
                      <Text>Jupiter 692</Text>
                      <Text>UCN CBO</Text>
                  </VStack>
                </HStack>
            </Actionsheet.Item>
            <Actionsheet.Item>
              <VStack alignItems="center">
                <Button backgroundColor={"#002333"} w="100%"
                 fontWeight= 'bold'
                 fontSize={32}
                 padding={4} marginTop={1} marginLeft={55} borderRadius={10}>
                  Comenzar viaje
                  </Button>
              </VStack>
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
        </View>

  );
}




//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  H1: {
    fontSize:20,
    flex: 1,
    flexDirection: 'column',
    fontWeight: 'bold' ,
    //backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
},
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});
