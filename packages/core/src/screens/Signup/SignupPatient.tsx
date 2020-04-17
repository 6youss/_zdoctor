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
import { useAlert } from "../../components/Alert";

interface SignupNextProps {
  previousValues: SignupValues;
}

const SingunpPatient: React.FC<SignupNextProps> = ({ previousValues }) => {
  const initialValues: SignupPatientValues = { firstName: "", lastName: "" };
  const dispatch = useDispatch<AppDispatch>();
  const alert = useAlert();
  function onSubmit(values: SignupPatientValues, { setSubmitting }: FormikHelpers<SignupPatientValues>) {
    setSubmitting(true);
    postSignup({ ...previousValues, profile: values })
      .then(async (res) => {
        await dispatch(login(previousValues.username, previousValues.password));
      })
      .catch((err) => {
        alert("Erreur", err.message);
        setSubmitting(false);
      });
  }

  return (
    <Formik validationSchema={PatientSchema} initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
        <>
          <Input
            value={values.firstName}
            onChangeText={handleChange("firstName")}
            style={styles.loginInput}
            placeholder="Prénom*"
            returnKeyType="next"
            error={touched.firstName && errors.firstName ? errors.firstName : undefined}
          />
          <Input
            value={values.lastName}
            onChangeText={handleChange("lastName")}
            style={styles.loginInput}
            placeholder="Nom*"
            returnKeyType="next"
            error={touched.lastName && errors.lastName ? errors.lastName : undefined}
          />
          <Button
            onPress={handleSubmit}
            text="S'inscrire"
            light
            loading={isSubmitting}
            style={{ width: "100%", maxWidth: 400, marginTop: 40 }}
          />
        </>
      )}
    </Formik>
  );
};

export default SingunpPatient;
