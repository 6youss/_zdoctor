import React from "react";
import { Text, View, Image, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ScreenContainer, Input, Touchable, GoBack } from "../../components";
import styles from "./styles";
import { fetchDoctorByPhone } from "../../api/doctor";
import Avatar from "../../components/Avatar";
import Loader from "../../components/Loader";
import FloatingButton from "../../components/FloatingButton";
import doctorIllustration from "../../assets/doctorIllustration.jpg";
import { Colors, isWeb } from "../../utils/values";
import { doctorSelector, patientSelector } from "../../redux/selectors";
import { setDoctorAction } from "../../redux/actions/doctorActions";

import FoundDoctor from "./FoundDoctor";
import { IDoctor } from "../../../../../@types";
import { useUnifiedNavigation } from "../../navigation/useUnifiedNavigation";
import { useAlert } from "../../components/Alert";

const FindDoctor: React.FC = () => {
  const dispatch = useDispatch();
  const patient = useSelector(patientSelector);

  const [searchValue, setSearchValue] = React.useState<string>(__DEV__ ? "0781630358" : "");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [foundDoctor, setFoundDoctor] = React.useState<IDoctor | undefined>(undefined);
  const { navigate } = useUnifiedNavigation();
  const alert = useAlert();
  function handleSearchValue(text: string) {
    setSearchValue(text);
    setFoundDoctor(undefined);
  }

  async function findDoctor() {
    try {
      setLoading(true);
      const doctor = await fetchDoctorByPhone(searchValue);
      setFoundDoctor(doctor);
      dispatch(setDoctorAction(doctor));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Oops!", "Vérifier le numéro de téléphone et que vous êtes bien connecté à internet");
      console.log(error);
    }
  }

  return (
    <ScreenContainer safeArea={{ style: { paddingHorizontal: 0 } }}>
      <View style={styles.container}>
        <View style={[styles.searchContainer, isWeb && { paddingHorizontal: "5%" }]}>
          <View style={{ width: "100%", marginHorizontal: 20, marginVertical: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: Colors.white }}>
                <Text style={{ fontWeight: "100" }}>{foundDoctor ? `Médecin trouvé !` : `Trouvez votre médecin`}</Text>
                {/* {`${patient.firstName} ${patient.lastName}`} */}
              </Text>
              <Touchable
                borderRadius={30}
                onPress={() => {
                  navigate("/patient/profile");
                }}
                style={{ position: "absolute", right: 0, justifyContent: "center", alignItems: "center" }}
              >
                <Avatar radius={35} style={{ margin: 5 }} />
              </Touchable>
            </View>
          </View>
          <Input
            style={{ textAlign: "center" }}
            placeholder="Numéro du docteur"
            keyboardType="phone-pad"
            onChangeText={handleSearchValue}
            value={searchValue}
            onSubmitEditing={findDoctor}
            keyboardAppearance="dark"
            returnKeyType="search"
          />
        </View>

        {loading ? (
          <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
            <Loader />
          </View>
        ) : foundDoctor ? (
          <FoundDoctor
            {...foundDoctor}
            onPress={() => {
              navigate("/patient/reservation");
            }}
          />
        ) : (
          <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <Image style={styles.doctorIllustration} source={doctorIllustration} />
                {/* <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: Colors.darkGray,
                  }}
                >
                  Trouvez votre médecin
                </Text> */}
              </View>
            </TouchableWithoutFeedback>
          </>
        )}
        {!foundDoctor && (
          <View style={styles.pushToBottomCenter}>
            <FloatingButton disabled={loading || !searchValue} onPress={findDoctor} />
          </View>
        )}
      </View>
    </ScreenContainer>
  );
};

export default FindDoctor;
