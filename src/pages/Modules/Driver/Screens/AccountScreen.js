import * as React from 'react';
import { Text, View, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button } from "native-base";
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import styles from '../../../Home/StyleHome'
import { auth } from '../../../../../firebase';
import { useUserStore } from '../../../Home/Store/StoreHome';
export default function AccountScreen() {
    const navigation = useNavigation();
    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            useUserStore.getState().clearAll();
            navigation.replace("Login")
          })
          .catch(error => alert(error.message))
      }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Heading>Su cuenta mi rey</Heading>
            <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
        </View>
    );
}