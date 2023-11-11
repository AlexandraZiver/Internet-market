import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { confirm, deleteUser } from "../../http/userApi";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./validationShema";
import { observer } from "mobx-react-lite";
import Context from "../..";
import textField from "../FieldText/Field";

const defaultTheme = createTheme();

const Confirm: React.FC = observer(() => {
  const navigate = useNavigate();
  const context = useContext(Context);
  const { id } = useParams();

  if (context === null) {
    return <>Loading...</>;
  }

  const { user } = context;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { confirmCode } = values;
        const data = await confirm(confirmCode, id);
        if (!data) {
          throw new Error("Confirm problem");
        }
        user.setIsAuth(true);
        navigate("/user");
        return false;
      } catch (error) {
        formik.setErrors({ confirmCode: "Code is not correct" });
      }
    },
  });
  const goBackClick = async () => {
    await deleteUser(id);
    navigate("/register");
    return false;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          marginTop: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 15,
        }}
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}>
        <Grid item xs={10}>
          <Typography component="h1" variant="h5" sx={{ mt: 2, mb: 2 }}>
            Confirmation email
          </Typography>
          {textField("confirmCode", formik)}
          <Button fullWidth variant="contained" sx={{ mt: 2, mb: 2 }} type="submit">
            Send Code
          </Button>
        </Grid>
        <Grid item onClick={goBackClick}>
          Return to the previous page
        </Grid>
      </Box>
    </ThemeProvider>
  );
});

export default Confirm;
