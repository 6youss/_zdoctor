import React from "react";
import { View, Text, Alert } from "react-native";
import styles from "./styles";
import { RouteComponentProps } from "react-router";
import { useSelector } from "react-redux";
import { tokenSelector } from "../../redux/selectors";
import { ScreenContainer, Avatar, Touchable, Button } from "../../components";
import { getSessionDetails } from "../../api/sessions";

import { ISessionDetails } from "../../types";
import { getStringFromDate } from "../../utils/zdate";
import defaultProfile from "../../assets/defaultProfile.jpg";
import { Colors } from "../../utils/values";
import GoBack from "../../components/GoBack";

const SessionDetail: React.FC<RouteComponentProps> = ({ history }) => {
  const accessToken = useSelector(tokenSelector);
  const sessionId = "2";
  // const sessionId = route.params.id;
  const [sessionDetails, setSessionDetails] = React.useState<ISessionDetails | undefined>(undefined);

  React.useEffect(() => {
    fetchSession();
  }, []);

  function fetchSession() {
    getSessionDetails(accessToken, sessionId)
      .then(sessionDetails => {
        setSessionDetails(sessionDetails);
        // Alert.alert('ahum', JSON.stringify(sessionDetails));
      })
      .catch(error => {
        Alert.alert("Oops!", error.message);
      });
  }

  if (!sessionDetails) return null;

  const [date, hour] = getStringFromDate(new Date(sessionDetails.date), true).split("T");

  return (
    <ScreenContainer
      status={{ backgroundColor: Colors.lightGray, barStyle: "dark-content" }}
      safeArea={{ style: { backgroundColor: Colors.lightGray } }}
    >
      <View style={styles.container}>
        <GoBack
          onPress={() => {
            history.goBack();
          }}
        />
        <Text style={styles.date}>{`Le ${date} à ${hour}`}</Text>
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
