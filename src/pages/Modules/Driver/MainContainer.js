import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons, MaterialIcons , FontAwesome5} from "@expo/vector-icons";

// Screens
import HomeScreen from './Screens/HomeScreen';
import TripScreen from './Screens/TripScreen';
import AccountScreen from './Screens/AccountScreen';

//Screen names
const homeName = "Inicio";
const tripsName = "Viajes";
const accountName = "Cuenta";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
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
        screenOptions={{
          activeTintColor: '#159A9C',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 5, fontSize: 15 },
          style: { padding: 10, height: 40}
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={tripsName} component={TripScreen} />
        <Tab.Screen name={accountName} component={AccountScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;