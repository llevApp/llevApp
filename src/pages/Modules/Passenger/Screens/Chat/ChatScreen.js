import * as React from 'react';

import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../../../../../../firebase';
import { useUserStore } from '../../../../Home/Store/StoreHome';
import { useTripsStore } from '../StoreTrip/StoreTrips';
import {Container,
    Card,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    UserName,
    PostTime,
    MessageText,
    TextSection} from './ChatScreen.style';
import { View, Text, Button, FlatList,StyleSheet } from 'react-native';
const Messages = [
    {
      id: '1',
      userName: 'Dionisio Olivares',
      userImg: require('./assets/users/user-1.jpg'),
      messageTime: '4 mins ago',
      messageText:
        'Wena ctm',
    }
  ];
const ChatScreen = () => {
    const navigation = useNavigation();
    const handleSignOut = () => {
      auth
        .signOut()
        .then(() => {
          useUserStore.getState().clearAll();
          useTripsStore.getState().clearAll();
          navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    };

    const userImg = "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
    const {name} = useUserStore();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <FlatList 
          data={Messages}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('MessagesScreen', {userName: item.userName,userImg: item.userImg,messageText:item.messageText})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={item.userImg} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.messageText}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
        </View>
    );
}

export default ChatScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
  });