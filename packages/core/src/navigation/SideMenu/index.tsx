import React from "react";
import { View, Text } from "react-native";
import { isWeb } from "../../utils/values";
import { useUnifiedNavigation } from "../useUnifiedNavigation";

const SideMenu: React.FC<any> = ({ navigation }) => {
  const { navigate } = useUnifiedNavigation();

  return (
    <View>
      <Text>Drawer</Text>
    </View>
  );
};

export default SideMenu;
