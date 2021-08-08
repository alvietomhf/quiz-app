import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  makeStyles,
  Box,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth/authAction";
import Cookies from "js-cookie";

const Login = (props) => {
  const initialValues = {
    email: "dio@gmail.com",
    password: "Password`",
  };

  const history = useHistory();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false)

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
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
    };
    dispatch(loginUser(postData));
    setTimeout(() => {
      props.setSubmitting(false);
      props.resetForm();
      history.push('/home')
    },2000)
  };

  useEffect(() => {
    if(props.auth.isAuthenticated && Cookies.get("access")) {
      history.push('/home')
    }
    return () => {
      setSuccess(false)
    }
  }, [])

  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <Paper className={classes.paper}>
        <Formik
          className={classes.form}
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form className={classes.formContainer}>
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
                  Silahkan masukkan kredensial untuk akses akun anda
                </Typography>
              </Grid>
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
                error={
                  props.errors.password && props.touched.password ? true : false
                }
                required
                helperText={<ErrorMessage name="password" />}
              />

              <Box
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  margin: "10px 0",
                }}
              >
                {/* <Field
                  as={FormControlLabel}
                  name="remember"
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                /> */}
                <Typography
                  style={{ marginLeft: "auto", marginBottom: 0 }}
                  variant="subtitle1"
                  gutterBottom
                >
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
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={handleClick({
                  vertical: "bottom",
                  horizontal: "center",
                })}
                disabled={props.isSubmitting}
                fullWidth
              >
                {props.isSubmitting ? (
                  <CircularProgress size={24} />
                ) : (
                  "Sign in"
                )}
              </Button>
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                key={vertical + horizontal}
                autoHideDuration={5000}
              >
                <Alert
                  onClose={handleClose}
                  severity={props.isValid ? "success" : "error"}
                >
                  {props.isValid ? "Success" : "Error"}
                </Alert>
              </Snackbar>
            </Form>
          )}
        </Formik>
      </Paper>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "10px 0",
        }}
      >
        <Typography style={{ marginTop: 15 }} variant="subtitle1" gutterBottom>
          Belum memiliki akun?
          <Link
            to="/register"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            {" "}
            Daftar
          </Link>
        </Typography>
      </Box>
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

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
