import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Touchable, Avatar } from "../../components";
import MenuItem from "./MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { patientSelector } from "../../redux/selectors";
import { Colors } from "../../utils/globalStyles";
import { routes } from "../types";
import { signOutAction } from "../../redux/actions/userActions";
import { useAlert } from "../../components/Alert";

export interface MenuProps {
  navigate: any;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  itemsContainer: {
    padding: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  name: {
    color: Colors.darkGray,
    fontWeight: "bold",
    marginStart: 20,
    lineHeight: 24,
  },
  userType: {
    fontWeight: "100",
  },
});

const PatientMenu: React.FC<MenuProps> = ({ navigate }) => {
  const dispatch = useDispatch();
  const patient = useSelector(patientSelector);
  const alert = useAlert();
  return (
    <>
      <Touchable
        onPress={() => {
          navigate(routes.patientProfile);
        }}
        style={styles.itemsContainer}
      >
        <Avatar radius={40} />
        <Text style={styles.name}>
          {`${patient.firstName} ${patient.lastName}\n`}
          <Text style={styles.userType}>Patient</Text>
        </Text>
      </Touchable>
      <MenuItem
        onPress={() => {
          navigate(routes.findDoctor);
        }}
        active={false}
        iconName="home"
        label="Home"
      />
      <MenuItem
        onPress={() => {
          alert("Se déconnecter", "Etes-vous sur de vous déconnecter ?", [
            {
              text: "Oui",
              onPress: () => {
                dispatch(signOutAction());
              },
            },
            {
              text: "Annuler",
            },
          ]);
        }}
        active={false}
        iconName="exit-to-app"
        label="Se déconnecter"
      />
    </>
  );
};

export default PatientMenu;
