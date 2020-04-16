import React from "react";
import { View } from "react-native";
import Button from "../../components/Button";
import styles from "./styles";
import { Input } from "../../components";
import { Formik, FormikHelpers } from "formik";
import { PatientSchema, SignupPatientValues, SignupValues } from "./schemas";
import { postSignup, postLogin, getUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { setDoctorAction } from "../../redux/actions/doctorActions";
import { setPatientAction } from "../../redux/actions/patientActions";
import { signInAction, login } from "../../redux/actions/userActions";
import { AppDispatch } from "../../redux";

interface SignupNextProps {
  previousValues: SignupValues;
}

const SingunpPatient: React.FC<SignupNextProps> = ({ previousValues }) => {
  const initialValues: SignupPatientValues = { firstName: "", lastName: "" };
  const dispatch = useDispatch<AppDispatch>();

  function onSubmit(values: SignupPatientValues, { setSubmitting }: FormikHelpers<SignupPatientValues>) {
    setSubmitting(true);
    postSignup({ ...previousValues, profile: values })
      .then(async (res) => {
        await dispatch(login(previousValues.username, previousValues.password));
      })
      .catch((err) => {
        console.log(err);
        setSubmitting(false);
      });
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

export default SingunpPatient;
