import React, {useState, useEffect, useCallback,useRef} from 'react';
import {  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
  TouchableOpacity} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {hubChat} from '../../../../../../services/common/hubChat';
import {hubWebSocket} from '../../../../../../services/common/hubWebSocket';
import {HUB_CHAT} from "@env";
import { useUserStore } from '../../../../../Home/Store/StoreHome';
import { useNavigation } from '@react-navigation/core';
const MessagesScreen = (data) => {
  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }
  const navigation = useNavigation()
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] =useState(useUserStore.getState().idUser)
  const [receiverId, setReceiverId] =  useState(data?.route?.params?.useId)
  const [name, setName] = useState(data?.route?.params?.userName)
  const [image_path, setImage_path] = useState(data?.route?.params?.userImg)
  const ws = useRef(null);

  useEffect(() => {
    console.log("Iniciamos conexion: ", HUB_CHAT+data?.route?.params?.useId+'/'+useUserStore.getState().idUser);
    // enter your websocket url
    ws.current = new WebSocket(HUB_CHAT+data?.route?.params?.useId+'/'+useUserStore.getState().idUser);
    ws.current.onopen = () => {
      console.log("conexion establecida")
    };
    ws.current.onmessage = e => {
      const response = JSON.parse(e.data);
      console.log("onmessage=>", JSON.stringify(response));
      if( response.senderId != useUserStore.getState().idUser){
        /* 
              {
        _id: '123123123123',
        senderId: senderId,// receiver id
        text: 'Hola mi nombre es '+ data?.route?.params?.userName + ' y soy tu conductor.',
        createdAt: new Date(),
        user: {
          _id: receiverId,  // sender id
          name: name,
          avatar: image_path,
        },
      },
        
        */
        /* 
              "_id":messages[0]._id,
      "senderId": senderId,
      "receiverId": receiverId,
      "message": messages[0].text,
      "action": "message" */
        var sentMessages = {
          _id: response._id,
          senderId: response.receiverId,
          text: response.message,
          createdAt: new Date(),
          user: {
            _id: response.senderId,
            name: name,
            avatar: image_path,
          },
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, sentMessages))
      }
    };
    ws.current.onclose = () => {
      console.log("connection cerrada");
    }
    return () => {
      ws.current.close();
    };
  }, [])

  useEffect(() => {

    /* 
          "senderId": senderId,
      "receiverId": receiverId,
      "message": messages[0].text,
      "action": "message"
      */
    setMessages([
      {
        _id: '123123123123',
        senderId: senderId,// receiver id
        text: 'Hola mi nombre es '+ data?.route?.params?.userName + ' y soy tu conductor.',
        createdAt: new Date(),
        user: {
          _id: receiverId,  // sender id
          name: name,
          avatar: image_path,
        },
      },
    ])
  }, [])



  const onSend = useCallback((messages) => {
    console.log("mesagge:", messages);
    /*  "_id": "6501e3d1-2ebc-4f43-b6e8-11fc87e7c703",
     */
    let obj = {
      "_id":messages[0]._id,
      "senderId": senderId,
      "receiverId": receiverId,
      "message": messages[0].text,
      "action": "message"
    }
    console.log('Enviado desde Vista Pasajero',obj);
    ws.current.send(JSON.stringify(obj))
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
  return (
    <View style={styles.container}>
    <View style={{
      padding: 15,
      marginTop: 50,
      backgroundColor: "#0097db",
      alignItems: "center",
      justifyContent: 'center',
      width: '100%'
    }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: 10,
          borderColor: "#fff",
          borderWidth: 1,
          padding: 7,
          borderRadius: 10
        }}
        onPress={() => {
          navigation.goBack()
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: "#fff",
          }}
        >{`Volver`}</Text>
      </TouchableOpacity>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        color: "#fff"
      }}>{`Chat `}</Text>
    </View>
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id:  senderId,
      }}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      placeholder='Escribir un mensaje'
      locale={"es-ES"}
      isKeyboardInternallyHandled={true}
    />
  </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
export default MessagesScreen;