import { Text, View, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button, Stack, Image, AspectRatio } from "native-base";
import { ImageBackground } from "react-native";

const WidgetUserInfo = () => {
    const backgrounImg = "https://media.istockphoto.com/photos/colorful-background-picture-id170094323?k=20&m=170094323&s=612x612&w=0&h=YEerCprCW1d4n0-XjGVxzQhAqfKmwluXLVJHhMpWAgs=";
    const userImg = "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
    
    return(
        <>
        <Text>a</Text>
            <Container minWidth={"100%"} height={'50%'}>
            <ImageBackground source={{uri: backgrounImg}}>
                <Box height="100%" minWidth={"100%"} w="100%" shadow="2" justifyContent="space-evenly">
                <Center>
                    <HStack alignItems="center" justifyContent="space-evenly">
                        <Box width={"65%"}> 
                        <VStack space={4} alignItems="flex-start">
                            <Heading  style={{fontSize:15, fontStyle:"italic"}}>Ing civil en computacion e Informatica</Heading>
                            <Heading>Sebastian Garcia</Heading>
                            <Button rounded={"full"}>Comenzar viaje</Button>
                        </VStack>
                        </Box>
                        <Avatar bg="cyan.500" size={"xl"}
                            source={{uri: userImg
                        }}>
                            XD
                        </Avatar>
                    </HStack>
                </Center>
            </Box>
            </ImageBackground>
            <Text>a</Text>
        </Container>
        </>
    );
}

export default WidgetUserInfo;