import { Text, View, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button, Stack, Image, AspectRatio } from "native-base";
import { ImageBackground, StyleSheet } from "react-native";
import { useUserStore } from '../../../../Home/Store/StoreHome';
import { useNavigation } from '@react-navigation/core'
import AvatarUser from "../../../../../ui/avatarUser";
const WidgetUserInfo = () => {
    const backgrounImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgngr5yRtG0kBHhQRVS41ImU7AdCua8tZ0JpaHOzaexCoZEsTseJA6xq-peEJpY_js7F4&usqp=CAU";
    const navigation = useNavigation();
    const {name, careerName, avatarUrl} = useUserStore();
    const onClick= ()=>{
        navigation.replace("TripScreenPassenger")
    }
    return(
        <>
            <Container style={styles.mainContainer} >
                <ImageBackground source={{uri: backgrounImg}}  borderRadius={5} >
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
                            <AvatarUser avatarURL={avatarUrl} size={'xl'}></AvatarUser>

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
        backgroundColor:'#ff9770',
    },
    image: {
        borderColor: '#fff',
    },
  });
export default WidgetUserInfo;