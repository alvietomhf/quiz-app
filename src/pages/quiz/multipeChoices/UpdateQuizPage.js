import { Formik, Field, Form } from "formik";
import React, { createRef, Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import instance from "../../../actions/instance";
import Layout from "../../../components/Layout";
import { token } from "../../../config/token";
import * as Yup from "yup";
import { buildFormData } from "../../../components/BuildFormData";
import apiQuiz from "../../../actions/quiz/quiz";
import { Button, Paper, TextField } from "@material-ui/core";

const UpdateQuizPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState({});
  const FormikRef = createRef();
  const history = useHistory();
  const initialValues = {
    title: "",
    deadline: "2021-01-01",
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
  useEffect(() => {
    instance
      .get(`/api/quizzes/${slug}`, {
        headers: {
          Authorization: "Bearer " + token(),
        },
      })
      .then((response) => {
        const res = response.data.data;
        const quizField = ["title"];
        quizField.forEach((field) =>
          FormikRef.current.setFieldValue(field, res[field], false)
        );
        res.questions.map((question, index1) => {
          const fields = [
            `questions[${index1}].question`,
            `questions[${index1}].image`,
          ];
          fields.forEach((field) =>
            FormikRef.current.setFieldValue(field, question[field], false)
          );
          question.options.map((option, index2) => {
            const fieldsOptions = [
              `questions[${index2}].options[${index1}].title`,
              `questions[${index2}].options[${index1}].correct`,
            ];
            fieldsOptions.forEach((field) =>
              FormikRef.current.setFieldValue(field, option[field], false)
            );
            console.log(fieldsOptions);
          });
          console.log(fields);
          console.log(res);
        });

        setData(res);
      })
      .catch((error) => {
        if (error.response.data.status === false) {
          const responseMessage = error.response.data.message;
          console.log(responseMessage);
          setTimeout(() => {
            history.push("/quiz");
          }, 4000);
        }
      });
  }, [history, slug]);

  const jsonToFormData = (data) => {
    const formData = new FormData();
    buildFormData(formData, data);
    return formData;
  };

  const onSubmit = async (values) => {
    // const formData = jsonToFormData(values);
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    // apiQuiz.updateQuiz(formData);
    // FormikRef.current.setSubmitting(false);
    // FormikRef.current.resetForm();
    console.log(values);
  };

  return (
    <Fragment>
      <Formik
        innerRef={FormikRef}
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, errors, touched, isSubmitting }) => (
          <Form>
            <Paper>
              <Field as={TextField} name="title" />
              <Field as={TextField} name="questions[0].options[0].correct" />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                style={{ margin: 10 }}
              >
                Submit
              </Button>
            </Paper>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default Layout(UpdateQuizPage);
