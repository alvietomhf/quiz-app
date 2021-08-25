import React, { createRef, Fragment, useState } from "react";
import {
  Button,
  CircularProgress,
  TextField,
  Grid,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../../components/Layout";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import apiQuiz from "../../../actions/quiz/quiz";

const AddQuizPage = () => {
  const FormikRef = createRef();
  const initialValues = {
    title: "",
    questions: [
      {
        question: "test",
        image: "",
        options: [{ title: "test", correct: 0 }],
      },
    ],
    type: "quiz",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
  });

  const buildFormData = (formData, data, parentKey) => {
    if (
      data &&
      typeof data === "object" &&
      !(data instanceof Date) &&
      !(data instanceof File) &&
      !(data instanceof Blob)
    ) {
      Object.keys(data).forEach((key) => {
        buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      const value = data == null ? "" : data;
      console.log(value);
      formData.append(parentKey, value);
    }
  };

  const jsonToFormData = (data) => {
    // console.log(data);
    const formData = new FormData();
    buildFormData(formData, data);
    return formData;
  };

  const onChangeImage = (e, index) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    FormikRef.current.setFieldValue(index, files[0]);
  };

  // const createImage = (file, index) => {
  //   let reader = new FileReader();
  //   reader.onload = (e) => {
  //     FormikRef.current.setFieldValue(index, e.target.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  const onSubmit = async (values) => {
    const formData = jsonToFormData(values);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    // console.log(formData);
    apiQuiz.postQuiz(formData);
    FormikRef.current.setSubmitting(false);
    FormikRef.current.resetForm();
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
                helperText={<ErrorMessage name="quiz" />}
              />
              <FieldArray name="questions">
                {({ push, remove }) => (
                  <Fragment>
                    <Grid item>
                      <Typography variant="body2">Questions</Typography>
                    </Grid>
                    {values.questions.map((question, i) => (
                      <Grid container key={i} item spacing={2}>
                        <Grid item container spacing={2} xs={12} sm="auto">
                          <Grid item xs={12} sm={6}>
                            <Field
                              fullWidth
                              variant="outlined"
                              name={`questions[${i}].question`}
                              as={TextField}
                              label={`Pertanyaan ${i + 1}`}
                            />
                            <FieldArray name={`questions[${i}].options`}>
                              {({ push, remove }) => (
                                <Fragment>
                                  {question.options.map((option, index) => (
                                    <Fragment key={index}>
                                      <Field
                                        fullWidth
                                        variant="outlined"
                                        name={`questions[${i}].options[${index}].title`}
                                        as={TextField}
                                        label={`Opsi ${index + 1}`}
                                      />
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
                                          {values.questions[i].options[index]
                                            .correct
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
                                  ))}
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
                                Tambahkan Gambar
                                <input
                                  type="file"
                                  hidden
                                  accept="image/*"
                                  onChange={(event) => {
                                    //   const files = event.target.files;
                                    //   let myFiles = Array.from(files);
                                    //   setFieldValue(
                                    //     `questions[${i}].image`,
                                    //     myFiles
                                    //   );
                                    // setFieldValue(
                                    //   `questions[${i}].image`,
                                    //   event.target.files[0]
                                    // );
                                    onChangeImage(
                                      event,
                                      `questions[${i}].image`
                                    );
                                  }}
                                />
                              </Button>
                              {question.image.name}
                              <img
                                src={question.image}
                                style={{ width: 120 }}
                                alt="Image"
                              />
                            </div>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                          <Button
                            disabled={isSubmitting}
                            onClick={() =>
                              push({
                                question: "",
                                image: "",
                                options: [{ title: "", correct: 0 }],
                              })
                            }
                          >
                            Add
                          </Button>
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
                    ))}
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

export default Layout(AddQuizPage);

// data.append("title", values.title);
// data.append("type", values.type);
// for (let i = 0; i < values.questions.length; i++) {
//   data.append(`questions[${i}]`, values.questions[i]);
// }
// for (let key in values) {
//   if (typeof values[key] === "object") {
//     for (let subKey in values[key]) {
//       data.append(`${key}.${subKey}`, values[key][subKey]);
//     }
//   } else {
//     data.append(key, values[key]);
//   }
// }
// for (let i = 0; i < values; i++) {
//   data.append(i, values[i]);
//   for (let j = 0; j < values[i].length; j++) {}
// }
// console.log(formData);
// apiQuiz.postQuiz(formData);
// console.log(response);
//["apple", "ball", "cat"]
// console.log(response);
// console.log(values);
// data.append("title", values.title);
// data.append("type", values.type);
// data.append("questions[0]", values.questions[0]);
// data.append("question", values.questions[0].question);
// values.questions.forEach((item, index) => {
//   data.append("question", item[index]["question"]);
// });
