import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Touchable, Avatar } from "../../components";
import MenuItem from "./MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { doctorSelector } from "../../redux/selectors";
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

const DoctorMenu: React.FC<MenuProps> = ({ navigate }) => {
  const dispatch = useDispatch();
  const doctor = useSelector(doctorSelector);
  const alert = useAlert();
  return (
    <>
      <Touchable
        onPress={() => {
          navigate(routes.doctorProfile);
        }}
        style={styles.itemsContainer}
      >
        <Avatar radius={40} />
        <Text style={styles.name}>
          {`${doctor.firstName} ${doctor.lastName}\n`}
          <Text style={styles.userType}>Doctor</Text>
        </Text>
      </Touchable>
      <MenuItem
        onPress={() => {
          navigate(routes.doctorCalendar);
        }}
        active={false}
        iconName="home"
        label="Home"
      />
      <MenuItem
        onPress={() => {
          navigate(routes.doctorAvailibities);
        }}
        active={false}
        iconName="date-range"
        label="Disponibilités"
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

export default DoctorMenu;
