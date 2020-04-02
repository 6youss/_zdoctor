import React from "react";
import { Colors } from "../../utils/values";
import styles from "./styles";
import Touchable, { TouchableProps } from "../Touchable";
import { MaterialIcons } from "../../libs/vector-icons";

const FloatingButton: React.FC<TouchableProps> = ({ ...props }) => {
  const { disabled } = props;
  return (
    <Touchable
      style={[styles.searchButton, disabled && { backgroundColor: Colors.lightGray }]}
      borderRadius={80}
      {...props}
    >
      <MaterialIcons
        name="search"
        size={27}
        style={{ textAlign: "center" }}
        color={disabled ? Colors.gray : Colors.primaryDark}
      />
    </Touchable>
  );
};
export default FloatingButton;
