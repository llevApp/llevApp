import { Image } from 'native-base'
import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const AvatarUser = ({avatarURL, size, isUseMap}) => {
  const alternativeAvatarUrl = "https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360"
  return (
    <View style={styles.container}>
      <Image alt="Ha ocurrido un error." source={{uri: avatarURL? avatarURL : alternativeAvatarUrl}} fallbackSource={{uri: alternativeAvatarUrl}} size={size} style={styles.image}></Image>
      {/* <Avatar size={"2xl"}
        source={{uri: avatarURL }}>
      </Avatar> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    /* padding:20,  */
    minWidth: '100%', 
    shadow:'20', 
    /* justifyContent:'center', */
    alignItems:'center',
    /* alignSelf:'center', */
  },
  image: {
    borderRadius: 10000,
  }

})

export default AvatarUser