import React, { useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import Layout from "../../../components/Layout";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import DatePicker from "../../../components/DatePickers";
import { formatDate } from "../../../components/formatDatePost";
import { useParams } from "react-router-dom";
import { buildFormData } from "../../../components/BuildFormData";
import apiQuiz from "../../../actions/quiz/quiz";
import instance from "../../../actions/instance";
import { token } from "../../../config/token";
import { Document, Page } from "react-pdf";
import moment from "moment";

const AddEditEssayPage = () => {
  const [selectedDate, setSelectedDate] = useState();
  const FormikRef = useRef();
  const { slug } = useParams();
  const isAddMode = !slug;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const initialValues = {
    title: "",
    deadline: "",
    questions: [
      {
        question: "",
        image: "",
      },
    ],
    type: "essay",
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
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
      await apiQuiz.updateQuiz(formData, slug);
    }
    FormikRef.current.setSubmitting(false);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        {isAddMode ? "Add Essay" : "Edit Essay"}
        <Grid item xs={6}>
          <Paper>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              innerRef={FormikRef}
              validationSchema={validationSchema}
            >
              {({ values, errors, touched }) => (
                <Form>
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
                        label="Pertanyaan"
                        name="questions[0].question"
                      />
                      <div>
                        <Button variant="outlined" component="label">
                          Tambahkan File
                          <input
                            type="file"
                            hidden
                            onChange={(event) => {
                              onChangeFile(event, `questions[0].image`);
                            }}
                          />
                        </Button>
                        {/* {values.questions[0].file !== null
                          ? values.questions[0].file
                          : ""}
                        {!isAddMode ? (
                          <div>
                            <Document
                              file={`http://127.0.0.1:8000/assets/images/quiz/${values.questions[0].file}`}
                              onLoadSuccess={onDocumentLoadSuccess}
                            >
                              <Page pageNumber={pageNumber} />
                            </Document>
                            <p>
                              Page {pageNumber} of {numPages}
                            </p>
                          </div>
                        ) : (
                          ""
                        )} */}
                      </div>
                    </Fragment>
                  </FieldArray>
                  <Button type="submit" variant="contained" color="primary">
                    Add Essay
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
