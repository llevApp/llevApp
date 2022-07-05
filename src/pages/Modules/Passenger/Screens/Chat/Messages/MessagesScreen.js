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
    // enter your websocket url
    ws.current = new WebSocket(HUB_CHAT+data?.route?.params?.useId+'/'+useUserStore.getState().idUser);
    ws.current.onopen = () => {
      console.log("connect init");
    };
    ws.current.onmessage = e => {
      const response = JSON.parse(e.data);
      if( response.senderId != useUserStore.getState().idUser){
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
      console.log("connection close");
    }
    return () => {
      ws.current.close();
    };
  }, [])

  useEffect(() => {
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
    let obj = {
      "_id":messages[0]._id,
      "senderId": senderId,
      "receiverId": receiverId,
      "message": messages[0].text,
      "action": "message"
    }
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