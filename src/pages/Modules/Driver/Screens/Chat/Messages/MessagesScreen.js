import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {hubChat} from '../../../../../../services/common/hubChat';
import {hubWebSocket} from '../../../../../../services/common/hubWebSocket';
import { useUserStore } from '../../../../../Home/Store/StoreHome';
import {HUB_CHAT} from "@env";
const MessagesScreenDriver = (data) => {
  const [messages, setMessages] = useState([]);
  const[activeWs,setActiveWs]=useState(false);
  const[messageWs,setmMessageWs]=useState(null);
  const {connection : wsConection,setMessageFromDriver} = hubChat();

const SendMessages = (value) =>{
    hubChat.getState().clearMessagesDriver();
    wsConection?.send(`${value}`);
};
  useEffect(() => {
    console.log('Estos son mis mensajes VISTA DRIVER');
    console.log(useUserStore.getState().idUser);
    console.log('Chat con quien quieres hablar');
    console.log(data?.route?.params?.useId);
    console.log(data?.route?.params?.userName);
    setMessages([
      {
        //_id: data?.route?.params?.useId,//Receiver Id
        _id: useUserStore.getState().idUser,
        text: 'Hola, en un segundo te respondo',
        createdAt: new Date(),
        user: {
          //_id: useUserStore.getState().idUser,//Sender Id
          _id: data?.route?.params?.useId,
          name: useUserStore.getState().name,
          avatar: require('../assets/users/user-1.jpg'),
        },
      }
    ]);
    console.log(HUB_CHAT+useUserStore.getState().idUser+'/'+data?.route?.params?.useId);
    let ws = new WebSocket(HUB_CHAT+useUserStore.getState().idUser+'/'+data?.route?.params?.useId);
    hubChat.getState().setConnection(ws);
    setActiveWs(true);
  }, []);

  useEffect(()=>{
    if(activeWs){
        //console.log('entramos al ws');
        wsConection.onopen = () => {
          console.log('Open WS DRIVER');
        };
        wsConection.onmessage = (e) => {
          // a message was received
        
          const result = JSON.parse(e.data);
          console.log('MENSAJE DESDE DRIVER');
          if(result?.senderId != useUserStore.getState().idUser){
                    //console.log('OnMessages->',JSON.stringify(result));
                    var sentMessages = {
                      _id:result?.receiverId,
                      //_id:result?.senderId,
                      text:result?.message,
                      createdAt: new Date(),
                      user:{
                        _id:result?.senderId,
                        //_id:result?.receiverId,
                        name: useUserStore.getState().name,
                        avatar: null
                      }
                    }
                    console.log(sentMessages);
                    setMessages((previousMessages) =>
                    GiftedChat.append(previousMessages, sentMessages)
                    );
          }

        }
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
/*   useEffect(()=>{
    wsConection?.onmessage = (e) => {
      // a message was received
      console.log('MENSAJE DESDE DRIVER',e);
      const result = JSON.parse(e.data);
      console.log('OnMessages->',JSON.stringify(result));
      var sentMessages = {
        _id:result?.receiverId,
        text:result?.message,
        createdAt: new Date(),
        user:{
          _id:result?.senderId,
          name: useUserStore.getState().name,
          avatar: null
        }
      }
      setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, sentMessages),
    );
    };
  },[]) */
  const onSend = useCallback((messages = []) => {
    let obj ={
      "senderId":useUserStore.getState().idUser,
      "receiverId":data?.route?.params?.useId,
      "message":messages[0].text,
      "action":"message"
    }
    wsConection?.send(JSON.stringify(obj));
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

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        console.log(messages[0]?.text);
        //SendMessages(messages[0]?.text);
        onSend(messages)
        }}
        user={{
        _id:  useUserStore.getState().idUser,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      placeholder='Escribir un mensaje'
      locale={"es-ES"}

    />
  );
};

export default MessagesScreenDriver;