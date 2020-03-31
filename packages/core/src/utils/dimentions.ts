import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export function screenWidth(percentage: number) {
  return width * (percentage / 100);
}

export function screenHeight(percentage: number) {
  return height * (percentage / 100);
}
