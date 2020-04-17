import React from "react";
import { View, Image, Text } from "react-native";
import { useDispatch } from "react-redux";
import { ScreenContainer, Input, GoBack, Touchable } from "../../components";
import Button from "../../components/Button";
import { Colors } from "../../utils/values";
import styles from "./styles";
import { useAlert } from "../../components/Alert";
import { logoWhite } from "../../assets";
import { useUnifiedNavigation } from "../../navigation/useUnifiedNavigation";
import { Title } from "../../components";
import { Formik, FormikHelpers } from "formik";
import { SignupSchema, SignupValues } from "./schemas";
import SignupDoctor from "./SignupDoctor";
import SignupPatient from "./SignupPatient";

type ISignupStep = 1 | 2;

const Singunp: React.FC = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { goBack } = useUnifiedNavigation();
  const initialValues: SignupValues = { username: "", password: "", confirmPassword: "", userType: "patient" };
  const [step, setStep] = React.useState<ISignupStep>(1);

  function onNext(values: SignupValues, { setSubmitting }: FormikHelpers<SignupValues>) {
    setStep(2);
  }

  return (
    <ScreenContainer status={{ backgroundColor: Colors.primary }}>
      <Formik validationSchema={SignupSchema} initialValues={initialValues} onSubmit={onNext}>
        {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
          <>
            <View style={{ paddingVertical: 30 }}>
              <GoBack
                color={Colors.white}
                onPress={() => {
                  if (step === 1) goBack();
                  else {
                    setStep(1);
                  }
                }}
              >
                <Image style={styles.loginLogo} resizeMode="contain" source={logoWhite} />
                {step === 1 && <Button text="Suivant" onPress={handleSubmit} light />}
              </GoBack>
            </View>
            <View style={styles.container}>
              <Title> Créer votre compte </Title>

              {step === 1 ? (
                <View style={{ width: "100%", maxWidth: 400 }}>
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
                    value={values.username}
                    onChangeText={handleChange("username")}
                    style={styles.loginInput}
                    placeholder="Adresse email*"
                    returnKeyType="next"
                    error={touched.username && errors.username ? errors.username : undefined}
                  />
                  <Input
                    value={values.password}
                    onChangeText={handleChange("password")}
                    style={[styles.loginInput]}
                    placeholder="Mot de passe*"
                    secureTextEntry
                    error={touched.password && errors.password ? errors.password : undefined}
                  />
                  <Input
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    style={[styles.loginInput]}
                    placeholder="Confirmation*"
                    secureTextEntry
                    error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                  />
                </View>
              ) : values.userType === "patient" ? (
                <SignupPatient previousValues={values} />
              ) : (
                <SignupDoctor previousValues={values} />
              )}
            </View>
          </>
        )}
      </Formik>
    </ScreenContainer>
  );
};

export default Singunp;
