import * as Yup from "yup";

export const SignInSchema = Yup.object()
  .shape({
    username: Yup.string().email("Veuillez entrer un email valide").required("Ce champs est obligatoire"),
    password: Yup.string().min(2, "Trop cours!").max(50, "Trops Long!").required("Ce champs est obligatoire"),
  })
  .required("Ce champs est obligatoire");

export type SigninValues = Yup.InferType<typeof SignInSchema>;
