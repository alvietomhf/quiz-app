import React, { useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import Layout from "../../../components/Layout";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import DatePicker from "../../../components/DatePickers";
import { formatDate } from "../../../components/formatDatePost";
import { useParams, useHistory } from "react-router-dom";
import { buildFormData } from "../../../components/BuildFormData";
import apiQuiz from "../../../actions/quiz/quiz";
import instance from "../../../actions/instance";
import { token } from "../../../config/token";
import moment from "moment";
import { useSelector } from "react-redux";

const AddEditEssayPage = () => {
  const [selectedDate, setSelectedDate] = useState();
  const FormikRef = useRef();
  const { slug } = useParams();
  const history = useHistory();
  const isAddMode = !slug;
  const auth = useSelector((state) => state.auth.data.user);
  const initialValues = {
    title: "",
    deadline: "",
    comment: "",
    questions: [
      {
        id: "",
        question: "",
        file: "",
      },
    ],
    type: "essay",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    deadline: Yup.date().required("Required"),
  });

  const onChangeDate = (values) => {
    const date = moment(values).format("YYYY-MM-DD HH:mm");
    setSelectedDate(date);
    FormikRef.current.setFieldValue("deadline", date);
    console.log(date);
  };

  const onChangeFile = (e, index) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    FormikRef.current.setFieldValue(index, files[0]);
  };

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
            console.log(response);
            const quizField = ["title", "deadline", "questions", "type"];
            quizField.forEach((field) =>
              FormikRef.current.setFieldValue(field, res[field], false)
            );
            console.log(quizField);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getQuizDetail();
    }
  }, [slug, isAddMode]);

  const jsonToFormData = (data) => {
    const formData = new FormData();
    if (!isAddMode) {
      formData.append("_method", "put");
    }
    if (!isAddMode && auth.role === "siswa") {
      formData.append("question_id", data.questions[0].id);
      formData.delete("_method");
    }
    buildFormData(formData, data);
    return formData;
  };

  const onSubmit = async (values) => {
    const formData = jsonToFormData(values);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    if (isAddMode) {
      await apiQuiz.postQuiz(formData);
      FormikRef.current.resetForm();
    } else {
      if (auth.role === "siswa") {
        // console.log(formData)
        await apiQuiz.postResultEssay(formData, slug);
      }
      if (auth.role === "guru") {
        await apiQuiz.updateQuiz(formData, slug);
      }
    }
    FormikRef.current.setSubmitting(false);
    // history.goBack();
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        {isAddMode ? "Add Essay" : "Essay"}
        <Grid item xs={6}>
          <Paper>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              innerRef={FormikRef}
              validationSchema={validationSchema}
            >
              {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                <Form>
                  <div style={{ display: isAddMode ? "contents" : "none" }}>
                    <Field
                      as={TextField}
                      variant="outlined"
                      style={{ display: "none" }}
                      name="id"
                    />
                    <Field
                      as={TextField}
                      variant="outlined"
                      label="title"
                      name="title"
                      error={errors.title && touched.title}
                      helperText={<ErrorMessage name="title" />}
                    />
                    <DatePicker
                      onChangeDate={onChangeDate}
                      selectedDate={selectedDate}
                      name="deadline"
                      label="Deadline"
                      error={errors.deadline && touched.deadline}
                      helperText={<ErrorMessage name="deadline" />}
                    />
                    <FieldArray name="questions">
                      <Fragment>
                        <Field
                          as={TextField}
                          variant="outlined"
                          style={{ display: "none" }}
                          name="questions[0].id"
                        />
                        <Field
                          as={TextField}
                          variant="outlined"
                          label="Pertanyaan"
                          name="questions[0].question"
                        />
                      </Fragment>
                    </FieldArray>
                  </div>

                  {!isAddMode && (
                    <div>
                      <p>{values.title}</p>
                      <p>Deadline: {values.deadline}</p>
                      {values.questions[0].file ? (
                        <div>
                          <a
                            href={`http://192.168.0.8:8000/assets/files/quiz/${values.questions[0].file}`}
                          >
                            download file
                          </a>
                        </div>
                      ) : (
                        <div>
                          <p style={{ color: "red" }}>
                            Tugas belum dikumpulkan
                          </p>
                        </div>
                      )}

                      <FieldArray name="questions">
                        <Fragment>
                          {auth.role === "siswa" || "admin" ? (
                            <div>
                              <Button variant="outlined" component="label">
                                Tambahkan File
                                <input
                                  type="file"
                                  hidden
                                  onChange={(event) => {
                                    onChangeFile(event, `questions[0].file`);
                                  }}
                                />
                              </Button>
                            </div>
                          ) : (
                            ""
                          )}
                        </Fragment>
                      </FieldArray>
                    </div>
                  )}
                  <Button type="submit" variant="contained" color="primary">
                    Kirim
                  </Button>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Fragment>
  );
};

export default Layout(AddEditEssayPage, "Essay");
