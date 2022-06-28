import { Text, View, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button, Stack, Image, AspectRatio } from "native-base";
import { ImageBackground, StyleSheet } from "react-native";
import { useUserStore } from '../../../../Home/Store/StoreHome';
import { useNavigation } from '@react-navigation/core'
const WidgetUserInfo = () => {
    const backgrounImg = "https://media.istockphoto.com/photos/colorful-background-picture-id170094323?k=20&m=170094323&s=612x612&w=0&h=YEerCprCW1d4n0-XjGVxzQhAqfKmwluXLVJHhMpWAgs=";
    const defaultUserImg = "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
    const navigation = useNavigation();
    const {name, careerName, avatarUrl, loadingChangeAvatar} = useUserStore();
    const onClick= ()=>{
        navigation.replace("TripScreenPassenger")
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
                                    <Button rounded="full" onPress={onClick} style={styles.button}>Buscar viaje</Button>
                                </VStack>
                            </Box>
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