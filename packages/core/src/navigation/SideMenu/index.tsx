import React from "react";
import { View, Text, Image } from "react-native";
import { isWeb, Colors } from "../../utils/values";
import { useUnifiedNavigation } from "../useUnifiedNavigation";
import { logoWhite } from "../../assets";

const SideMenu: React.FC<any> = ({ navigation }) => {
  let navigate = isWeb ? useUnifiedNavigation().navigate : navigation.navigate;

  return (
    <View>
      <View style={{ padding: 20, backgroundColor: Colors.primary, flexDirection: "row" }}>
        <Image source={logoWhite} resizeMode="contain" width={50} height={50} />
        <Text> ZDoctor </Text>
      </View>
      <Text>Drawer Items</Text>
    </View>
  );
};

export default SideMenu;
