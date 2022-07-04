import React,{useEffect, useState} from 'react';

import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../../../../../../firebase';
import { useUserStore } from '../../../../Home/Store/StoreHome';
import { useTripsStore } from '../StoreTrip/StoreTrips';
import {URL_API,TRIPS_DRIVER,GET_TRIP_INFO} from "@env";
import {hubChat} from '../../../../../services/common/hubChat';
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

const ChatScreenDriver = () => {
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
const [Messages,setMessages]=useState(null);
const [idTrip,setIdTrip]=useState(null);
    const userImg = "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
    const {name,idUser} = useUserStore();

useEffect(()=>{
  if(idUser){
    fetch(URL_API+TRIPS_DRIVER+idUser)
    .then((response)=>response.json())
    .then((json)=>{
     if(json){ 
      setIdTrip(null);
        if(json?.length == 0){
        console.log('No tenemos viajes activos');
        }else{
          console.log('Tenemos un viaje activo');
          console.log(json?.trip[0].trip_id);
          setIdTrip(json?.trip[0].trip_id);
        }
      }else{
        console.log('No tenemos pasajeros');
      } 
    }
    
    )
    .catch((error)=>alert(error))
    .finally( ()=>console.log(''));
  }
},[idUser]);

useEffect(()=>{

  if(idTrip){
    console.log(URL_API+GET_TRIP_INFO+idTrip);
    fetch(URL_API+GET_TRIP_INFO+idTrip)
    .then((response)=>response.json())
    .then((json)=>{
     if(json){ 
        if(json?.length == 0){
          console.log('No tenemos pasajeros');
        }else{
          let objectPassenger = json?.map((passenger)=>{
             return {
              'id':passenger?.user_id,
              'userName':passenger?.user_name,
              'userImg':passenger?.uuid_fb,
              'messageText':'Hola, escribeme...'
             }
          })
          console.log(objectPassenger);
        setMessages(objectPassenger);
        }
      }else{
        console.log('No tenemos pasajeros');
      } 
    }
    
    )
    .catch((error)=>alert(error))
    .finally( ()=>console.log(''));
  }
},[idTrip]);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <FlatList 
          data={Messages}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card onPress={() =>{

              console.log(item?.userName,item?.userImg,item?.messageText);
            navigation.navigate('MessagesScreenDriver', {
              useId:item?.id,userName: item?.userName,userImg: item?.userImg,messageText:item.messageText
            })
            
           
            }
            }>
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

export default ChatScreenDriver;
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
  });