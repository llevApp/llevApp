import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {hubChat} from '../../../../../../services/common/hubChat';
import {hubWebSocket} from '../../../../../../services/common/hubWebSocket';
import {HUB_CHAT} from "@env";
const MessagesScreen = (data) => {
  const [messages, setMessages] = useState([]);
  const[messageWs,setmMessageWs]=useState(null);
  const {messagesPassenger} = hubWebSocket();
console.log(data?.params);
  useEffect(() => {
    let idUser = messagesPassenger?.user_id;
    console.log(idUser);
 
    setMessages([
      {
        _id: 1,
        text: 'Hola, en un segundo te respondo',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: require('../assets/users/user-1.jpg'),
        },
      }
    ]);
  }, []);

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

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        console.log(messages[0]?.text)
        onSend(messages)}}
        user={{
        _id: 1,
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

export default MessagesScreen;