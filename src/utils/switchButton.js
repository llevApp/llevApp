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
  const color = (target == "driver" ?  "#159A9C":"#ffd670")
  const carColor = (target == "driver" ?  "#5cbcd2":"#black")
  const peopleColor = (target == "driver" ?  "#black":"#ff9770")
  const carSize = (target == "driver" ?  38:24)
  const peopleSize = (target == "driver" ? 26:40)
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

    //console.log(replace,value)
    setTarget(newTarget);
    navigation.replace(replace);
  }
  return (
    <HStack space={1} alignItems='center'>
        <FontAwesome5 name="car" size={carSize} color={carColor} />
        <Switch value={value} offTrackColor={color} onTrackColor={color}
        onValueChange={value => onChangeMethod(value)}/>
        <MaterialIcons name="emoji-people" size={peopleSize} color={peopleColor} />
    </HStack>
    
  );
}

export default SwitchButton;


{/* <SwitchWithIcons
        icon={<Ionicons name="ios-arrow-back" size={24} color="black"/>}
        onValueChange={value => console.log(`Value has been updated to ${value}`)}
    /> */}