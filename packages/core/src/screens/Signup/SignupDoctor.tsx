import React from "react";
import { View } from "react-native";
import Button from "../../components/Button";
import styles from "./styles";
import { Input } from "../../components";
import { Formik, FormikHelpers } from "formik";
import { DoctorSchema, SignupDoctorValues, SignupValues } from "./schemas";
interface SignupNextProps {
  previousValues: SignupValues;
}
const SingunpDoctor: React.FC<SignupNextProps> = () => {
  const initialValues: SignupDoctorValues = { firstName: "", lastName: "", address: "", phone: "" };

  function onSubmit(values: SignupDoctorValues, { setSubmitting }: FormikHelpers<SignupDoctorValues>) {
    console.log(values);
  }

  return (
    <Formik validationSchema={DoctorSchema} initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
        <View>
          <Input
            value={values.firstName}
            onChangeText={handleChange("firstName")}
            style={styles.loginInput}
            placeholder="Prénom*"
            returnKeyType="next"
            error={errors.firstName}
          />
          <Input
            value={values.lastName}
            onChangeText={handleChange("lastName")}
            style={styles.loginInput}
            placeholder="Nom*"
            returnKeyType="next"
            error={errors.lastName}
          />
          <Button
            onPress={handleSubmit}
            text="S'iscrire"
            light
            loading={isSubmitting}
            style={{ width: "100%", maxWidth: 400, marginTop: 40 }}
          />
        </View>
      )}
    </Formik>
  );
};

export default SingunpDoctor;
