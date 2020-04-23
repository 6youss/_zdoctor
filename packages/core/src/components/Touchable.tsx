import React from "react";
import { TouchableOpacity, TouchableOpacityProps, ViewStyle, StyleProp } from "react-native";
import { smallShadow } from "../utils/globalStyles";

export type TouchableProps = TouchableOpacityProps & {
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  shadow?: boolean;
};

const Touchable: React.FC<TouchableProps> = ({ children, style, borderRadius = 5, shadow = false, ...props }) => {
  return (
    <TouchableOpacity {...props} style={[{ borderRadius }, shadow && smallShadow, style]}>
      {children}
    </TouchableOpacity>
  );
};
export default Touchable;
