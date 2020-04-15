import React from "react";
import { View, Image, Text } from "react-native";
import { postLogin, getUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { signInAction } from "../../redux/actions/userActions";
import { ScreenContainer, Input, GoBack, Touchable } from "../../components";
import Button from "../../components/Button";
import { Colors, isWeb } from "../../utils/values";
import styles from "./styles";
import { useAlert } from "../../components/Alert";
import { logoWhite } from "../../assets";
import { useUnifiedNavigation } from "../../navigation/useUnifiedNavigation";
import { Title } from "../../components";
import { IUser } from "../../../../../@types";
import { Formik, FormikHelpers } from "formik";
interface Values {
  userName: string;
  password: string;
  confirmPassword: string;
  userType: IUser["userType"];
}

const Singunp: React.FC = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { goBack } = useUnifiedNavigation();
  const initialValues: Values = { userName: "", password: "", confirmPassword: "", userType: "patient" };

  function onSubmit(values: Values, { setSubmitting }: FormikHelpers<Values>) {
    console.log({ values });
  }

  return (
    <ScreenContainer status={{ backgroundColor: Colors.primary }}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
          <>
            <View style={{ paddingVertical: 30 }}>
              <GoBack color={Colors.white} onPress={goBack}>
                <Image style={styles.loginLogo} resizeMode="contain" source={logoWhite} />
                <Button text="Suivant" onPress={handleSubmit} light />
              </GoBack>
            </View>
            <View style={styles.container}>
              <Title> Créer votre compte </Title>
              <View>
                <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "flex-start" }}>
                  <Text style={{ fontSize: 20, fontWeight: "100", color: Colors.whiteTransparent }}>
                    {"Vous êtes ?  "}
                    <Touchable
                      onPress={() => {
                        setFieldValue("userType", "patient", false);
                      }}
                      style={[values.userType === "patient" && styles.activeUserType]}
                    >
                      <Text> {" Patient "} </Text>
                    </Touchable>
                    <Touchable
                      onPress={() => {
                        setFieldValue("userType", "doctor", false);
                      }}
                      style={[values.userType === "doctor" && styles.activeUserType]}
                    >
                      <Text> {" Docteur "} </Text>
                    </Touchable>
                  </Text>
                </View>
                <Input
                  value={values.userName}
                  onChangeText={handleChange("userName")}
                  style={styles.loginInput}
                  placeholder="Nom d'utilisateur"
                  returnKeyType="next"
                />
                <Input
                  value={values.password}
                  onChangeText={handleChange("password")}
                  style={[styles.loginInput]}
                  placeholder="Mot de passe"
                  secureTextEntry
                />
                {/* <Button onPress={login} text="S'inscrire" light loading={loading} style={{ width: "100%", maxWidth: 400 }} /> */}
              </View>
            </View>
          </>
        )}
      </Formik>
    </ScreenContainer>
  );
};

export default Singunp;
