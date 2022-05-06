import { StyleSheet} from 'react-native'
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    height:55,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 15,
    color:'#002333'
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#002333',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: '#4FC0B3',
    marginTop: 5,
    borderColor: '#159A9C',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#002333',
    fontWeight: '700',
    fontSize: 16,
  },
  imageContainer: {
    width:260,
    height:40,

  },
  logoContainer:{
  width: '100%',
  height: '120%'
  },

containerBox: {
    flex: 1,
  },
  image: {
    flex: 1
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
  }


  })
export default styles;