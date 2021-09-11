import React, { Fragment, useState, useEffect, useRef } from "react";
import { Button, TextField, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../../components/Layout";
import { Formik, Form, Field, ErrorMessage, FieldArray, getIn } from "formik";
import * as Yup from "yup";
import apiQuiz from "../../../actions/quiz/quiz";
import DatePicker from "../../../components/DatePickers";
import { buildFormData } from "../../../components/BuildFormData";
import { token } from "../../../config/token";
import { useHistory, useParams, Redirect } from "react-router-dom";
import instance from "../../../actions/instance";
import moment from "moment";

const AddEditQuizPage = () => {
  const [selectedDate, setSelectedDate] = useState();
  const { slug } = useParams();
  const isAddMode = !slug;
  const FormikRef = useRef();
  const history = useHistory();
  const initialValues = {
    title: "",
    deadline: "",
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
      <Paper className={classes.paper}>
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
              <Field
                as={TextField}
                variant="outlined"
                label="Judul Kuis"
                name="title"
                placeholder="Judul Kuis"
                fullWidth
                error={errors.title && touched.title}
                helperText={<ErrorMessage name="title" />}
              />
              <DatePicker
                name="deadline"
                onChangeDate={onChangeDate}
                selectedDate={selectedDate}
                error={errors.deadline && touched.deadline}
                helperText={<ErrorMessage name="deadline" />}
                label="Deadline"
              />
              <FieldArray name="questions">
                {({ push, remove }) => (
                  <Fragment>
                    <Grid item>
                      <Typography variant="body2">Questions</Typography>
                    </Grid>
                    {values.questions.map((question, i) => {
                      const errorQuestion = getIn(
                        errors,
                        `questions[${i}].question`
                      );
                      const errorImage = getIn(errors, `questions[${i}].file`);
                      return (
                        <Grid container key={i} item spacing={2}>
                          <Grid item container spacing={2} xs={12} sm="auto">
                            <Grid item xs={12} sm={6}>
                              <Field
                                fullWidth
                                variant="outlined"
                                name={`questions[${i}].id`}
                                style={{ display: "none" }}
                                as={TextField}
                              />
                              <Field
                                fullWidth
                                variant="outlined"
                                name={`questions[${i}].question`}
                                as={TextField}
                                error={errorQuestion && true}
                                label={`Pertanyaan ${i + 1}`}
                              />
                              {errorQuestion && (
                                <div style={{ color: "red" }}>
                                  {errorQuestion}
                                </div>
                              )}
                              <FieldArray name={`questions[${i}].options`}>
                                {({ push, remove }) => (
                                  <Fragment>
                                    {question.options.map((option, index) => {
                                      const errorOptionTitle = getIn(
                                        errors,
                                        `questions[${i}].options[${index}].title`
                                      );
                                      return (
                                        <Fragment key={index}>
                                          <Field
                                            fullWidth
                                            variant="outlined"
                                            name={`questions[${i}].options[${index}].id`}
                                            as={TextField}
                                            style={{ display: "none" }}
                                          />
                                          <Field
                                            fullWidth
                                            variant="outlined"
                                            name={`questions[${i}].options[${index}].title`}
                                            as={TextField}
                                            error={errorOptionTitle && true}
                                            label={`Opsi ${index + 1}`}
                                          />
                                          {errorOptionTitle && (
                                            <div style={{ color: "red" }}>
                                              {errorOptionTitle}
                                            </div>
                                          )}
                                          <Grid item xs={12} sm="auto">
                                            <Button
                                              variant="contained"
                                              onClick={() => {
                                                question.options.map(
                                                  (correct, index2) =>
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
                                              {values.questions[i].options[
                                                index
                                              ].correct
                                                ? "Correct Answer"
                                                : "Mark As Correct"}
                                            </Button>
                                            <Button
                                              variant="contained"
                                              onClick={() => remove(i)}
                                            >
                                              Delete
                                            </Button>
                                          </Grid>
                                        </Fragment>
                                      );
                                    })}
                                    <Grid item xs={12} sm="auto">
                                      <Button
                                        onClick={() =>
                                          push({ title: "", correct: 0 })
                                        }
                                      >
                                        Add
                                      </Button>
                                    </Grid>
                                  </Fragment>
                                )}
                              </FieldArray>
                              <div>
                                <Button variant="outlined" component="label">
                                  {question.file ? "Edit" : "Tambah"} Gambar
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
                                    {`Image Uploaded: ${question.file}`}
                                    <img
                                      style={{ width: 100 }}
                                      src={`http://127.0.0.1:8000/assets/files/quiz/${question.file}`}
                                      alt=""
                                    />
                                    <button
                                      type="button"
                                      style={{ cursor: "pointer" }}
                                      onClick={async () => {
                                        await apiQuiz.deleteImageQuiz(
                                          question.id
                                        );
                                        window.location.reload();
                                      }}
                                    >
                                      Remove Image
                                    </button>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm="auto">
                            {!isAddMode ? (
                              <Button
                                disabled={isSubmitting}
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
                                Add
                              </Button>
                            ) : (
                              <Button
                                disabled={isSubmitting}
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
                                Add
                              </Button>
                            )}
                          </Grid>
                          <Grid item xs={12} sm="auto">
                            <Button
                              disabled={i <= 0 || isSubmitting}
                              onClick={() => remove(i)}
                            >
                              Delete
                            </Button>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Fragment>
                )}
              </FieldArray>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                style={{ margin: 10 }}
              >
                Submit
              </Button>
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
