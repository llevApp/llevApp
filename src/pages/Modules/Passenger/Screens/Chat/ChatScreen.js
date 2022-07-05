import React,{useEffect, useState} from 'react';

import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../../../../../../firebase';
import { useUserStore } from '../../../../Home/Store/StoreHome';
import { useTripsStore } from '../StoreTrip/StoreTrips';
import {URL_API,PASSENGER_TRIPS} from "@env";
import {hubChat} from '../../../../../services/common/hubChat';
import {hubWebSocket} from '../../../../../services/common/hubWebSocket';
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
import { View, Text, FlatList,StyleSheet } from 'react-native';
import {   
  VStack,
  Button,
  useDisclose,
  Image,
  HStack,Modal,Heading,Spinner} from "native-base";
const ChatScreen = () => {
    const navigation = useNavigation();
    const[titleChange,setTitleChange]=useState('Cargando Datos');
    const [showModal, setShowModal] = useState(true);
    const{messagesPassenger}=hubWebSocket();
    const backHome = ()=>{
      navigation.replace("Passenger");
    }
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
    const userImg = "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
    const {name,idUser} = useUserStore();

useEffect(()=>{
  if(idUser){
    fetch(URL_API+PASSENGER_TRIPS)
    .then((response)=>response.json())
    .then((json)=>{
      if(json){
        let response = json?.map((t)=>{
          if( t?.driver_id != idUser){
          return t;
        }
      });
      let filter = response.filter((v)=>v!=undefined);
        if(filter?.length == 0){
          setTitleChange('Ups no hay chats disponibles');
        }else{
          let newMessages = filter?.map((t)=>{
            return{
              id: t?.driver_id,
              userName: t?.name,
              userImg:`https://firebasestorage.googleapis.com/v0/b/llevapp.appspot.com/o/images%2Favatars%2F${t?.uuid_fb}.png?alt=media&token=7ae4bc5b-af55-4c54-b162-e065f2fa8af4`,
              messageTime: '',
              messageText:
                'Hola, en un segundo te respondo',
            }
          })
          setTitleChange('Tenemos un driver asignado');
          setMessages(newMessages);
        }
      }else{
        console.log('NO drivers!!');
        setTitleChange('Ups no hay chats disponibles');
      }
    })
    .catch((error)=>console.log(error))
    .finally( ()=>console.log(''));
  }
},[idUser,messagesPassenger]);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <FlatList 
          data={Messages}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card onPress={() =>{ 
                console.log(item?.userName,item?.userImg,item?.messageText);
              navigation.navigate('MessagesScreen', {
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
        {titleChange != 'Tenemos un driver asignado' ? (
          <Modal   isOpen={showModal} onClose={() => setShowModal(false)}  >
                    <Modal.Content maxWidth="400px" bgColor={"#FFFFF9"} color={"#FFFFF9" }>
                      <Modal.Body _scrollview={{scrollEnabled:false}}>
                      <VStack style={styles.titleHeader}>
                       <Heading style={styles.titleContent} color="#159A9C" fontSize="xl">
                        {titleChange}
                        </Heading>
                        {titleChange == 'Cargando Datos' ? 
                        (<Spinner accessibilityLabel="Loading posts"  size="lg"/>):
                        (null)
                        }
                      </VStack>
                      </Modal.Body>
                      {titleChange == 'Cargando Datos' ? 
                        (null):
                        ( <Modal.Footer>
                          <Button flex="1" colorScheme="red" onPress={() => {
                        backHome();
                        setShowModal(false);
                      }}>
                        Volver
                      </Button>
                           </Modal.Footer>)
                        }
                     
                    </Modal.Content>
          </Modal>

        ) : null}
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