import { StyleSheet } from 'react-native'
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
        minHeight:'50%',
        maxHeight:'100%',
        minWidth:'100%',
        
        rounded:'xl',
        borderColor:'#B4BEC9', 
        borderRadius:10,
        borderWidth:1,
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
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
});
export default styles;