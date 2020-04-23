import React from "react";
import { View, Text, Image } from "react-native";
import { isWeb } from "../../utils/values";
import { useUnifiedNavigation } from "../useUnifiedNavigation";
import { logoWhite } from "../../assets";
import styles from "./styles";
import { useSelector } from "react-redux";
import { userTypeSelector } from "../../redux/selectors";
import PatientMenu from "./Menu.patient";
import DoctorMenu from "./Menu.doctor";

const SideMenu: React.FC<any> = ({ navigation }) => {
  const userType = useSelector(userTypeSelector);

  let navigate = isWeb ? useUnifiedNavigation().navigate : navigation.navigate;

  return (
    <View style={styles.container}>
      <View style={styles.headerCont}>
        <View style={styles.logoCont}>
          <Image source={logoWhite} resizeMode="contain" style={styles.logo} />
        </View>
        <Text style={styles.headerText}>
          Z<Text style={styles.headerText2}>DOCTOR</Text>
        </Text>
      </View>
      {userType === "patient" ? <PatientMenu navigate={navigate} /> : <DoctorMenu navigate={navigate} />}
    </View>
  );
};

export default SideMenu;
