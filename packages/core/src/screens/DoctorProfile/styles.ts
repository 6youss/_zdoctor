import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/values';
import {screenWidth} from '../../utils/dimentions';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
  },
  phoneText: {
    width: screenWidth(60),
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.secondary,
    letterSpacing: 2,
    margin: 20,
  },
  addressText: {
    width: screenWidth(60),
    textAlign: 'center',
    color: Colors.darkGray,
  },
});
export default styles;
