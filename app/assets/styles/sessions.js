import {StyleSheet} from 'react-native';
import {mainTextColor, secondaryTextColor, lightGrey, mainColor, successColor} from './variables';

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
  showContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "white"
  },
  showHeader: {
    flex: 1,
    backgroundColor: mainColor,
    paddingTop: 15,
    paddingLeft: 70,
    paddingBottom: 40
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
    paddingTop: 25
  },
  showListElement: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row"
  },
  showListContent: {
    alignItems: "center",
    justifyContent: "center"
  },
  showListContentIcon: {
    width: 25,
    height: 25,
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  showListContentText: {
    fontSize: 16
  },
  showListTextSuccess: {
    fontSize: 16,
    color: successColor
  },
  showListTextPrimary: {
    fontSize: 16,
    color: mainColor
  }
})