import React from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../http/userApi";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import { observer } from "mobx-react";
import { validationSchema, initialValues } from "./validationShema";

import { UserStoreInterface } from "../../store/UserStore";
import textField from "../FieldText/Field";

const defaultTheme = createTheme();

const Register: React.FC<{ user: UserStoreInterface }> = observer(
  ({ user }: { user: UserStoreInterface }) => {
    const navigate = useNavigate();

    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          const { email, password, name, passwordConfirm } = values;
          const data = await register(name, email, password, passwordConfirm);
          user.setUser(data);
          navigate(`/confirm/${data.id}`);
          return false;
        } catch (error: any) {
          formik.setErrors({ error: error });
        }
      },
    });

    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 3,
            }}
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}>
            <Typography component="h1" variant="h5">
              To register
            </Typography>
            {formik.errors.error && <div style={{ color: "red" }}>{formik.errors.error}</div>}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {textField("name", formik)}
              </Grid>
              <Grid item xs={12}>
                {textField("email", formik)}
              </Grid>
              <Grid item xs={12}>
                {textField("password", formik)}
              </Grid>
              <Grid item xs={12}>
                {textField("passwordConfirm", formik)}
              </Grid>
            </Grid>
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} type="submit">
              Sing Up
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    );
  },
);

export default Register;
