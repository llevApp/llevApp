import { Text, View, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button, Stack } from "native-base";

const WidgetUserTrips = () => {

    return(<>
        <Container>
            <Box minWidth={"90%"}  alignContent="space-between" alignItems="stretch" justifyContent="space-between"
            borderColor={"#FA3"} borderRadius={10} rounded="xl" padding={5} borderWidth={1.5}> 
                <VStack space={4}>
                    <HStack justifyContent="space-between">
                        <Heading  style={{fontSize:15, fontStyle:"italic"}}>Historial de viajes</Heading>
                        <Button size="sm" variant="ghost">Ver todos</Button>
                    </HStack>
                    <Box width={"100%"}> 
                        <Box bg="#DEEFE7" rounded="md" width="100%" alignContent="space-between" >
                            <HStack padding={3} alignContent="space-between" alignItems={"stretch"} justifyContent="space-between">
                                <Heading fontSize={15}>Aporte </Heading>
                                <Text style={{fontSize:15, fontStyle:"italic"}}>$ 1.000</Text>
                            </HStack>
                        </Box>
                        <Box bg="#DEEFE7" rounded="md" width="100%" alignContent="space-between">
                            <HStack padding={3} alignContent="space-between" alignItems={"stretch"} justifyContent="space-between">
                                <Heading fontSize={15}>Aporte </Heading>
                                <Text style={{fontSize:15, fontStyle:"italic"}}>$ 1.000</Text>
                            </HStack>
                        </Box>
                    </Box>
                </VStack>
            </Box>
      </Container>
</>
    );
}

export default WidgetUserTrips;