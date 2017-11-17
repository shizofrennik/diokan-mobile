import {StyleSheet} from 'react-native';
import {mainTextColor, secondaryTextColor, lightGrey, mainColor} from './variables';

export default sessionStyles = StyleSheet.create({
  listElement: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomColor: lightGrey,
    borderBottomWidth: 1
  },
  listElementName: {
    color: mainTextColor,
    fontSize: 16
  },
  listElementNumbers: {
    color: secondaryTextColor,
    fontSize: 14
  },
  addBtn: {
    width: 56,
    height: 56,
    borderRadius: 50,
    backgroundColor: mainColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 25,
    right: 25
  },
  addBtnText: {
    color: 'white',
    fontSize: 42,
    position: 'relative',
    bottom: 1
  },
  showContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  showHeader: {
    flex: 1,
    backgroundColor: mainColor,
    paddingTop: 15,
    paddingLeft: 70
  },
  showHeaderTitle: {
    fontSize: 34,
    color: "white"
  },
  showHeaderDesc: {
    fontSize: 18,
    color: "white"
  },
  showBody: {
    flex: 3,
    backgroundColor: "white"
  }
})