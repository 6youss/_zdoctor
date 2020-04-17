import React from "react";
import { View, Image, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ScreenContainer, Input } from "../../components";
import Button from "../../components/Button";
import { Colors } from "../../utils/values";
import styles from "./styles";
import { useAlert } from "../../components/Alert";
import { logoWhite } from "../../assets";
import { useUnifiedNavigation } from "../../navigation/useUnifiedNavigation";
import { routes } from "../../navigation/types";
import { loginPending } from "../../redux/selectors";
import { login } from "../../redux/actions/userActions";
import { AppDispatch } from "../../redux";
import { SigninValues, SignInSchema } from "./schemas";
import { Formik, FormikHelpers } from "formik";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const alert = useAlert();
  const loading = useSelector(loginPending);
  const { navigate } = useUnifiedNavigation();
  const initialValues: SigninValues = { username: "", password: "" };

  function onSubmit(values: SigninValues, { setSubmitting }: FormikHelpers<SigninValues>) {
    dispatch(login(values.username, values.password)).catch((err) => {
      alert("Erreur", err.message);
    });
  }
  return (
    <ScreenContainer status={{ backgroundColor: Colors.primary }}>
      <View style={styles.container}>
        <Image style={styles.loginLogo} resizeMode="contain" source={logoWhite} />
        <Formik validationSchema={SignInSchema} initialValues={initialValues} onSubmit={onSubmit}>
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <Input
                value={values.username}
                onChangeText={handleChange("username")}
                style={styles.loginInput}
                placeholder="Addresse email"
                returnKeyType="next"
                error={touched.username && errors.username ? errors.username : undefined}
              />

              <Input
                value={values.password}
                onChangeText={handleChange("password")}
                style={[styles.loginInput]}
                placeholder="Mot de passe"
                secureTextEntry
                onSubmitEditing={() => handleSubmit()}
                error={touched.password && errors.password ? errors.password : undefined}
              />
              <Button
                onPress={handleSubmit}
                text="S'identifié"
                light
                loading={loading}
                style={{ width: "100%", maxWidth: 400, marginTop: 30 }}
              />
            </>
          )}
        </Formik>
        <Text style={styles.signupText}>
          {"Vous n'avez pas de compte ?  "}
          <Text
            onPress={() => {
              navigate(routes.signUp);
            }}
            style={{ fontWeight: "bold" }}
          >
            S'inscrire
          </Text>
        </Text>
      </View>
    </ScreenContainer>
  );
};

export default Login;
