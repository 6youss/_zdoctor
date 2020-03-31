import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/values';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 40,
  },
  loginLogo: {
    width: 60,
    height: 60,
    resizeMode: 'center',
  },
  loginInput: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '100',
    marginVertical: 20,
  },
});
export default styles;
