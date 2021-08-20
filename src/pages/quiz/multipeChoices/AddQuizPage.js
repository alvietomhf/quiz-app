import React, { Fragment, useState } from "react";
import {
  Button,
  CircularProgress,
  TextField,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../../components/Layout";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

const AddQuizPage = (props) => {
  const emptyOptions = { title: "", correct: 0 };
  const emptyQuestions = {
    question: "",
    image: "",
    options: [emptyOptions],
  };
  const initialValues = {
    title: "",
    questions: [emptyQuestions],
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    console.log(values);
    return new Promise((res) => setTimeout(res, 2500));
  };

  // const onChangeFile = (e) => {
  //   let files = e.target.files || e.dataTransfer.files;
  //   if (!files.length)
  //         return;
  //   createImage(files[0]);
  // }
  const createImage = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      props.setFieldValue();
    };
    reader.readAsDataURL(file);
  };

  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <Paper className={classes.paper}>
        <Formik
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
                            <FieldArray
                              name={`questions[${i}].options`}
                              render={(arrayHelpers) => (
                                <div>
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
                                          disabled={isSubmitting}
                                          onClick={() =>
                                            arrayHelpers.push(emptyOptions)
                                          }
                                        >
                                          Add
                                        </Button>
                                      </Grid>
                                      <Grid item xs={12} sm="auto">
                                        <Button
                                          disabled={index <= 0 || isSubmitting}
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        >
                                          Delete
                                        </Button>
                                      </Grid>
                                    </Fragment>
                                  ))}
                                </div>
                              )}
                            >
                              {({ push, remove }) => <Fragment></Fragment>}
                            </FieldArray>

                            <div>
                              <Button variant="outlined" component="label">
                                Tambahkan Gambar
                                <input
                                  name={`questions[${i}].image`}
                                  type="file"
                                  hidden
                                  onChange={(event) => {
                                    const file = event.target.files[0];
                                    setFieldValue(
                                      `questions[${i}].image`,
                                      file
                                    );
                                  }}
                                />
                              </Button>
                              {question.image.name}
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
