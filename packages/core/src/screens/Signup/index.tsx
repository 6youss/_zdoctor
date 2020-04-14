import React from "react";
import { View, Image } from "react-native";
import { postLogin, getUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { signInAction } from "../../redux/actions/userActions";
import { ScreenContainer, Input } from "../../components";
import Button from "../../components/Button";
import { Colors } from "../../utils/values";
import styles from "./styles";
import { setDoctorAction } from "../../redux/actions/doctorActions";
import { setPatientAction } from "../../redux/actions/patientActions";
import { useAlert } from "../../components/Alert";
import { logoWhite } from "../../assets";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>(__DEV__ ? (false ? "doctor" : "patient") : "");
  const [password, setPassword] = React.useState<string>(__DEV__ ? "123456" : "");

  function login() {
    setLoading(true);
    postLogin(username, password).then(
      async (user) => {
        const userProfile = await getUser(user.accessToken ?? "");
        if (user.userType === "doctor") {
          dispatch(setDoctorAction(userProfile.doctor));
        } else {
          dispatch(setPatientAction(userProfile.patient));
        }
        dispatch(signInAction(user));
        setLoading(false);
      },
      (error) => {
        alert("Oops!", error.message);
        setLoading(false);
      }
    );
  }

  return (
    <ScreenContainer status={{ backgroundColor: Colors.primary }}>
      <View style={styles.container}>
        <Image style={styles.loginLogo} resizeMode="contain" source={logoWhite} />

        <Input
          value={username}
          onChangeText={(text) => {
            setUsername(text);
          }}
          style={styles.loginInput}
          placeholder="Nom d'utilisateur"
          returnKeyType="next"
        />
        <Input
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          style={[styles.loginInput, { marginBottom: 40 }]}
          placeholder="Mot de passe"
          secureTextEntry
          onSubmitEditing={login}
        />
        <Button onPress={login} text="S'inscrire" light loading={loading} style={{ width: "100%", maxWidth: 400 }} />
      </View>
    </ScreenContainer>
  );
};

export default Login;
