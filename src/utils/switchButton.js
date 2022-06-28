import * as React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import { HStack, Switch } from 'native-base';
import useLoginStore from './../pages/Login/Store/storeLogin';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 


function SwitchButton({ screenName }) {
    // driver --- passenger
  const navigation = useNavigation();
  const {target, setTarget} = useLoginStore();
  const value = (target == "driver" ? false : true)

  const onChangeMethod = (value) => {
    let newTarget = ""
    let replace = ""
    if (value == false){ 
        newTarget = "driver"
        replace = "Driver"
    } else {
       newTarget = "passenger"
       replace = "Passenger"
    }

    console.log(replace,value)
    setTarget(newTarget);
    navigation.replace(replace);
  }
  return (
    <HStack space={1} alignItems='center'>
        <FontAwesome5 name="car" size={24} color="black" />
        <Switch value={value} offTrackColor="orange.100" onTrackColor="orange.200" onThumbColor="orange.500" offThumbColor="orange.50"
        onValueChange={value => onChangeMethod(value)}/>
        <MaterialIcons name="emoji-people" size={24} color="black" />
    </HStack>
    
  );
}

export default SwitchButton;


{/* <SwitchWithIcons
        icon={<Ionicons name="ios-arrow-back" size={24} color="black"/>}
        onValueChange={value => console.log(`Value has been updated to ${value}`)}
    /> */}