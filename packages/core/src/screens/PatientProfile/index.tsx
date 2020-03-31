import React from "react";
import { View, Text, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { tokenSelector, patientSelector } from "../../redux/selectors";
import { ScreenContainer, Avatar } from "../../components";
import { Colors, bigShadow } from "../../utils/values";
import GoBack from "../../components/GoBack";
import Button from "../../components/Button";
import { signOutAction } from "../../redux/actions/userActions";
import styles from "./styles";
import { RouteComponentProps } from "react-router";

const PatientProfile: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const patient = useSelector(patientSelector);

  return (
    <ScreenContainer
      status={{ backgroundColor: Colors.primary, barStyle: "light-content" }}
      safeArea={{ style: { backgroundColor: Colors.primary } }}
    >
      <View style={{ backgroundColor: Colors.primary, padding: 20 }}>
        <GoBack
          color={Colors.white}
          onPress={() => {
            history.goBack();
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          borderRadius: 30,
          backgroundColor: Colors.white,
          padding: 20,
          paddingBottom: 50,
          position: "relative",
          marginHorizontal: 20,
          ...bigShadow
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Avatar style={{ margin: 20 }} />
          <Text
            style={{
              color: Colors.darkGray,
              fontWeight: "bold",
              margin: 7
            }}
          >{`${patient.firstName} ${patient.lastName}`}</Text>
        </View>
        <View style={{ alignItems: "center", padding: 20 }}></View>
        <View style={{ flex: 1, justifyContent: "flex-end", padding: 20 }}>
          <Button
            text="Se déconnecter"
            onPress={() => {
              dispatch(signOutAction());
            }}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default PatientProfile;
