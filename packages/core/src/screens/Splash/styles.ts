import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/values';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  logo: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -30}, {translateY: -30}],
    width: 60,
    height: 60,
  },
  bgLight: {
    height: '100%',
    width: '100%',
    opacity: 0.6,
  },
});
export default styles;
