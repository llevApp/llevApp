import React,{useState,useEffect,useRef} from "react";
import {View ,TouchableOpacity, Text,Keyboard, Platform, KeyboardEvent, DatePickerIOS, DatePickerAndroid} from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import CountDown from 'react-native-countdown-component';
import styles from './TripScene.style';
import {useStoreTripDriver} from './Store/StoreScene';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FontAwesome5 } from '@expo/vector-icons'; 

import {GOOGLE_MAPS_APIKEY} from "@env";
import {
  Button,
  Actionsheet,
  Box,
  VStack,
  useDisclose,
  Modal,
  HStack,
  Heading,
} from 'native-base';
import { useNavigation } from '@react-navigation/core'
import moment from 'moment/min/moment-with-locales';
import { DatePicker } from '@react-native-community/datetimepicker';



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
  const { setOrigin,setDestination, origin} = useStoreTripDriver(({ setOrigin,setDestination,origin }) => ({
    setOrigin,setDestination,origin
  }));
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose(true);

  const [showModalDatePicker, setShowModalDatePicker] = useState(false);
  const [showModalPlacePicker, setShowModalPlacePicker] = useState(false);

  
  const bottomInset = useKeyboardBottomInset();
  const sendDataInit = () => {
    setVisible(false);
    navigation.replace("SceneTripInit");
  }
  const goSelectOrigin = () => {
    setVisible(false);
    navigation.replace("SceneSelectOrigin");
  }

  const [chosenDate, setChosenDate] = useState(new Date());
  const dateMoment = moment(chosenDate).locale('Es')
  const DatePickerTrip = () => {
    return <View style={styles.input}>
      {Platform.OS === 'ios' ? 
      <DatePickerIOS
      date={chosenDate}
      onDateChange={setChosenDate}
      //display="spinner"
      minuteInterval={5}
      minimumDate={new Date()}
      locale="es"
      //mode="datetime"
    /> : 
      <DatePicker
        date={chosenDate}
        onDateChange={setChosenDate}
        //display="spinner"
        minuteInterval={5}
        minimumDate={new Date()}
        locale="es"
        //mode="datetime"
      />
      }
      </View>
  }

  const ModalItemPlace = () => {
    return <View>
      <Box>
        <HStack justifyContent={"center"} alignItems={"center"}>
          <Box padding={2}>
            <FontAwesome5 name="map-marked-alt" size={24} color="black" />
          </Box>
          <Box left={5}>
            <Heading fontSize={15} color={"#A9A9AA"}>Origen</Heading>
            <Heading fontSize={18}>{origin? origin.description : "Sin definir"}</Heading>
          </Box>
        </HStack>
      </Box>
    </View>
  }

  const ModalItemDatetime = () => {
    return <View>
      <Box>
        <HStack justifyContent={"center"} alignItems={"center"}>
          <Box padding={2}>
            <FontAwesome5 name="clock" size={24} color="black"/>
          </Box>
          <Box left={5}>
          <Heading fontSize={15} color={"#A9A9AA"}>Hora de salida</Heading>
          <Heading fontSize={18}>{dateMoment.calendar()}</Heading>
          </Box>
        </HStack>
      </Box>
    </View>
  }

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const isDisabledButton =  origin? false : true;

      

  

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
        <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content bottom={bottomInset}>
              <Box w="100%" style={styles.containerBox}  justifyContent="center">
                <View style={styles.textContainer}>
                    <Text style={styles.H1}>Seleccionar punto de partida</Text>
                </View>
                <View style={styles.container}>
                <Actionsheet.Item onPress={() => goSelectOrigin()}>
                  <ModalItemPlace></ModalItemPlace>
                </Actionsheet.Item>
                <Actionsheet.Item onPress={() => setShowModalDatePicker(true)}>
                  <ModalItemDatetime></ModalItemDatetime>
                </Actionsheet.Item>
                <Modal isOpen={showModalDatePicker} onClose={() => setShowModalDatePicker(false)} >
                  <Modal.Content maxWidth="400px" bgColor={"#FFFFF9"} color={"#FFFFF9"}>
                    <Modal.CloseButton />
                    <Modal.Header>Define el horario de partida</Modal.Header>
                    <Modal.Body _scrollview={{scrollEnabled:false}}>
                        <DatePickerTrip></DatePickerTrip>
                    </Modal.Body>
                  </Modal.Content>
                </Modal>
                </View>
                <VStack alignItems="center" marginTop={10}>
                    <Button onPress={sendDataInit} style={styles.button} padding={5} isDisabled={isDisabledButton}>
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