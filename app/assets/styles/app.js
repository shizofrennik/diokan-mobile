import {StyleSheet, Platform} from 'react-native';
import {mainColor} from './variables';

export default appStyles = StyleSheet.create({
  header: {
    backgroundColor: mainColor,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0
  },
  headerTitle: {
    color: "white",
    fontSize: 20
  },
  customHeader: {
    height: 55, 
    backgroundColor: mainColor, 
    justifyContent: "space-between", 
    flexDirection: "row", 
    paddingTop: (Platform.OS === 'ios') ? 26 : 16
  },
  customHeaderBody: {
    backgroundColor: mainColor, 
    minHeight: 180,
    flexDirection: "column"
  },
  customHeaderDropDown: {
    width: 195,
    paddingVertical: 5,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    right: 5,
    elevation: 5,
    shadowOffset: {width: 0, height: 0},
    shadowColor: "black",
    shadowOpacity: 0.5, 
    shadowRadius: 3,
    borderRadius: 5
  },
  customHeaderLeftIcon: {
    height: 25, 
    width: 25, 
    alignItems: "center", 
    justifyContent: "center", 
    marginLeft: 10
  },
  customHeaderRightIcon: {
    height: 25,
    width: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  }
})