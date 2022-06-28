import { Text, View, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button, Stack, Image, AspectRatio } from "native-base";
import { ImageBackground, StyleSheet } from "react-native";
import { useUserStore } from '../../../../Home/Store/StoreHome';
import { useNavigation } from '@react-navigation/core'
import AvatarUser from "../../../../../ui/avatarUser";
const WidgetUserInfo = () => {
    const backgrounImg = "https://media.istockphoto.com/photos/colorful-background-picture-id170094323?k=20&m=170094323&s=612x612&w=0&h=YEerCprCW1d4n0-XjGVxzQhAqfKmwluXLVJHhMpWAgs=";
    const defaultUserImg = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";    
    const navigation = useNavigation();
    const {name, careerName, avatarUrl, loadingChangeAvatar} = useUserStore();
    const onClick= ()=>{
        navigation.replace("TripScreen")
    }
    return(
        <>
            <Container style={styles.mainContainer} >
                <ImageBackground source={{uri: backgrounImg}} >
                    <Box style={styles.mainBox}>
                    <Center>
                        <HStack style={styles.info}>
                            <Box width={"65%"}> 
                                <VStack style={styles.info.content} space={1} >
                                    <Heading style={styles.text.career}>{careerName}</Heading>
                                    <Heading style={styles.text.name}>{name}</Heading>
                                    <Button rounded="full" onPress={onClick} style={styles.button}>Comenzar viaje</Button>
                                </VStack>
                            </Box>
                            {/* <Box size={"150px"}>
                                 <AvatarUser avatarURL={avatarUrl} size={"100%"}></AvatarUser>
                            </Box> */}
                           
                            <Avatar size={"2xl"} style={styles.image}
                                source={{uri: loadingChangeAvatar? defaultUserImg : avatarUrl || defaultUserImg}}>
                            </Avatar>
                        </HStack>
                    </Center>
                </Box>
                </ImageBackground>
            </Container>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        minWidth:'100%', 
        //height:'container',
        //flex: 0,
      /* backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center', */
    },
    mainBox: {
        padding:20, 
        minWidth: '100%', 
        shadow:'20', 
        justifyContent:'space-between',
    },
    info: {
        alignItems:'center', 
        justifyContent:'space-evenly',
        content: {
            alignItems:'flex-start',
        }
    },
    text: {
        name: {
            fontSize: 20,
            color: '#fff',
        },
        career: {
            fontSize: 15,
            fontStyle: 'italic',
            color: '#fff',
        },
    },
    button: {
        marginTop:5,
    },
    image: {
        borderColor: '#fff',
    },
  });
export default WidgetUserInfo;