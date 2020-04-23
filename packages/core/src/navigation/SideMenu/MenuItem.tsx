import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { logoWhite } from "../../assets";
import { MaterialIcons } from "../../libs/vector-icons";
import { Touchable } from "../../components";
import { Colors } from "../../utils/globalStyles";

export interface MenuItemProps {
  onPress: () => void;
  active: boolean;
  iconName: string;
  label: string;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 13,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    color: Colors.darkGray,
    marginStart: 10,
  },
});

const MenuItem: React.FC<MenuItemProps> = ({ onPress, active, iconName, label }) => {
  return (
    <Touchable
      style={styles.container}
      onPress={() => {
        onPress();
      }}
    >
      <MaterialIcons name={iconName} color={Colors.darkGray} size={18} />
      <Text style={styles.label}>{label}</Text>
    </Touchable>
  );
};

export default MenuItem;
