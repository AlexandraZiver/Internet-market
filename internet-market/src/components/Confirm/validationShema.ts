import * as Yup from "yup";

export const initialValues = {
  confirmCode: "",
};

export const validationSchema = Yup.object().shape({
  confirmCode: Yup.string().required("Required"),
});
