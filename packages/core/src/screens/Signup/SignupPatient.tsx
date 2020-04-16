import React from "react";
import { View, Image, Text } from "react-native";

import Button from "../../components/Button";
import { Colors, isWeb } from "../../utils/values";
import styles from "./styles";

import { logoWhite } from "../../assets";

import { Title, Touchable, Input } from "../../components";
import { Formik, FormikHelpers } from "formik";
import { PatientSchema } from "./schemas";

import { InferType } from "yup";

type SignupValues = InferType<typeof PatientSchema>;

const SingunpDoctor: React.FC = () => {
  const initialValues: SignupValues = { firstName: "", lastName: "" };

  function onSubmit(values: SignupValues, { setSubmitting }: FormikHelpers<SignupValues>) {
    setSubmitting(true);
  }

  return (
    <Formik validationSchema={PatientSchema} initialValues={initialValues} onSubmit={onSubmit}>
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
