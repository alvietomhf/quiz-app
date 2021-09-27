import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@material-ui/core";
import { ErrorMessage, Form, Formik, Field } from "formik";
import React, { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "../../actions/auth/authAction";
import { jsonToFormData } from "../../config/jsonToFormData";
import { CameraAlt } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { GET_ERRORS, RESET_ERRORS } from "../../constants/types";
import store from "../../store";

const Register = () => {
  const FormikRef = useRef();
  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.errors);
  const token = useSelector((state) => state.access);
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    name: "",
    email: "",
    number: 1,
    password: "",
    avatar: "",
  };

  const [role, setRole] = useState("student");

  if (error.isError == true) {
    setTimeout(() => {
      store.dispatch({
        type: RESET_ERRORS,
        payload: "",
      });
    }, 1500);
  }

  const handleChangeRole = (event) => {
    setRole(event.target.value);
    error.message = {};
    error.isError = false;
  };

  useEffect(() => {
    if (auth.isAuthenticated && auth.data.token) {
      history.push("/");
    }
  }, [auth, token, history]);

  const onSubmit = async (values) => {
    const postData = {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.password,
      role: role,
      avatar: values.avatar,
    };
    const formData = jsonToFormData(postData);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    dispatch(
      registerUser(formData, role),
      FormikRef.current.setSubmitting(false)
    );
    FormikRef.current.resetForm();
  };

  const onChangeImage = (e, index) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    FormikRef.current.setFieldValue(index, files[0]);
  };

  const classes = useStyles();

  return (
    <Fragment>
      <Box justifyContent="center" alignItems="center" className={classes.root}>
        <div>
          <Paper className={classes.paper}>
            <Formik
              initialValues={initialValues}
              innerRef={FormikRef}
              onSubmit={onSubmit}
            >
              {(props) => (
                <Form>
                  <div>
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
                    {error.isError == true ? (
                      <Alert severity="error">Validasi Error</Alert>
                    ) : (
                      props.isSubmitting == true && (
                        <Alert severity="success">Registrasi berhasil.</Alert>
                      )
                    )}
                  </div>
                  <Field
                    as={TextField}
                    variant="outlined"
                    label="Name"
                    name="name"
                    placeholder="Enter Your Name..."
                    fullWidth
                    className={classes.fieldRegister}
                    error={error.message.name && true}
                    helperText={error.message.name}
                  />
                  <Field
                    as={TextField}
                    variant="outlined"
                    label="Email"
                    name="email"
                    placeholder="Enter Email..."
                    className={classes.fieldRegister}
                    fullWidth
                    error={error.message.email && true}
                    helperText={error.message.email}
                  />

                  <Box display="flex" alignItems="center" marginY={1}>
                    <FormControl variant="outlined">
                      <InputLabel id="select-role">Role</InputLabel>
                      <Select
                        labelId="select-role"
                        value={role}
                        onChange={handleChangeRole}
                        label="Role"
                      >
                        <MenuItem value={"student"}>Siswa</MenuItem>
                        <MenuItem value={"teacher"}>Guru</MenuItem>
                      </Select>
                    </FormControl>
                    {role === "student" && (
                      <Field
                        as={TextField}
                        variant="outlined"
                        label="Absen"
                        style={{ marginLeft: 10, marginTop: 3, width: 200 }}
                        name="number"
                        placeholder="Absen..."
                        error={error.message.number && true}
                        helperText={error.message.number}
                      />
                    )}
                  </Box>
                  <Field
                    as={TextField}
                    label="Password"
                    name="password"
                    variant="outlined"
                    className={classes.fieldRegister}
                    placeholder="Enter password"
                    type="password"
                    fullWidth
                    error={error.message.password && true}
                    helperText={error.message.password}
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
        </div>
        <div>
          <Typography
            variant="subtitle1"
            style={{ marginTop: 15 }}
            gutterBottom
          >
            Sudah memiliki akun?
            <Link
              to="/login"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              {" "}
              Login
            </Link>
          </Typography>
        </div>
      </Box>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    border: "1px solid black",
  },
  paper: {
    padding: 15,
    width: 520,
  },
  formContainer: {},
  fieldRegister: {
    marginTop: 10,
    marginBottom: 10,
  },
}));

export default Register;
