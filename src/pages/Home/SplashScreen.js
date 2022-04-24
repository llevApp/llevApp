import React,{useEffect,useRef} from 'react';
import { ImageBackground,View,Image ,Animated} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../../../img/logo.png';
import background from '../../../img/background.png';


export default function SplashScreen(){
    //Safe area value
    const edges = useSafeAreaInsets();
    //Animation Values
    const startAnimation = useRef( new Animated.Value(0)).current;
//useEffect change animation
    useEffect(() => {
   
        setTimeout( ()=>{
       //Sequence animation
            Animated.sequence([
                Animated.timing(
                    startAnimation,{
                        toValue:100,
                        useNativeDriver:true
                    }
                )
            ]).start();
        },500);
    }, [])



    return (
    <Animated.View style={styles.containerViewHome} >
     <ImageBackground source={background} resizeMode="cover" style={styles.image}>
    <Animated.View style={{
         flex:1,
        alignItems:'center',
        justifyContent:'center',
        transform:[
            {translateY:startAnimation}
        ]
    }}>
        <View style={styles.imageContainer}>
        <Image  style={styles.logoContainer}  source={Logo} />
        </View>
        </Animated.View>
        </ImageBackground>
    </Animated.View>
    
    );
}
const styles =({
    imageContainer: {
        width:300,
        height:50,
        alignItems: 'center'
    },
    container: {
        flex: 1,
      },
      image: {
        flex: 1,
        justifyContent: "center"
      },
      text: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0"
      },
      containerViewHome:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0
      },
      animatedView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      },
      logoContainer:{
        width: '100%',
        height: '100%'
      }
  });
