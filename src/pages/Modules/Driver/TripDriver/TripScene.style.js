import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1, //the container will fill the whole screen.
        justifyContent: "flex-end",
        alignItems: "center",
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      H1: {
        fontSize:22,
        flex: 1,
        flexDirection: 'column',
        fontWeight: 'bold' ,
        //backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
      H2: {
        fontSize:14,
        fontWeight: 'bold' ,
    
      },
      location: {
        fontSize:10,
        fontStyle: 'italic',
        fontWeight: 'bold' ,
    
      },
      destination: {
        fontSize:12,
      },
      adress: {
        fontSize:12,
        fontStyle: 'italic',
        fontWeight: '300' ,
      },
      map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }
});
export default styles;