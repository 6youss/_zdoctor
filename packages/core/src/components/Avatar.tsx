import React from 'react';
import {StyleSheet, Image, ImageStyle, View} from 'react-native';
import defaultProfile from '../assets/defaultProfile.jpg';

const Avatar: React.FC<{
  source?: string;
  radius?: number;
  style?: ImageStyle;
}> = ({source = defaultProfile, radius = 55, style}) => {
  return (
    <Image
      source={source}
      style={[{width: radius, height: radius, borderRadius: radius}, style]}
    />
  );
};
export default Avatar;
