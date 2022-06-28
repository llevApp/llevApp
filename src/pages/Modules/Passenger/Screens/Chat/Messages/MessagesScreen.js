import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {hubChat} from '../../../../../../services/common/hubChat';
import {hubWebSocket} from '../../../../../../services/common/hubWebSocket';
import {useStoreMessage} from "../../../../Passenger/TripDriver/Store/StoreConfirmTrip";
import {HUB_CHAT} from "@env";
const MessagesScreen = (data) => {
  const [messages, setMessages] = useState([]);
  const[idUser,setIdUser]=useState(messagesPassenger?.user_id);
  const[messageWs,setMessageWs]=useState(null);
  const {messagesPassenger} = hubWebSocket();
  const[activeWs,setActiveWs]=useState(false);
  const{connection:wsConection}=hubChat();

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }
/* Ws connection */
useEffect(() => {
  /* Create ws chat */
  if(idUser && useStoreMessage.getState().message){
    let wsChat = new WebSocket(HUB_CHAT+useStoreMessage.getState().message +'/'+ idUser);
    hubChat.getState().setConnection(wsChat);
    setActiveWs(true); 
     setMessages([
      {
        _id: useStoreMessage.getState().message,/* ReceiverId */
        text: '',
        createdAt: new Date(),
        user: {
          _id: idUser,/* sender ID */
          name: '',
          avatar: require('../assets/users/user-1.jpg'),
        },
      }
    ]);
  }
}, []);
useEffect(()=>{
  console.log(wsConection+' '+activeWs);
  if(wsConection && activeWs){
    console.log('entramos al ws');
    wsConection.onopen = () => {
    console.log('Open Connection');
    };
    wsConection.onmessage = (e) => {
      //console.log('Mensaje recibvido desde WS: '+e.data);
  /*     const json = JSON.parse(e.data);
      const message = json?.response;
      if(message?.status){
        setMessagesPassenger(e.data);
      }else{
        'Es la data que se envio por WS';
      } */
      const response = JSON.parse(e.data);
      console.log(response);
    var sentMessages =  
        {
          _id: response.receiverId,/* ReceiverId */
          text: response.message,
          createdAt: new Date(),
          user: {
            _id: response.senderId,/* sender ID */
            name: '',
            avatar: require('../assets/users/user-1.jpg'),
          },
        };
        setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, sentMessages),
      );
    };
    wsConection.onerror = (e) => {
      // an error occurred
      Alert.alert('Error in WS, '+ e.message);
    };
    wsConection.onclose = (e) => {
      // connection closed
      //console.log(e.code, e.reason);
      Alert.alert(e.code +' ' +e.reason);
    }; 
  }
},[activeWs]);
useEffect(() => {
  if(wsConection){
    let obj={
      "senderId":idUser,
      "receiverId":useStoreMessage.getState().message,
      "message":messageWs,
      "action":"message"
    }
    wsConection.send(JSON.stringify(obj));
  }
}, [messageWs]);


  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        setMessageWs(messages[0]?.text)
        onSend(messages)}}
        user={{
        _id: idUser,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default MessagesScreen;