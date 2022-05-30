import { Text, View, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button, Stack, ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { useUserStore } from '../../../../Home/Store/StoreHome';
import {GOOGLE_MAPS_APIKEY} from "@env";
import MapView from "react-native-maps";
import styles from './StyleWidgetHomePassenger';
import * as Location from 'expo-location';
const WidgetUserTrips = () => {

    const {name} = useUserStore();


    return(<>
        
        <Container style={styles.mainContainer}>
            <Box style={styles.mainBox}>
            <HStack justifyContent="space-between">
                <Heading  style={{fontSize:15, fontStyle:"italic"}}>A tu alrededor</Heading>
            </HStack> 
            <VStack space={290}>  
                <HStack justifyContent="space-between">  
            </HStack>
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
                </VStack>
            </Box>
      </Container>
</>
    );
}

export default WidgetUserTrips;