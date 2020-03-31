import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/values';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
    backgroundColor: Colors.lightGray,
  },

  date: {
    color: Colors.darkGray,
    fontSize: 17,
    marginTop: 10,
    marginBottom: 20,
  },
  cardContainer: {
    position: 'relative',
    flexDirection: 'row',
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingBottom: 40,
    marginVertical: 10,
  },
  cardTexts: {
    color: Colors.darkGray,
    fontSize: 17,
    marginBottom: 8,
  },
  cardRight: {
    marginStart: 20,
  },
  seeMore: {
    position: 'absolute',
    color: Colors.primary,
    right: 20,
    bottom: 15,
  },
  pushToBottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 15,
  },
});
export default styles;
