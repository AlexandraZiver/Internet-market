import React from "react";

import TextField from "@mui/material/TextField";
import { FormikProps } from "formik";

const Field = (name: string, formik: FormikProps<any>) => {
  const toCapital = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <TextField
      name={name}
      type="text"
      required
      fullWidth
      id={name}
      label={toCapital(name)}
      autoComplete={name}
      error={!!(formik.errors as any)[name] && (formik.touched as Record<string, boolean>)[name]}
      helperText={
        (formik.touched as Record<string, boolean>)[name] &&
        (formik.errors as Record<string, string>)[name]
      }
      value={(formik.values as Record<string, string>)[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
  );
};

export default Field;
