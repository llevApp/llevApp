import { Box, Image } from 'native-base'
import React, { useEffect } from 'react'
import { StyleSheet, ImageBackground, Text, TouchableOpacity, View } from 'react-native'

const alternativeAvatarUrl = "https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360"
const loadingAvatarUrl = "https://ajisenramenpanama.com/wp-content/uploads/2020/07/user_icon.png"
const loadingAvatarMapUrl = "https://fondosmil.com/fondo/4923.jpg"

export const AvatarUser = ({avatarURL, size: avatarSize}) => {
  
  return (
    <View style={styles.container}>
      <ImageBackground source={{uri: loadingAvatarUrl}} borderRadius={100000}>
        <Image alt="Ha ocurrido un error." source={{uri: avatarURL? avatarURL : alternativeAvatarUrl}} fallbackSource={{uri: alternativeAvatarUrl}} size={avatarSize?  avatarSize : 200} style={styles.image}/>
      </ImageBackground>
    </View>
  )
}

export const AvatarUserMap = ({avatarURL, size: avatarSize}) => {
  return (
    <View>
      <ImageBackground source={{uri: loadingAvatarMapUrl}} borderRadius={100000}>
        <Image alt="Ha ocurrido un error." source={{uri: avatarURL? avatarURL : alternativeAvatarUrl}} fallbackSource={{uri: alternativeAvatarUrl}} size={avatarSize?  avatarSize : 10} style={styles.image}/>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    /* padding:20,  */
    //minWidth: '100%', 
    //height: 'auto',
    //width: 'auto',
    
    shadow:'20', 
    /* justifyContent:'center', */
    alignItems:'center',
    /* alignSelf:'center', */
    borderRadius: 10000,

  },
  image: {
    borderRadius: 10000,
  }
})

export default AvatarUser