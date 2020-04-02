import React from "react";
import { View, Image, Alert } from "react-native";
import { postLogin, getUser } from "../../api/user";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "../../redux/actions/userActions";
import { ScreenContainer, Input } from "../../components";
import Button from "../../components/Button";
import logoWhite from "../../assets/logoWhite.png";
import { Colors } from "../../utils/values";
import styles from "./styles";
import { userTypeSelector } from "../../redux/selectors";
import { setDoctorAction } from "../../redux/actions/doctorActions";
import { setPatientAction } from "../../redux/actions/patientActions";

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>(__DEV__ ? (true ? "doctor" : "patient") : "");
  const [password, setPassword] = React.useState<string>(__DEV__ ? "123456" : "");

  function login() {
    setLoading(true);
    postLogin(username, password).then(
      async user => {
        const userProfile = await getUser(user.accessToken ?? "");
        if (user.userType === "doctor") {
          dispatch(setDoctorAction(userProfile.doctor));
        } else {
          dispatch(setPatientAction(userProfile.patient));
        }
        dispatch(signInAction(user));
        setLoading(false);
      },
      error => {
        Alert.alert("Oops!", error.message);
        setLoading(false);
      }
    );
  }

  return (
    <ScreenContainer status={{ backgroundColor: Colors.primary }}>
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <View style={{ alignItems: "center" }}>
            <Image style={styles.loginLogo} source={logoWhite} />
          </View>

          <Input
            value={username}
            onChangeText={text => {
              setUsername(text);
            }}
            style={styles.loginInput}
            placeholder="Nom d'utilisateur"
          />
          <Input
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
            style={[styles.loginInput, { marginBottom: 40 }]}
            placeholder="Mot de passe"
            secureTextEntry
          />
          <Button onPress={login} text="Login" light loading={loading} />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default Login;
