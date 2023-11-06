import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .matches(/^[a-zA-Zа-яА-Я0-9]+$/, " The field must contain only letters and numbers")
    .required("Required"),
  email: Yup.string().email("Invalid email message").required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .matches(/^[a-zA-Zа-яА-Я0-9]+$/, " The field must contain only letters and numbers")
    .required("Required"),
  passwordConfirm: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const initialValues: {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  error:string
} = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  error: '',
};

