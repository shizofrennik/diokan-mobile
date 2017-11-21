import {StyleSheet} from 'react-native';
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
  }
})