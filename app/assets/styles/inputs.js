import {StyleSheet, Platform} from 'react-native';
import {lightGrey, secondaryTextColor} from './variables';

export default authStyles = StyleSheet.create({
  label: {
    color: secondaryTextColor,
    fontSize: 12,
    marginBottom: 4
  },
  input: {
    width: "100%",
    paddingBottom: 5,
    marginBottom: 20,
    borderBottomColor: lightGrey,
    borderBottomWidth: 1,
    fontSize: 16,
    color: "black"
  },
  inputLastChild: {
    width: "100%",
    paddingBottom: 5,
    marginBottom: 0,
    borderBottomColor: lightGrey,
    borderBottomWidth: 1,
    fontSize: 16,
    color: "black"
  },
  dateInput: {
    width: "100%",
    paddingBottom: 5,
    marginBottom: 20,
    borderBottomColor: lightGrey,
    borderBottomWidth: 1
  },
  textField: {
    fontSize: 16,
    color: "black"
  },
  secondaryFont: {
    color: secondaryTextColor,
    fontSize: 14
  },
  userField: {
    padding: 16,
    borderBottomColor: lightGrey,
    borderBottomWidth: 1
  }
})