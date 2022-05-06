import { Text, View, StyleSheet, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, AspectRatio } from "native-base";

export default function HomeDriver() {
    //create our styling code:

    return <>
    <NativeBaseProvider bg="#FFF" style={{flex: 1, justifyContent: "space-evenly", alignItems: "center", }}>
    <Center >
      <Container minWidth={"100%"}>
      <AspectRatio>
      <Box height="200" minWidth={"100%"} w="100%" shadow="2" bg="emerald.200">
                
            
            </Box>
      </AspectRatio>
        <Heading marginTop={20} margin={"10%"}>
          A component library for the
          <Text color="emerald.500">React Ecosystem</Text>
        </Heading>
        <Text mt="3" fontWeight="medium" margin={"10%"}>
          NativeBase is a simple, modular and accessible component library that
          gives you building blocks to build you React applications.
        </Text>
            <Box height="200" minWidth={"100%"} w="100%" shadow="2" bg="emerald.200">
                <HStack alignItems="center">
                    <Box width={"60%"}>
                        
                    </Box>
                    <Avatar bg="cyan.500" size={"xl"} top="50"
                        source={{uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    }}>
                        XD
                    </Avatar>
                </HStack>
            
            </Box>
      </Container>
    </Center>
    </NativeBaseProvider>
    </>
}

