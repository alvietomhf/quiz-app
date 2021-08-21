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

const AddQuizPage = (props) => {
  const FormikRef = createRef();
  const [value, setValue] = useState(0);
  const [fileName, setFileName] = useState("");
  const emptyOptions = { title: "", correct: 0 };
  const emptyQuestions = {
    question: "",
    image: "",
    options: [emptyOptions],
  };
  const initialValues = {
    title: "",
    questions: [emptyQuestions],
    type: "quiz",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
  });

  const onChange = (e, index) => {
    const files = e.target.files;
    if (!files.length) return;
    createImage(files[0], index);
  };
  const createImage = (file, index) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      FormikRef.current.setFieldValue(index, e.target.result);
      setFileName(file.name)
      console.log(file.name)
      console.log(reader)
    };
    reader.readAsDataURL(file);
    // e.preventDefault();
    // const data = new FormData();
    // const fd = data.append('image', file)
    // FormikRef.current.setFieldValue(index, fd);
  };

  const onSubmit = async (values) => {
    const response = apiQuiz.postQuiz(values);
    console.log(response);
    FormikRef.current.setSubmitting(false);
    FormikRef.current.resetForm();
  };

  const classes = useStyles();

  console.log(value);

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
                                    <Button onClick={() => push(emptyOptions)}>
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
                                  name={`questions[${i}].image`}
                                  type="file"
                                  hidden
                                  onChange={(e) =>
                                    onChange(e, `questions[${i}].image`)
                                  }
                                />
                              </Button>
                              {/* {question.image} */}
                              {fileName}
                            </div>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm="auto">
                          <Button
                            disabled={isSubmitting}
                            onClick={() => push(emptyQuestions)}
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
