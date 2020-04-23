import React from "react";
import { View } from "react-native";
import Button from "../../components/Button";
import styles from "./styles";
import { Input } from "../../components";
import { Formik, FormikHelpers } from "formik";
import { DoctorSchema, SignupDoctorValues, SignupValues } from "./schemas";
import { postSignup } from "../../api/user";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux";
import { login } from "../../redux/actions/userActions";
import { useAlert } from "../../components/Alert";
interface SignupNextProps {
  previousValues: SignupValues;
}
const SingunpDoctor: React.FC<SignupNextProps> = ({ previousValues }) => {
  const initialValues: SignupDoctorValues = { firstName: "", lastName: "", address: "", phone: "" };
  const dispatch = useDispatch<AppDispatch>();
  const alert = useAlert();
  function onSubmit(values: SignupDoctorValues, { setSubmitting }: FormikHelpers<SignupDoctorValues>) {
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
    <Formik validationSchema={DoctorSchema} initialValues={initialValues} onSubmit={onSubmit}>
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
          <Input
            value={values.phone}
            onChangeText={handleChange("phone")}
            style={styles.loginInput}
            placeholder="Téléphone*"
            returnKeyType="next"
            error={touched.phone && errors.phone ? errors.phone : undefined}
          />
          <Input
            value={values.address}
            onChangeText={handleChange("address")}
            style={styles.loginInput}
            placeholder="Addresse*"
            returnKeyType="next"
            error={touched.address && errors.address ? errors.address : undefined}
          />
          <Button
            onPress={handleSubmit}
            text="S'iscrire"
            light
            loading={isSubmitting}
            style={{ width: "100%", maxWidth: 400, marginTop: 40 }}
          />
        </>
      )}
    </Formik>
  );
};

export default SingunpDoctor;
