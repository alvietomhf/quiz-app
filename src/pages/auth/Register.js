import {
  Button,
  CircularProgress,
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
import { Form, Formik, Field } from "formik";
import React, { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { jsonToFormData } from "../../config/jsonToFormData";
import { CameraAlt } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { RESET_ERRORS } from "../../constants/types";
import store from "../../store";
import instance from "../../actions/instance";

const Register = () => {
  const FormikRef = useRef();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [error, setError] = useState({});
  // const error = {};
  const token = useSelector((state) => state.access);
  // const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    name: "",
    email: "",
    number: 1,
    password: "",
    avatar: "",
  };

  const [role, setRole] = useState("siswa");

  if (error.isError === true) {
    setTimeout(() => {
      store.dispatch({
        type: RESET_ERRORS,
        payload: "",
      });
    }, 1500);
  }

  const handleChangeRole = (event) => {
    setRole(event.target.value);
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
      number: role === "guru" ? "" : values.number,
      password_confirmation: values.password,
      role: role,
      avatar: values.avatar,
    };
    const formData = jsonToFormData(postData);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    await instance
      .post("api/register", formData)
      .then((res) => {
        if (res.data.status === true) {
          setMessage("Registrasi Berhasil");
          setError({});
          setSuccess(true);
          FormikRef.current.resetForm();
          FormikRef.current.setSubmitting(false);
          setTimeout(() => {
            history.push("/login");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.status === 400) {
          setError(err.response.data.data);
          setSuccess(false);
          FormikRef.current.setSubmitting(false);
        }
        setTimeout(() => {
          setError({});
          setMessage("");
        }, 2000);
      });
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
                    {success ? <Alert severity="success">{message}</Alert> : ""}
                  </div>
                  <Field
                    as={TextField}
                    variant="outlined"
                    label="Name"
                    name="name"
                    placeholder="Enter Your Name..."
                    fullWidth
                    className={classes.fieldRegister}
                    error={error.name && true}
                    helperText={error.name}
                  />
                  <Field
                    as={TextField}
                    variant="outlined"
                    label="Email"
                    name="email"
                    placeholder="Enter Email..."
                    className={classes.fieldRegister}
                    fullWidth
                    error={error.email && true}
                    helperText={error.email}
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
                        <MenuItem value={"siswa"}>Siswa</MenuItem>
                        <MenuItem value={"guru"}>Guru</MenuItem>
                      </Select>
                    </FormControl>

                    <Field
                      as={TextField}
                      variant="outlined"
                      label="Absen"
                      type="number"
                      style={{ marginLeft: 10, marginTop: 3, width: 90 }}
                      name="number"
                      disabled={role === "guru" && true}
                      placeholder="Absen..."
                      error={error.number && true}
                      helperText={error.number}
                    />
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
                    error={error.password && true}
                    helperText={error.password}
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
