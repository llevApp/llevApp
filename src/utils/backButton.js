import * as React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 

function BackButton({ screenName }) {
  const navigation = useNavigation();

  return (
    <Ionicons name="ios-arrow-back" size={24} color="black" onPress={() => navigation.navigate(screenName)}/>
/*     <Button onPress={() => navigation.navigate(screenName)} title="AAA">AAAA</Button>
 */  );
}

export default BackButton;