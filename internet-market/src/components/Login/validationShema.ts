import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email message").required("Required"),
  password: Yup.string().required("Required"),
});

export const initialValues: {
  email: string;
  password: string;
  error: string;
} = {
  email: "",
  password: "",
  error: "",
};
