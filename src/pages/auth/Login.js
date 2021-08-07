import React from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
  makeStyles,
  Box,
} from "@material-ui/core";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = ({ handleChange }) => {
  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required").email("please enter valid email"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password length contain minimal 8 characters"),
  });

  const onSubmit = (values, props) => {
    const postData = {
      email: values.email,
      password: values.password,
      password_confirmation: values.password,
      remember: values.remember,
    };
    console.log(postData);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
  };

  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <Paper className={classes.paper}>
        <Grid align="center">
          <Typography
            style={{
              fontWeight: "bold",
              color: "#465AA8",
              margin: 0,
            }}
            variant="h3"
            gutterBottom
          >
            Sign Up
          </Typography>
          <Typography
            style={{
              color: "rgba(70, 90, 168, 0.4)",
            }}
            variant="subtitle1"
            gutterBottom
          >
            Silahkan masukkan kredensial untuk akses akun anda
          </Typography>
        </Grid>
        <Formik
          className={classes.form}
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form className={classes.formContainer}>
              <Field
                as={TextField}
                variant="outlined"
                label="Email"
                name="email"
                placeholder="Enter Email"
                fullWidth
                error={props.errors.email && props.touched.email ? true : false}
                required
                className={classes.labelForm}
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                variant="outlined"
                placeholder="Enter password"
                type="password"
                fullWidth
                className={classes.labelForm}
                error={props.errors.password && props.touched.password ? true : false}
                required
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={FormControlLabel}
                name="remember"
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={props.isSubmitting}
                fullWidth
              >
                {props.isSubmitting ? <CircularProgress size={24} /> : "Sign in"}
              </Button>
            </Form>
          )}
        </Formik>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px 0",
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            Lupa Password?
            <Link
              to="/resetpassword"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              {" "}
              Reset Password
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  formContainer: {
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "8px",
    maxWidth: 460,
    boxShadow: "0px 4px 18px 11px rgba(174, 199, 255, 0.1)",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
  },
  labelForm: {
    margin: "15px 0",
  },
  logo: {
    height: "100px",
    width: "100px",
    margin: "20px",
  },
});

export default Login;
