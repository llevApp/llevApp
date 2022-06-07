import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons, MaterialIcons , FontAwesome5} from "@expo/vector-icons";
import { useUserStore } from '../../Home/Store/StoreHome'
// Screens
import HomeScreen from './Screens/HomeScreen';
import TripScreen from './Screens/TripScreen';
import AccountScreen from './Screens/AccountScreen';

//Screen names
const homeName = "Inicio";
const tripsName = "Historial de viajes";
const accountName = "Cuenta";

const Tab = createBottomTabNavigator();

function MainContainer() {
  const { name} = useUserStore(({ name }) => ({
    name
  }));
  useEffect(()=>{
    if(name){
   console.log(name);
  }   

  },[name]);
  return (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#159A9C",
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: {
            "paddingBottom": 5,
            "fontSize": 15
          },
          tabBarStyle: [
              {
                "display": "flex"
              },
              null
            ]
          ,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === tripsName) {
              iconName = focused ? 'map-marker' : 'map-marker-outline';

            } else if (rn === accountName) {
              iconName = focused ? 'account' : 'account-outline';
            }
            // You can return any component that you like here!
            return <MaterialCommunityIcons name={iconName} size={size} color={color}/>;
          },
        })}
        >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={tripsName} component={TripScreen} />
        <Tab.Screen name={accountName} component={AccountScreen} />
      </Tab.Navigator>

  );
}

export default MainContainer;