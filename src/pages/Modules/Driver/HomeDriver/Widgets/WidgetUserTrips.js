import { Text, View, Center, Container, Heading, Avatar, Divider, Box, HStack, NativeBaseProvider, VStack, Button, Stack, ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { useUserStore } from '../../../../Home/Store/StoreHome';
import { useTripsStore } from './../../Screens/StoreTrip/StoreTrips';

const WidgetUserTrips = () => {

    const {name} = useUserStore();
    const {tripsArray} = useTripsStore()

    const TripCard = (trip) => {
        return (
            <>
                <Box width={"100%"} style={styles.tripCard.container}> 
                    <Box style={styles.tripCard.header} >
                        <Heading fontSize={15}>Aporte </Heading>
                        <Text style={{fontSize:15, fontStyle:"italic"}}>{trip.recentText}</Text>
                    </Box>
                    <Box /* bg="#DEEFE7" */ rounded="md" width="100%" alignContent="space-between">
                        <VStack padding={3} alignContent="space-between" alignItems={"stretch"} justifyContent="space-between">
                            <Box>
                                <Heading style={styles.tripCard.text.title}>Pasajero</Heading>
                                <Heading style={styles.tripCard.text.value}>{trip.driver}</Heading>
                            </Box>
                            <Box>
                                <Heading style={styles.tripCard.text.title}>Ubicación</Heading>
                                <Heading style={styles.tripCard.text.value}>{trip.address?.toUpperCase()}</Heading>
                            </Box>
                        </VStack>
                    </Box>
                </Box>
            </>
        );
    };

    return(<>
        
        <Container style={styles.mainContainer}>
            <Box style={styles.mainBox}> 
                <VStack space={4}>
                    <HStack justifyContent="space-between">
                        <Heading  style={{fontSize:15, fontStyle:"italic"}}>A tu alrededor</Heading>
                        <Button size="sm" variant="ghost">Ver todos</Button>
                    </HStack>
                    <ScrollView >
                        <Box style={styles.mainBox.scroll}>
                        {tripsArray?.map((trip)=>{return (<TripCard key={trip?.id} {...trip}></TripCard>)})}
                        </Box>
                    </ScrollView>
                    
                </VStack>
            </Box>
      </Container>
</>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
    },
    mainBox: {
        padding:20, 
        shadow:'20', 
        backgroundColor:'#ffffff',
        justifyContent:'space-between',
        alignContent:'space-between',
        alignItems:'stretch',

        minWidth:'100%',
        
        rounded:'xl',
        borderColor:'#B4BEC9', 
        borderRadius:10,
        borderWidth:1,

        /* shadowOffset:10,
        shadowRadius:5,
        shadow:5, */
        
        scroll: {
           space: '10px', 
        }
        
    },

    tripCard: {
        container: {
            //flex:1,
            rounded:'xl',
            borderColor:'#B4BEC9', 
            borderRadius:10,
            borderWidth:1,
            padding:10,
            marginTop:10,
        },
        header: {
            backgroundColor: '#F5F5FF',
            rounded: 10,
            justifyContent:'space-around',
            alignContent:'space-between',
            //alignItems:'stretch',
            flexDirection: 'row',
            rounded:'xl',
            padding:10,
        },
        text:{
            title: {
                fontSize: 15,
                //fontStyle: '',
                color: '#A9A9AA',
            },
            value: {
                fontSize: 15,
                //color: '#fff',
            }
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

export default WidgetUserTrips;