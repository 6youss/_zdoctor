import React from "react";
import { View, Text } from "react-native";
import { foundStyles } from "./styles";
import { Colors } from "../../utils/values";

import { Avatar } from "../../components";
import Button from "../../components/Button";
import { IDoctor } from "../../../../../@types";

const FoundDoctor: React.FC<IDoctor & { onPress: () => void }> = ({ firstName, lastName, address, onPress }) => {
  return (
    <View style={foundStyles.container}>
      <Avatar style={{ marginBottom: 20 }} />
      <Text
        style={[foundStyles.descText, { fontWeight: "bold", color: Colors.primary }]}
      >{`Dr ${firstName} ${lastName}`}</Text>
      <Text style={[foundStyles.descText, { fontSize: 16 }]}>{address}</Text>
      <Button text="Prendre rendez-vous" onPress={onPress} style={{ paddingHorizontal: 40 }} />
    </View>
  );
};
export default FoundDoctor;
