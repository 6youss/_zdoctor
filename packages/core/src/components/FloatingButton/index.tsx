import React from "react";
import { View } from "react-native";
import { Colors } from "../../utils/values";
import styles from "./styles";
import { Touchable } from "..";
import { TouchableProps } from "../Touchable";
import { MaterialIcons } from "../../libs/vector-icons";

const FloatingButton: React.FC<TouchableProps> = ({ ...props }) => {
  const { disabled } = props;
  return (
    <View style={styles.searchButtonContainer}>
      <Touchable borderRadius={80} {...props}>
        <View style={[styles.searchButton, disabled && { backgroundColor: Colors.lightGray }]}>
          <MaterialIcons
            name="search"
            size={27}
            style={{ textAlign: "center" }}
            color={disabled ? Colors.gray : Colors.primaryDark}
          />
        </View>
      </Touchable>
    </View>
  );
};
export default FloatingButton;
