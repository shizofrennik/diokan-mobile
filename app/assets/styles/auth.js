import {StyleSheet, Platform} from 'react-native';
import {mainLightColor} from './variables';

export default authStyles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#0788e2", 
    justifyContent: "center"
  },
  centerWrapper: {
    justifyContent: "center",
    alignItems: "center", 
    marginHorizontal: 40,
    top: -30
  },
  logo: {
    width: "80%", 
    resizeMode: "contain",
    marginBottom: 50
  },
  input: {
    width: "100%",
    paddingBottom: 5,
    marginBottom: 20,
    borderBottomColor: mainLightColor,
    borderBottomWidth: 1,
    fontSize: 16, 
    color: "#fff"
  },
  inputLast: {
    width: "100%",
    paddingBottom: 5,
    marginBottom: 30,
    borderBottomColor: mainLightColor,
    borderBottomWidth: 1,
    fontSize: 16,
    color: "#fff"
  },
  loginBtn: {
    width: "100%", 
    backgroundColor: "white", 
    padding: 15, 
    borderRadius: 3,
    marginBottom: 15
  },
  loginBtnText: {
    color: "#12a3e1", 
    fontSize: 16, 
    textAlign: "center"
  }
})