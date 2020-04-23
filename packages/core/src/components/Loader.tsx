import React from "react";
import { ActivityIndicator } from "react-native";
import { Colors } from "../utils/globalStyles";

const Loader: React.FC<{ color?: string; duration?: number }> = ({ color = Colors.primary }) => {
  return <ActivityIndicator color={color} size="small" />;
};
export default Loader;
