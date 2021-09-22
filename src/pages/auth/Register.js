import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { ErrorMessage, Form, Formik, Field } from "formik";
import React, { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../actions/auth/authAction";
import * as Yup from "yup";
import { jsonToFormData } from "../../config/jsonToFormData";
import { CameraAlt } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

const Register = () => {
  const FormikRef = useRef();
  const [error, setError] = useState(true);
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.access);
  const history = useHistory();

  const initialValues = {
    name: "",
    email: "",
    number: 1,
    password: "",
    avatar: "",
  };

  useEffect(() => {
    if (auth.isAuthenticated && auth.data.token) {
      history.push("/");
    }
  }, [auth, token, history]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    number: Yup.string().required("Required"),
    email: Yup.string().required("Required").email("please enter valid email"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password length contain minimal 8 characters"),
  });

  const onSubmit = async (values) => {
    const postData = {
      name: values.name,
      email: values.email,
      number: values.number,
      password: values.password,
      password_confirmation: values.password,
      role: "student",
      avatar: values.avatar,
    };
    const formData = jsonToFormData(postData);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    registerUser(formData, "student");
    FormikRef.current.setSubmitting(false);
    FormikRef.current.resetForm();

    setError(false);
    setTimeout(() => {
      history.push("/login");
    }, 2000);
  };

  const onChangeImage = (e, index) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    FormikRef.current.setFieldValue(index, files[0]);
  };

  const classes = useStyles();

  return (
    <Fragment>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.root}
        validationSchema={validationSchema}
      >
        <Paper className={classes.paper}>
          <Formik
            initialValues={initialValues}
            innerRef={FormikRef}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <Grid item xs={12}>
                  <Typography
                    style={{
                      fontWeight: "bold",
                      margin: 0,
                    }}
                    variant="h3"
                    gutterBottom
                    align="center"
                  >
                    Sign Up
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    gutterBottom
                  >
                    Selamat Datang, silahkan isi data anda.
                  </Typography>
                  {error ? (
                    ""
                  ) : (
                    <Alert severity="success">
                      Registrasi berhasil.
                    </Alert>
                  )}
                </Grid>
                <Field
                  as={TextField}
                  variant="outlined"
                  label="Name"
                  name="name"
                  placeholder="Enter Your Name..."
                  fullWidth
                  className={classes.fieldRegister}
                  error={props.errors.name && props.touched.name}
                  helperText={<ErrorMessage name="name" />}
                />
                <Field
                  as={TextField}
                  variant="outlined"
                  label="Email"
                  name="email"
                  placeholder="Enter Email..."
                  className={classes.fieldRegister}
                  fullWidth
                  error={props.errors.email && props.touched.email}
                  helperText={<ErrorMessage name="email" />}
                />
                <Field
                  as={TextField}
                  variant="outlined"
                  label="Absen"
                  style={{ width: 100 }}
                  name="number"
                  placeholder="Absen..."
                  className={classes.fieldRegister}
                  helperText={<ErrorMessage name="number" />}
                />
                <Field
                  as={TextField}
                  label="Password"
                  name="password"
                  variant="outlined"
                  className={classes.fieldRegister}
                  placeholder="Enter password"
                  type="password"
                  fullWidth
                  error={
                    props.errors.password && props.touched.password
                      ? true
                      : false
                  }
                  helperText={<ErrorMessage name="password" />}
                />
                <div style={{ marginTop: 5 }}>
                  <Button
                    variant="outlined"
                    startIcon={<CameraAlt />}
                    component="label"
                  >
                    Avatar
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(event) => {
                        onChangeImage(event, "avatar");
                      }}
                    />
                  </Button>
                  <Typography
                    style={{ marginLeft: 5 }}
                    variant="caption"
                    gutterBottom
                  >
                    {props.values.avatar !== "" ? "Image Found" : ""}
                  </Typography>
                </div>
                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                  variant="contained"
                  disabled={props.isSubmitting}
                  style={{ marginTop: 10, marginBottom: 5 }}
                >
                  {props.isSubmitting ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Register"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
  paper: {
    padding: 15,
    width: 520,
  },
  formContainer: {},
  fieldRegister: {
    marginTop: 5,
    marginBottom: 5,
  },
}));

export default Register;
