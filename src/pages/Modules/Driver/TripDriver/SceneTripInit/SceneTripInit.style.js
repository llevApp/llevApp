import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      H1: {
        fontSize:22,
        fontWeight: 'bold' ,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    input: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    textContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerBox: {
      width: '100%',
      height:380
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
      },
      buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
      },
      button: {
        backgroundColor: 'transparent',
        width: '100%',
        borderRadius: 10
       
      },
      buttonOff: {
        backgroundColor: '#FF5B5B',
        width: '100%',
        borderRadius: 10,
        marginTop:1
      },
      buttonOk: {
        backgroundColor: '#4FC0B3',
        width: '100%',
        borderRadius: 10,
        marginTop:1
      },
      buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#002333',
        borderWidth: 2,
      },
      buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
       
      },
      buttonText2: {
        color: '#002333',
        fontWeight: '700',
        fontSize: 16,
       marginBottom:20
      },
      buttonOutlineText: {
        color: '#002333',
        fontWeight: '700',
        fontSize: 16,
      },
});
export default styles;