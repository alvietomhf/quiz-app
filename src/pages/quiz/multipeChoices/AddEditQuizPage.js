import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../../components/Layout";
import { Formik, Form, Field, ErrorMessage, FieldArray, getIn } from "formik";
import * as Yup from "yup";
import apiQuiz from "../../../actions/quiz/quiz";
import DatePicker from "../../../components/DatePickers";
import { buildFormData } from "../../../components/BuildFormData";
import { token } from "../../../config/token";
import { useHistory, useParams } from "react-router-dom";
import instance from "../../../actions/instance";
import moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import { CameraAlt, Delete, Send } from "@material-ui/icons";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const AddEditQuizPage = () => {
  const [selectedDate, setSelectedDate] = useState();
  const { slug } = useParams();
  const isAddMode = !slug;
  const FormikRef = useRef();
  const history = useHistory();
  const initialValues = {
    title: "",
    deadline: "",
    banner: "",
    questions: [
      {
        id: "",
        question: "",
        file: "",
        options: [{ id: "", title: "", correct: 0 }],
      },
    ],
    type: "quiz",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    deadline: Yup.date().required("Required"),
    questions: Yup.array()
      .of(
        Yup.object()
          .shape({
            question: Yup.string().required("Required"),
            file: Yup.mixed().nullable(),
            options: Yup.array().of(
              Yup.object().shape({
                title: Yup.string().required("Required"),
              })
            ),
          })
          .required("Required")
      )
      .required("Required"),
  });

  useEffect(() => {
    if (!isAddMode) {
      const getQuizDetail = async () => {
        instance
          .get(`/api/quizzes/${slug}`, {
            headers: {
              Authorization: "Bearer " + token(),
            },
          })
          .then((response) => {
            const res = response.data.data;
            const quizField = ["title", "deadline", "questions", "type"];
            quizField.forEach((field) =>
              FormikRef.current.setFieldValue(field, res[field], false)
            );
            console.log(res);
            setSelectedDate(res.deadline);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getQuizDetail();
    }
  }, [history, slug, isAddMode]);

  const jsonToFormData = (data) => {
    const formData = new FormData();
    if (!isAddMode) {
      formData.append("_method", "put");
    }
    buildFormData(formData, data);
    return formData;
  };

  const onChangeDate = (values) => {
    const date = moment(values).format("YYYY-MM-DD HH:mm");
    FormikRef.current.setFieldValue("deadline", date);
    setSelectedDate(values);
  };

  const onChangeImage = (e, index) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    FormikRef.current.setFieldValue(index, files[0]);
  };

  const onSubmit = async (values) => {
    const formData = jsonToFormData(values);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + JSON.stringify(pair[1]));
    }
    if (isAddMode) {
      await apiQuiz.postQuiz(formData);
      FormikRef.current.resetForm();
    } else {
      await apiQuiz.updateQuiz(formData, slug);
    }
    FormikRef.current.setSubmitting(false);
    history.goBack();
  };

  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <Paper>
        <Formik
          innerRef={FormikRef}
          className={classes.form}
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue, errors, touched, isSubmitting }) => (
            <Form>
              <div style={{ padding: 15 }}>
                <Grid item>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    style={{ marginBottom: 15 }}
                  >
                    Judul Kuis
                  </Typography>
                </Grid>
                <Field
                  as={TextField}
                  variant="outlined"
                  name="title"
                  placeholder="Masukkan Judul Kuis"
                  fullWidth
                  error={errors.title && touched.title}
                  helperText={<ErrorMessage name="title" />}
                />
                <div>
                  <DatePicker
                    label="Deadline"
                    name="deadline"
                    style={{ marginBottom: 15 }}
                    onChangeDate={onChangeDate}
                    selectedDate={selectedDate}
                    error={errors.deadline && touched.deadline}
                    helperText={<ErrorMessage name="deadline" />}
                  />
                </div>
                <div
                  style={{
                    margin: "5px 0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    component="label"
                    style={{
                      marginRight: 10,
                    }}
                    startIcon={<CameraAlt />}
                  >
                    Upload Banner
                    <input
                      type="file"
                      name="banner"
                      hidden
                      accept="image/*"
                      onChange={(event) => {
                        onChangeImage(event, "banner");
                      }}
                    />
                  </Button>
                  {values.banner ? (
                    <div>
                      {`Image Found`}
                      <Button
                        color="secondary"
                        style={{
                          cursor: "pointer",
                          marginLeft: 5,
                        }}
                        onClick={() => setFieldValue("", "banner")}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <FieldArray name="questions">
                  {({ push, remove }) => (
                    <Fragment>
                      {values.questions.map((question, i) => {
                        const errorQuestion = getIn(
                          errors,
                          `questions[${i}].question`
                        );
                        const errorImage = getIn(
                          errors,
                          `questions[${i}].file`
                        );
                        return (
                          <Grid container key={i} item spacing={2}>
                            <Grid
                              item
                              container
                              spacing={2}
                              style={{
                                margin: "20px 0",
                              }}
                            >
                              <Grid
                                item
                                xs={12}
                                style={{
                                  borderTop: "1px solid #E3E3E3",
                                  borderBottom: "1px solid #E3E3E3",
                                  padding: "20px 0",
                                }}
                              >
                                <Field
                                  as={TextField}
                                  fullWidth
                                  variant="outlined"
                                  name={`questions[${i}].id`}
                                  style={{ display: "none" }}
                                />
                                <Grid item>
                                  <Typography
                                    style={{ marginBottom: 5 }}
                                    variant="caption"
                                    color="textSecondary"
                                  >
                                    {`Pertanyaan No. ${i + 1}`}
                                  </Typography>
                                </Grid>
                                <Field
                                  as={TextField}
                                  fullWidth
                                  variant="outlined"
                                  name={`questions[${i}].question`}
                                  placeholder="Masukkan pertanyaan"
                                  error={errorQuestion && true}
                                />
                                {errorQuestion && (
                                  <div style={{ color: "red" }}>
                                    {errorQuestion}
                                  </div>
                                )}
                                <Grid
                                  container
                                  style={{ marginBottom: 5, marginTop: 15 }}
                                >
                                  <Grid item>
                                    <Typography
                                      variant="caption"
                                      color="textSecondary"
                                    >
                                      Opsi
                                    </Typography>
                                  </Grid>
                                  <FieldArray name={`questions[${i}].options`}>
                                    {({ push, remove }) => (
                                      <Grid container spacing={2}>
                                        <Fragment>
                                          {question.options.map(
                                            (option, index) => {
                                              const errorOptionTitle = getIn(
                                                errors,
                                                `questions[${i}].options[${index}].title`
                                              );
                                              return (
                                                <Grid
                                                  item
                                                  key={index}
                                                  xs={12}
                                                  lg={3}
                                                >
                                                  <Fragment>
                                                    <Field
                                                      fullWidth
                                                      variant="outlined"
                                                      name={`questions[${i}].options[${index}].id`}
                                                      as={TextField}
                                                      style={{
                                                        display: "none",
                                                      }}
                                                    />
                                                    <Field
                                                      fullWidth
                                                      variant="outlined"
                                                      name={`questions[${i}].options[${index}].title`}
                                                      as={TextField}
                                                      error={
                                                        errorOptionTitle && true
                                                      }
                                                      placeholder="Masukkan Opsi"
                                                    />
                                                    {errorOptionTitle && (
                                                      <div
                                                        style={{ color: "red" }}
                                                      >
                                                        {errorOptionTitle}
                                                      </div>
                                                    )}
                                                    <Grid
                                                      container
                                                      alignItems="center"
                                                      style={{
                                                        marginTop: 15,
                                                      }}
                                                    >
                                                      <Grid
                                                        item
                                                        xs={6}
                                                        sm="auto"
                                                      >
                                                        <Button
                                                          variant="contained"
                                                          style={{
                                                            marginRight: 10,
                                                          }}
                                                          color={
                                                            values.questions[i]
                                                              .options[index]
                                                              .correct
                                                              ? "secondary"
                                                              : "default"
                                                          }
                                                          startIcon={
                                                            values.questions[i]
                                                              .options[index]
                                                              .correct ? (
                                                              <CheckIcon />
                                                            ) : (
                                                              ""
                                                            )
                                                          }
                                                          onClick={() => {
                                                            question.options.map(
                                                              (
                                                                correct,
                                                                index2
                                                              ) =>
                                                                setFieldValue(
                                                                  `questions[${i}].options[${index2}].correct`,
                                                                  0
                                                                )
                                                            );
                                                            setFieldValue(
                                                              `questions[${i}].options[${index}].correct`,
                                                              1
                                                            );
                                                          }}
                                                        >
                                                          {values.questions[i]
                                                            .options[index]
                                                            .correct
                                                            ? "Correct"
                                                            : "Mark As Correct"}
                                                        </Button>
                                                      </Grid>
                                                      <Grid
                                                        item
                                                        xs={6}
                                                        sm="auto"
                                                      >
                                                        {index > 0 ? (
                                                          ""
                                                        ) : (
                                                          <IconButton
                                                            onClick={() =>
                                                              push({
                                                                title: "",
                                                                correct: 0,
                                                              })
                                                            }
                                                            aria-label="delete"
                                                          >
                                                            <AddCircleIcon />
                                                          </IconButton>
                                                        )}
                                                        <IconButton
                                                          onClick={() =>
                                                            remove(index)
                                                          }
                                                          aria-label="delete"
                                                        >
                                                          <Delete />
                                                        </IconButton>
                                                      </Grid>
                                                    </Grid>
                                                  </Fragment>
                                                </Grid>
                                              );
                                            }
                                          )}
                                        </Fragment>
                                      </Grid>
                                    )}
                                  </FieldArray>
                                </Grid>
                                <Grid item style={{ marginTop: 15 }}>
                                  <Typography
                                    style={{ marginBottom: 5 }}
                                    variant="caption"
                                    color="textSecondary"
                                  >
                                    Gambar
                                  </Typography>
                                </Grid>
                                <div
                                  style={{
                                    margin: "5px 0",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Button
                                    variant="outlined"
                                    component="label"
                                    style={{
                                      marginRight: 10,
                                    }}
                                    startIcon={<CameraAlt />}
                                  >
                                    Tambah Gambar
                                    <input
                                      style={{ color: errorImage ? "red" : "" }}
                                      type="file"
                                      name={`questions[${i}].file`}
                                      hidden
                                      accept="image/*"
                                      onChange={(event) => {
                                        onChangeImage(
                                          event,
                                          `questions[${i}].file`
                                        );
                                      }}
                                    />
                                  </Button>
                                  {errorImage && (
                                    <div style={{ color: "red" }}>
                                      {errorImage}
                                    </div>
                                  )}
                                  {question.file ? (
                                    <div>
                                      {`Image Found`}
                                      <Button
                                        color="secondary"
                                        style={{
                                          cursor: "pointer",
                                          marginLeft: 5,
                                        }}
                                        onClick={async () => {
                                          await apiQuiz.deleteImageQuiz(
                                            question.id
                                          );
                                          window.location.reload();
                                        }}
                                      >
                                        Remove
                                      </Button>
                                      {/* <img
                                        style={{ width: 100 }}
                                        src={`http://192.168.0.8:8000/assets/files/quiz/${question.file}`}
                                        alt=""
                                      /> */}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              style={{ margin: "20px 0 20px 7px" }}
                            >
                              <Grid
                                item
                                xs={12}
                                sm="auto"
                                style={{ marginRight: 5 }}
                              >
                                {!isAddMode ? (
                                  <Button
                                    disabled={isSubmitting}
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<AddIcon />}
                                    onClick={() =>
                                      push({
                                        id: -1,
                                        question: "",
                                        file: "",
                                        options: [
                                          { id: -1, title: "", correct: 0 },
                                        ],
                                      })
                                    }
                                  >
                                    Pertanyaan
                                  </Button>
                                ) : i > 0 ? (
                                  ""
                                ) : (
                                  <Button
                                    disabled={isSubmitting}
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<AddIcon />}
                                    onClick={() =>
                                      push({
                                        id: "",
                                        question: "",
                                        file: "",
                                        options: [
                                          { id: "", title: "", correct: 0 },
                                        ],
                                      })
                                    }
                                  >
                                    Tambah
                                  </Button>
                                )}
                              </Grid>
                              <Grid item xs={12} sm="auto">
                                <Button
                                  startIcon={<Delete />}
                                  disabled={i <= 0 || isSubmitting}
                                  onClick={() => remove(i)}
                                >
                                  Hapus
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Fragment>
                  )}
                </FieldArray>
                <div style={{ width: "100%", display: "flex" }}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    endIcon={<Send />}
                    style={{ marginTop: 20, marginLeft: "auto" }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
  },
  paper: {
    padding: 30,
    minHeight: "100vh",
  },
  formContainer: {
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "8px",
    maxWidth: 460,
    boxShadow: "0px 4px 18px 11px rgba(174, 199, 255, 0.1)",
  },
  rootGrid: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
}));

export default Layout(AddEditQuizPage, "Quiz");
