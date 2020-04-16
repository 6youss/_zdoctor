import * as Yup from "yup";

export const SignupSchema = Yup.object()
  .shape({
    username: Yup.string().email("Veuillez entrer un email valide").required("Ce champs est obligatoire"),
    password: Yup.string().min(2, "Trop cours!").max(50, "Trops Long!").required("Ce champs est obligatoire"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
      .required("Ce champs est obligatoire"),
    userType: Yup.string().oneOf(["patient", "doctor"]).required("Ce champs est obligatoire"),
  })
  .required("Ce champs est obligatoire");

const firstNameSchema = Yup.string().min(3, "Trop cours!").max(30, "Trops Long!").required("Ce champs est obligatoire");
const lastNameSchema = Yup.string().min(3).max(30).required("Ce champs est obligatoire");
const addressSchema = Yup.string().min(8).max(50).required("Ce champs est obligatoire");
const phoneSchema = Yup.string()
  .trim()
  .matches(/^[0-9]{7,10}$/, "Veuillez entrer un numéro de télphone valide")
  .required("Ce champs est obligatoire");

export const DoctorSchema = Yup.object()
  .shape({
    firstName: firstNameSchema,

    lastName: lastNameSchema,

    address: addressSchema,

    phone: phoneSchema,
  })
  .required("Ce champs est obligatoire");

export const PatientSchema = Yup.object()
  .shape({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
  })
  .required("Ce champs est obligatoire");

export type SignupDoctorValues = Yup.InferType<typeof DoctorSchema>;

export type SignupPatientValues = Yup.InferType<typeof PatientSchema>;

export type SignupValues = Yup.InferType<typeof SignupSchema>;

export interface SignupBody extends SignupValues {
  profile: SignupDoctorValues | SignupPatientValues;
}
