import React from 'react';
import {useNavigate } from 'react-router-dom';
import { login } from '../../http/userApi';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import {validationSchema,initialValues } from './validationShema';
import FieldText from '../FieldText/Field';
import { UserStoreInterface } from '../../store/UserStore';

const defaultTheme = createTheme();

const Login: React.FC<{ user: UserStoreInterface}> = ({user}:{user:UserStoreInterface}) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
      const { email, password } = values;
          const data = await login(email, password);
          user.setIsAuth(true);
          user.setUser(data);
          navigate("/user");
          return false;
      } catch (error:any) {
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 3,
          }}
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Typography component="h1" variant="h5">
            Sign in 
          </Typography>
          {formik.errors.error && (
                  <div style={{"color":"red"}}>{formik.errors.error}</div>
                )}
          <Grid container spacing={2}>
  
            <Grid item xs={12}>
            {FieldText("email",formik)}
            </Grid>
            <Grid item xs={12}>
            {FieldText("password",formik)}
            </Grid>
          </Grid>
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} type="submit">
             Log in 
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
