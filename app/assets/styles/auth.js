import {StyleSheet} from 'react-native';
import {mainColor} from './variables';

export default authStyles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#0788e2", 
    justifyContent: "center"
  },
  centerWrapper: {
    alignItems: "center", 
    marginHorizontal: 40
  },
  logo: {
    width: "80%", 
    resizeMode: "contain", 
    marginBottom: 50
  },
  input: {
    width: "100%", 
    marginBottom: 20, 
    fontSize: 16, 
    color: "#fff"
  },
  loginBtn: {
    width: "100%", 
    backgroundColor: "white", 
    padding: 15, 
    borderRadius: 3
  },
  loginBtnText: {
    color: "#12a3e1", 
    fontSize: 16, 
    textAlign: "center"
  }
})