import React from "react";
import { View, Text, Alert } from "react-native";
import styles from "./styles";
import { useSelector } from "react-redux";
import { tokenSelector } from "../../redux/selectors";
import { ScreenContainer, Avatar, GoBack, Button } from "../../components";
import { getSessionDetails } from "../../api/sessions";

import defaultProfile from "../../assets/defaultProfile.jpg";
import { Colors } from "../../utils/globalStyles";
import { ISessionDetails } from "../../../../../@types";
import { useUnifiedNavigation } from "../../navigation/useUnifiedNavigation";
import { useAlert } from "../../components/Alert";

const SessionDetail: React.FC = () => {
  const accessToken = useSelector(tokenSelector);
  const { params, goBack } = useUnifiedNavigation();
  const [sessionDetails, setSessionDetails] = React.useState<ISessionDetails | undefined>(undefined);
  const alert = useAlert();
  React.useEffect(() => {
    fetchSession();
  }, []);

  function fetchSession() {
    getSessionDetails(accessToken, params.id)
      .then((sessionDetails) => {
        setSessionDetails(sessionDetails);
        // alert("ahum", JSON.stringify(sessionDetails));
      })
      .catch((error) => {
        alert("Oops!", error.message);
      });
  }

  if (!sessionDetails) return null;

  return (
    <ScreenContainer
      status={{ backgroundColor: Colors.lightGray, barStyle: "dark-content" }}
      safeArea={{ style: { backgroundColor: Colors.lightGray } }}
    >
      <View style={styles.container}>
        <GoBack
          onPress={() => {
            goBack();
          }}
        />
        <Text style={styles.date}>{`Le ${new Date(sessionDetails.date).toLocaleString("fr")}`}</Text>
        <View style={styles.cardContainer}>
          <Avatar source={defaultProfile} />
          <View style={styles.cardRight}>
            <Text style={styles.cardTexts}>{sessionDetails?.patientDetails.firstName}</Text>
            <Text style={styles.cardTexts}>{sessionDetails?.patientDetails.lastName}</Text>
          </View>
          <Text style={styles.seeMore}>{"Fiche patient"}</Text>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTexts}>"Rédiger les sympthomes"</Text>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTexts}>"Rédiger les médicaments données "</Text>
        </View>

        <View style={styles.pushToBottom}>
          <Button text="Clôturer la session" onPress={() => {}} />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default SessionDetail;
