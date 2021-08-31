import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { ErrorMessage, Form, Formik, Field } from "formik";
import React, { createRef, useEffect } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../actions/auth/authAction";
import * as Yup from "yup";
import { buildFormData } from "../../components/BuildFormData";

const Register = () => {
  const FormikRef = createRef();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.access);
  const history = useHistory();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    avatar: "",
  };

  useEffect(() => {
    if (auth.isAuthenticated && auth.data.token) {
      history.push("/home");
    }
  }, [auth, token, history]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required").email("please enter valid email"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password length contain minimal 8 characters"),
  });

  const jsonToFormData = (data) => {
    const formData = new FormData();
    buildFormData(formData, data);
    return formData;
  };

  const onSubmit = async (values) => {
    const postData = {
      name: values.name,
      email: values.email,
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
  };

  const onChangeImage = (e, index) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    FormikRef.current.setFieldValue(index, files[0]);
  };

  return (
    <Fragment>
      <Grid>
        <Paper>
          <Formik
            initialValues={initialValues}
            innerRef={FormikRef}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form>
                <Grid align="center">
                  <Typography
                    style={{
                      fontWeight: "bold",
                      margin: 0,
                    }}
                    variant="h3"
                    gutterBottom
                  >
                    Sign Up
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Selamat Datang, silahkan isi data anda.
                  </Typography>
                </Grid>
                <Field
                  as={TextField}
                  variant="outlined"
                  label="Name"
                  name="name"
                  placeholder="Enter Your Name..."
                  fullWidth
                  error={props.errors.name && props.touched.name}
                  required
                  helperText={<ErrorMessage name="name" />}
                />
                <Field
                  as={TextField}
                  variant="outlined"
                  label="Email"
                  name="email"
                  placeholder="Enter Email..."
                  fullWidth
                  error={props.errors.email && props.touched.email}
                  required
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
                  error={
                    props.errors.password && props.touched.password
                      ? true
                      : false
                  }
                  required
                  helperText={<ErrorMessage name="password" />}
                />
                <div>
                  <Button variant="outlined" component="label">
                    Tambahkan Gambar
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(event) => {
                        onChangeImage(event, "avatar");
                      }}
                    />
                  </Button>
                  {props.values.avatar.name}
                </div>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={props.isSubmitting}
                  fullWidth
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

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

export default Register;
